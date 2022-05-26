import { ObjectId } from "mongoose";
import Password from "../models/Password";
import { createSalt, passwordEncryption } from "../utils/encryption";

export const createPassword = async ({
  type,
  password,
}: {
  type: string;
  password: string;
}) => {
  const salt = createSalt();
  const hash = await passwordEncryption(password, salt);

  return Password.create({
    type,
    salt,
    hash,
  });
};

export const updatePassword = async ({
  _id,
  password,
}: {
  _id: ObjectId | string;
  password: string;
}) => {
  const salt = createSalt();
  const hash = await passwordEncryption(password, salt);

  return Password.findOneAndUpdate(
    { _id },
    {
      salt,
      hash,
    },
    {
      runValidators: true,
    }
  );
};
