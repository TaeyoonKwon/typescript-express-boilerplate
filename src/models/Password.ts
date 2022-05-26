import mongoose from "@plugins/mongoose";
import { Document } from "mongoose";
const { Schema, model } = mongoose;

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Password:
 *        type: object
 *        required:
 *          - _id
 *          - type
 *          - hash
 *          - salt
 *          - createdAt
 *          - updatedAt
 *        properties:
 *          _id:
 *            type: string
 *            description: "MongoDB Document Id"
 *          type:
 *            type: string
 *            description: "Model type where password is used"
 *            enum: ["user", "admin"]
 *          hash:
 *            type: string
 *            description: "Encrypted hash value"
 *          salt:
 *            type: string
 *            description: "Salt used for encryption"
 *          createdAt:
 *            type: string
 *            description: "Document's creation time in ISODateString"
 *            example: 2022-01-01T00:00:00.000Z
 *          updatedAt:
 *            type: string
 *            description: "Document's last updated time in ISODateString"
 *            example: 2022-01-01T00:00:00.000Z
 */
export interface IPassword extends Document {
  type: string;
  hash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

const PasswordSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IPassword>("Password", PasswordSchema);
