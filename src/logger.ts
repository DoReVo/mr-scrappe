import pino from "pino";

export const logger = pino({
  prettyPrint: process.env.NODE_ENV === "develop" ? true : false,
});
