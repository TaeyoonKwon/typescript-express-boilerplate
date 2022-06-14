import { jwtRefreshVerify } from "@utils/jwt";
import { logger } from "@utils/logger";
import express from "express";

const router = express.Router();

/**
 *  @swagger
 *  /user/refresh_token:
 *    post:
 *      security:
 *        - ApiKeyAuth: []
 *      tags: ["User"]
 *      summary: Renew JWT
 *      description: Get a new JWT with a refresh token.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - user
 *                - refreshToken
 *              properties:
 *                user:
 *                  type: string
 *                  description: "User Document Id"
 *                refreshToken:
 *                  type: string
 *                  description: "Refresh token"
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                description: "Renewed JWT"
 *        400:
 *          $ref: "#/components/responses/Error"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 *
 */
router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const { user, refreshToken } = req.body;
    const token = jwtRefreshVerify({ token: refreshToken, user });

    return res.status(200).json(token);
  } catch (e: any) {
    logger.error(e);
    return res
      .status(e.message ? 400 : 500)
      .json({ message: e.message || "Server Error" });
  }
});

export default router;
