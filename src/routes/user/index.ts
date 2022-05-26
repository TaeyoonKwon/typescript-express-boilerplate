import { apiKeyAuthMiddleware } from "@/src/middlewares/apiKeyAuth.middleware";
import User from "@/src/models/User";
import {
  createUser,
  deleteUser,
  updateUser,
} from "@/src/services/user.service";
import { logger } from "@utils/logger";
import express from "express";

const router = express.Router();

router.use(apiKeyAuthMiddleware);

/**
 *  @swagger
 *  /user:
 *    get:
 *      security:
 *        - ApiKeyAuth: []
 *      tags: ["User"]
 *      summary: Get Users
 *      description: Get multiple User models with query parameters.
 *      parameters:
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            default: 12
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            default: 1
 *        - in: query
 *          name: sort
 *          description: "field name for sorting"
 *          schema:
 *            type: string
 *            default: "-createdAt"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                  - type: object
 *                    required:
 *                      - docs
 *                    properties:
 *                      docs:
 *                        type: array
 *                        items:
 *                          $ref: "#/components/schemas/User"
 *                  - $ref: "#/components/schemas/MongoosePagination"
 *        400:
 *          $ref: "#/components/responses/Error"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 *
 */
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const limit = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;
    const sort = String(req.query.sort || "-createdAt");

    const result = await User.paginate(
      {},
      {
        sort,
        limit,
        page,
      }
    );

    return res.status(200).json(result);
  } catch (e: any) {
    logger.error(e);
    return res
      .status(e.message ? 400 : 500)
      .json({ message: e.message || "Server Error" });
  }
});

/**
 *  @swagger
 *  /user/{_id}:
 *    get:
 *      security:
 *        - ApiKeyAuth: []
 *      tags: ["User"]
 *      summary: Get a User
 *      description: Get a single User model
 *      parameters:
 *        - in: path
 *          name: _id
 *          required: true
 *          description: "User model's MongoDB Document Id"
 *          schema:
 *            type: string
 *            example: 60bd9f99090602181066e1e8
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
 *        500:
 *          $ref: "#/components/responses/ServerError"
 *
 */
router.get("/:_id", async (req: express.Request, res: express.Response) => {
  try {
    const { _id } = req.params;
    const doc = await User.findById(_id);

    return res.status(200).json(doc);
  } catch (e: any) {
    logger.error(e);
    return res
      .status(e.message ? 400 : 500)
      .json({ message: e.message || "Server Error" });
  }
});

/**
 *  @swagger
 *  /user:
 *    post:
 *      security:
 *        - ApiKeyAuth: []
 *      tags: ["User"]
 *      summary: Create a User
 *      description: Create a single User model
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userId
 *                - password
 *                - name
 *              properties:
 *                userId:
 *                  type: string
 *                  description: "User login id"
 *                  example: "ryan123"
 *                password:
 *                  type: string
 *                  description: "User login password"
 *                  example: "password123$"
 *                name:
 *                  type: string
 *                  description: "User name"
 *                  example: "Taeyoon Kwon"
 *                alias:
 *                  type: string
 *                  description: "User nickname"
 *                  example: "Ryan"
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 *        400:
 *          $ref: "#/components/responses/Error"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 *
 */
router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const { userId, password, name, alias } = req.body;
    const userDoc = await createUser({ userId, password, name, alias });

    return res.status(201).json(userDoc);
  } catch (e: any) {
    logger.error(e);
    return res
      .status(e.message ? 400 : 500)
      .json({ message: e.message || "Server Error" });
  }
});

/**
 *  @swagger
 *  /user/{_id}:
 *    patch:
 *      security:
 *        - ApiKeyAuth: []
 *      tags: ["User"]
 *      summary: Update a User
 *      description: Update a single User model
 *      parameters:
 *        - in: path
 *          name: _id
 *          required: true
 *          description: "User model's MongoDB Document Id"
 *          schema:
 *            type: string
 *            example: 60bd9f99090602181066e1e8
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                  description: "User login password"
 *                  example: "password123$"
 *                name:
 *                  type: string
 *                  description: "User name"
 *                  example: "Taeyoon Kwon"
 *                alias:
 *                  type: string
 *                  description: "User nickname"
 *                  example: "Ryan"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 *        400:
 *          $ref: "#/components/responses/Error"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 *
 */
router.patch("/:_id", async (req: express.Request, res: express.Response) => {
  try {
    const { _id } = req.params;
    const { password, name, alias } = req.body;
    const doc = await updateUser({ _id, password, name, alias });

    return res.status(200).json(doc);
  } catch (e: any) {
    logger.error(e);
    return res
      .status(e.message ? 400 : 500)
      .json({ message: e.message || "Server Error" });
  }
});

/**
 *  @swagger
 *  /user/{_id}:
 *    delete:
 *      security:
 *        - ApiKeyAuth: []
 *      tags: ["User"]
 *      summary: Delete a User
 *      description: Delete a single User model
 *      parameters:
 *        - in: path
 *          name: _id
 *          required: true
 *          description: "User model's MongoDB Document Id"
 *          schema:
 *            type: string
 *            example: 60bd9f99090602181066e1e8
 *      responses:
 *        200:
 *          $ref: "#/components/responses/Message"
 *        400:
 *          $ref: "#/components/responses/Error"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 *
 */
router.delete("/:_id", async (req: express.Request, res: express.Response) => {
  try {
    const { _id } = req.params;
    await deleteUser({ _id });

    return res.status(200).json({ message: `Successfully deleted.` });
  } catch (e: any) {
    logger.error(e);
    return res
      .status(e.message ? 400 : 500)
      .json({ message: e.message || "Server Error" });
  }
});

export default router;
