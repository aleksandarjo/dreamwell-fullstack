import "server-only";

import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",

  transport: !isProduction
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname",
          translateTime: "SYS:standard",
        },
      }
    : undefined,

  formatters: {
    level: (label) => ({
      level: label.toUpperCase(),
    }),
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  redact: {
    paths: ["password", "token", "authorization", "req.headers.authorization"],
    censor: "[REDACTED]",
  },
});

export default logger;
