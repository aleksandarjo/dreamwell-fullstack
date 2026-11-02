export type SuccessResponse<T = null> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  error: {
    message: string;
    details?: Record<string, string[]>;
  };
};

export type ActionResponse<T = null> = SuccessResponse<T> | ErrorResponse;
