import "dotenv/config";
import App from "@src/app";
import validateEnv from "@utils/validateEnv";
import { logger } from "@utils/logger";

(async () => {
  validateEnv();

  await App.initMongoose();
  const app = App.initApp();

  app.listen(process.env.PORT || 8080, async () => {
    logger.info(`Server running at port ${process.env.PORT || 8080}`);
  });
})();
