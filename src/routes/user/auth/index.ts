import { bearerAuthMiddleware } from "@/src/middlewares/bearerAuth.middleware";
import User from "@/src/models/User";
import { logger } from "@/src/utils/logger";
import express from "express";

const router = express.Router();

router.use(bearerAuthMiddleware);

/**
 *  @swagger
 *  /user/auth:
 *    get:
 *      security:
 *        - ApiKeyAuth: []
 *        - BearerAuth: []
 *      tags: ["User"]
 *      summary: Get Me
 *      description: Get a logged in User model
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: "#/components/schemas/User"
 *                  - type: "null"
 *        400:
 *          $ref: "#/components/responses/Error"
 *        401:
 *          $ref: "#/components/responses/AuthenticationError"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 *
 */
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const { _id } = res.locals.decoded;
    const doc = await User.findById(_id, "-_id userId name");

    return res.status(200).json(doc);
  } catch (e: any) {
    logger.error(e);
    return res
      .status(e.message ? 400 : 500)
      .json({ message: e.message || "Server Error" });
  }
});

export default router;
