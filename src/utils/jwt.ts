import "dotenv/config";
import JWT from "jsonwebtoken";
import UserRefreshToken from "../models/UserRefreshToken";

export const jwtSign = ({
  payload,
  subject = "user",
}: {
  payload: any;
  subject?: string;
}) =>
  JWT.sign(payload, process.env.JWT_SECRET as string, {
    subject,
    expiresIn: "1h",
    algorithm: "HS256",
  });

export const jwtVerify = ({ token }: { token: string }) =>
  JWT.verify(token, process.env.JWT_SECRET as string);

export const jwtRefreshSign = async ({
  user,
  subject = "user",
}: {
  user: string;
  subject?: string;
}) => {
  const token = JWT.sign({}, process.env.JWT_SECRET as string, {
    subject,
    expiresIn: "14d",
    algorithm: "HS256",
  });
  await UserRefreshToken.create({ token, user });
};

export const jwtRefreshVerify = async ({
  token,
  user,
}: {
  token: string;
  user: string;
}) => {
  const userRefreshTokenDoc = await UserRefreshToken.findOne({ token, user });

  if (!userRefreshTokenDoc) throw Error(`Invalid refresh token.`);

  await userRefreshTokenDoc.remove();

  return jwtVerify({ token });
};
