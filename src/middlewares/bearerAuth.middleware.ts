import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt";

// TODO: implement refresh token
export const bearerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) throw Error("Bearer token is required.");

  try {
    const token = bearerToken.replace("Bearer ", "");

    const decoded = await jwtVerify({ token });

    if (!decoded) throw Error("Invalid Authorization.");

    res.locals.decoded = decoded;
    next();
  } catch (e: any) {
    return res
      .status(401)
      .json({ message: e.message || "Invalid Authorization." });
  }
};
