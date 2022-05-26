import { ObjectId } from "mongoose";

export interface UserCreationInput {
  userId: string;
  password: string;
  name: string;
  alias?: string;
}

export interface UserUpdateInput {
  _id: ObjectId | string;
  password?: string;
  name?: string;
  alias?: string;
}
