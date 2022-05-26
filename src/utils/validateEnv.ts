import { cleanEnv, port, str } from "envalid";

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ["test", "dev", "stg", "prod"] }),
    PORT: port(),
    MONGO_CLUSTER: str(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_DBNAME: str(),
    MONGO_READONLY_USER: str(),
    MONGO_READONLY_PASSWORD: str(),
    API_KEY: str(),
    ENCRYPTION_SECRET: str(),
    JWT_SECRET: str(),
  });
};

export default validateEnv;
