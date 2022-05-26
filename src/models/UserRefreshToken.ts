import mongoose from "@plugins/mongoose";
import { Document, ObjectId } from "mongoose";
const { Schema, model } = mongoose;

/**
 *  @swagger
 *  components:
 *    schemas:
 *      UserRefreshToken:
 *        type: object
 *        required:
 *          - _id
 *          - token
 *          - user
 *          - createdAt
 *        properties:
 *          _id:
 *            type: string
 *            description: "MongoDB Document Id"
 *          token:
 *            type: string
 *            description: "Refresh token"
 *          user:
 *            type: string
 *            description: "User Document Id"
 *          createdAt:
 *            type: string
 *            description: "Document's creation time in ISODateString"
 *            example: 2022-01-01T00:00:00.000Z
 */
export interface IUserRefreshToken extends Document {
  token: string;
  user: ObjectId | string;
  createdAt: Date;
}

const UserRefreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    expires: "14d",
    default: Date.now,
  },
});

export default model<IUserRefreshToken>(
  "UserRefreshToken",
  UserRefreshTokenSchema
);
