import { Request, Response, NextFunction } from "express";

export const apiKeyAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = String(req.headers["x-api-key"] || "");

  if (!apiKey)
    return res.status(401).json({ message: "X-API-Key is required." });

  // simplest 1 to 1 API KEY implementation.
  if (process.env.API_KEY === apiKey) {
    next();
  } else {
    return res.status(401).json({ message: "Invalid X-API-Key." });
  }
};
