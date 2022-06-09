import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt";

export const bearerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) throw Error("Bearer token is required.");

    const token = bearerToken.replace("Bearer ", "");

    const decoded = await jwtVerify({ token });

    if (!decoded) throw Error("Invalid Authorization.");

    console.log({ decoded });

    res.locals.decoded = decoded;
    next();
  } catch (e: any) {
    return res
      .status(401)
      .json({ message: e.message || "Invalid Authorization." });
  }
};
