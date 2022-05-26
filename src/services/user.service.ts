import { ObjectId } from "mongoose";
import { UserCreationInput, UserUpdateInput } from "../interfaces/UserInput";
import Password from "../models/Password";
import User from "../models/User";
import { passwordEncryption } from "../utils/encryption";
import { jwtSign } from "../utils/jwt";
import { createPassword, updatePassword } from "./password.service";

export const createUser = async ({
  userId,
  password,
  name,
  alias,
}: UserCreationInput) => {
  const passwordDoc = await createPassword({ type: "user", password });
  return User.create({
    userId,
    password: passwordDoc._id,
    name,
    alias,
  });
};

export const updateUser = async ({
  _id,
  password,
  name,
  alias,
}: UserUpdateInput) => {
  const userDoc = await User.findOne({ _id });

  if (userDoc === null) throw Error(`User does not exist with _id ${_id}`);

  if (password) {
    await updatePassword({
      _id: userDoc.password,
      password,
    });
  }

  if (name) userDoc.name = name;
  if (alias) userDoc.alias = alias;

  await userDoc.save();

  return userDoc;
};

export const deleteUser = async ({ _id }: { _id: string | ObjectId }) => {
  const userDoc = await User.findOne({ _id });

  if (userDoc === null)
    throw Error(`User Document does not exist with _id ${_id}`);

  // clean up all related models
  await Promise.all([
    User.deleteOne({ _id }),
    Password.deleteOne({ _id: userDoc.password }),
  ]);
};

export const userLogin = async ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) => {
  const userDoc = await User.findOne({ userId });
  if (userDoc === null) return null;

  const passwordDoc = await Password.findOne({ _id: userDoc.password });
  if (passwordDoc === null) return null;

  const hash = await passwordEncryption(password, passwordDoc.salt);
  if (hash !== passwordDoc.hash) return null;

  const payload = {
    userId,
  };

  return jwtSign({ payload });
};
