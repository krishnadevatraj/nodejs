class errorhandler extends Error {
  statusCode: number;
  errors: any;
  constructor(
    statusCode: number,
    message: string,
    errors: any,
    stack?: string
  ) {
    super(message);
    Object.setPrototypeOf(this, errorhandler.prototype);
    this.statusCode = statusCode;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default errorhandler;
