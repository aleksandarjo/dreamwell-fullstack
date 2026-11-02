export class RequestError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class ValidationError extends RequestError {
  constructor(errors: Record<string, string[]>) {
    super(400, "Validation failed", errors);
  }
}

export class UnauthorizedError extends RequestError {
  constructor() {
    super(401, "Authentication required");
  }
}

export class ForbiddenError extends RequestError {
  constructor() {
    super(403, "You do not have permission to perform this action");
  }
}

export class NotFoundError extends RequestError {
  constructor(resource = "Resource") {
    super(404, `${resource} not found`);
  }
}
