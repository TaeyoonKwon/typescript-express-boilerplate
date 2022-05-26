import { Document, ObjectId, PaginateModel } from "mongoose";
import mongoose from "@plugins/mongoose";
const { Schema, model } = mongoose;

/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - _id
 *          - userId
 *          - password
 *          - name
 *          - createdAt
 *          - updatedAt
 *        properties:
 *          _id:
 *            type: string
 *            description: "MongoDB Document Id"
 *          userId:
 *            type: string
 *            description: "User login id"
 *            example: "ryan123"
 *          password:
 *            type: string
 *            description: "MongoDB Document Id for Password model"
 *            example: "507f1f77bcf86cd799439011"
 *          name:
 *            type: string
 *            description: "User name"
 *            example: "Taeyoon Kwon"
 *          alias:
 *            type: string
 *            description: "User nickname"
 *            example: "Ryan"
 *          createdAt:
 *            type: string
 *            description: "Document's creation time in ISODateString"
 *            example: 2022-01-01T00:00:00.000Z
 *          updatedAt:
 *            type: string
 *            description: "Document's last updated time in ISODateString"
 *            example: 2022-01-01T00:00:00.000Z
 */
export interface IUser extends Document {
  userId: string;
  password: ObjectId | string;
  name: string;
  alias?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.ObjectId,
      ref: "Password",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IUser, PaginateModel<IUser>>("User", UserSchema);
