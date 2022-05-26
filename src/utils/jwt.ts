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
    expiresIn: "2h",
    algorithm: "HS256",
  });

export const jwtVerify = ({ token }: { token: string }) =>
  JWT.verify(token, process.env.JWT_SECRET as string);

export const jwtRefresh = ({ subject = "user" }: { subject: string }) =>
  JWT.sign({}, process.env.JWT_SECRET as string, {
    subject,
    expiresIn: "14d",
    algorithm: "HS256",
  });

export const jwtRefreshVerify = async ({
  token,
  user,
}: {
  token: string;
  user: string;
}) => {
  const userRefreshTokenDoc = await UserRefreshToken.findOne({ token, user });
  if (!userRefreshTokenDoc) throw Error(`Invalid refresh token.`);

  return jwtVerify({ token });
};
