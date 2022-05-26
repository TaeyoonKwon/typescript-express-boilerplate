import "dotenv/config";
import crypto from "crypto";

export const createSalt = (): string =>
  Buffer.concat([
    crypto.randomBytes(8),
    Buffer.from(process.env.ENCRYPTION_SECRET as string, "utf-8"),
  ]).toString("hex");

export const passwordEncryption = async (
  password: string,
  salt: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      Buffer.from(salt, "hex"),
      185000,
      32,
      "sha1",
      (err, key) => {
        if (err) reject(err);
        resolve(key.toString("hex"));
      }
    );
  });
