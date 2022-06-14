/* eslint-disable no-undef */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // "^.+\\.graphql$": "graphql-import-node/jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@configs/(.*)": "<rootDir>/src/configs/$1",
    "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@plugins/(.*)": "<rootDir>/src/plugins/$1",
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
  },
};
