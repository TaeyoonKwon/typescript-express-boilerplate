import express from "express";

import userRoutes from "@routes/user";

const router = express.Router();

router.use("/user", userRoutes);

/**
 *  @swagger
 *  /check-alive:
 *    get:
 *      tags: ["Test"]
 *      summary: Server health check.
 *      description: Testing whether the server instance is alive or not.
 *      responses:
 *        200:
 *          description: Returns Hello World
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                description: "A simple string response"
 *                example: "Hello World."
 */
router.get("/check-alive", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Hello World.`);
});

export default router;
