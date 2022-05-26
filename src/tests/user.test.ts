import "dotenv/config";
import should from "should";
import mongoose from "mongoose";

import App from "@/src/app";
import {
  createUser,
  deleteUser,
  updateUser,
  userLogin,
} from "../services/user.service";
import User, { IUser } from "../models/User";
import Password from "../models/Password";

jest.setTimeout(120000);

describe("User Service", () => {
  let userDoc: IUser | null;

  beforeAll(async () => {
    await App.initMongoose({
      test: true,
      quiet: true,
    });
  });

  afterAll(async () => {
    // clean up test documents if needed.
    await mongoose.disconnect();
  });

  it("1 - createUser", async () => {
    const userObject = {
      userId: "testUserId1",
      password: "testUserPassword1",
      name: "testUserName1",
      alias: "testUserAlias",
    };

    userDoc = await createUser(userObject);

    const passwordDoc = await Password.findOne({ _id: userDoc.password });

    should(userDoc).have.properties([
      "_id",
      "userId",
      "password",
      "name",
      "alias",
      "createdAt",
      "updatedAt",
    ]);
    should(userDoc.userId).equals(userObject.userId);
    should(userDoc.name).equals(userObject.name);
    should(userDoc.alias).equals(userObject.alias);
    should(passwordDoc).have.properties([
      "_id",
      "type",
      "hash",
      "salt",
      "createdAt",
      "updatedAt",
    ]);
    should(passwordDoc?.type).equals("user");
  });

  it("2 - updateUser", async () => {
    const updatedUserDoc = await updateUser({
      _id: userDoc?._id,
      password: "newPassword123$",
      name: "New Name",
    });

    should(updatedUserDoc.userId).equals(userDoc?.userId);
    should(updatedUserDoc.password).eqls(userDoc?.password);
    should(updatedUserDoc.name).equals("New Name");
    should(updatedUserDoc.alias).equals(userDoc?.alias);
  });

  it("3 - userLogin", async () => {
    const correctResult = await userLogin({
      userId: "testUserId1",
      password: "newPassword123$",
    });
    const incorrectResult = await userLogin({
      userId: "testUserId1",
      password: "WrongPassword",
    });

    should(correctResult).not.equals(null);
    should(incorrectResult).equals(null);
  });

  it("4 - deleteUser", async () => {
    await deleteUser({ _id: userDoc?._id });
    const deletedUserDoc = await User.findOne({ _id: userDoc?._id });

    should(deletedUserDoc).equals(null);
  });
});
