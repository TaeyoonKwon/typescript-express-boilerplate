import "dotenv/config";
import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import openApiConfig from "@configs/openapi.json";
import { MongooseInitOptions } from "@interfaces/MongooseInitOptions";
import { logger, stream } from "@utils/logger";
import routes from "@routes/index";
import mongoose from "@plugins/mongoose";

const swaggerDocs = swaggerJsDoc(openApiConfig);

const initMiddlewares = (app: express.Application): void => {
  morgan.token("body", (req: express.Request) => JSON.stringify(req.body));
  app.use(
    morgan(
      ":remote-addr :method :url HTTP/:http-version :status :res[content-length] - :response-time ms \nbody::body",
      { stream }
    )
  );
  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: "50mb" }));

  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Security Middlewares
  app.set("trust proxy", true);
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 600,
    })
  );

  app.use(routes);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default {
  initApp(): express.Application {
    const app = express();

    // middlewares
    initMiddlewares(app);

    return app;
  },

  async initMongoose(options?: MongooseInitOptions): Promise<void> {
    const {
      MONGO_CLUSTER,
      MONGO_DBNAME,
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_READONLY_USER,
      MONGO_READONLY_PASSWORD,
    } = process.env;

    if (
      !MONGO_CLUSTER ||
      !MONGO_DBNAME ||
      !MONGO_USER ||
      !MONGO_PASSWORD ||
      !MONGO_READONLY_USER ||
      !MONGO_READONLY_PASSWORD
    )
      throw Error(`Invalid Env to initialize MongoDB connection.`);

    let mongoDbname = MONGO_DBNAME;
    let mongoUser = MONGO_USER;
    let mongoPassword = MONGO_PASSWORD;

    if (options?.readonly) {
      mongoUser = MONGO_READONLY_USER;
      mongoPassword = MONGO_READONLY_PASSWORD;
    }

    if (options?.test) {
      mongoDbname = "test";
    }

    try {
      const mongoUri = MONGO_CLUSTER.replace("<username>", mongoUser)
        .replace("<password>", mongoPassword)
        .replace("<dbname>", mongoDbname);

      await mongoose.connect(mongoUri);

      if (options?.quiet !== true) {
        logger.info(`DB Connected : ${mongoUri}`);
      }
    } catch (e) {
      logger.error(e);
    }
  },
};
