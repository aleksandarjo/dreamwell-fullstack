import "server-only";

import { z, ZodError } from "zod";

import logger from "@/lib/logger";
import { RequestError } from "@/lib/http-errors";
import { ErrorResponse } from "@/types/action";

export default function handleError(error: unknown): ErrorResponse {
  if (error instanceof RequestError) {
    logger.warn({ err: error, statusCode: error.statusCode }, error.message);

    return {
      success: false,
      error: {
        message: error.message,
        details: error.errors,
      },
    };
  }

  if (error instanceof ZodError) {
    const details = z.flattenError(error).fieldErrors;

    logger.warn({ details }, "Validation failed");

    return {
      success: false,
      error: {
        message: "Validation failed",
        details,
      },
    };
  }

  logger.error({ err: error }, "Unexpected server error");

  return {
    success: false,
    error: {
      message: "An unexpected error occurred",
    },
  };
}
