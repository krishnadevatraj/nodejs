import joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { pick } from "../utils/pick";
import errorhandler from "../utils/errorHandler";
import status from "http-status";
export const validate =
  (schema: {
    params?: ObjectSchema;
    query?: ObjectSchema;
    body?: ObjectSchema;
  }) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const validSchema = pick(schema, ["params", "query", "body"]);

    const object = pick(req, Object.keys(validSchema));
    const { error, value } = joi
      .preferences({
        errors: { label: "key" },
        abortEarly: false,
      })
      .validate(object);
    if (error) {
      const errorMessage = error.details
        .map((error) => error.message)
        .join(", ");
      return next(
        new errorhandler(status.BAD_REQUEST, "Validation Error", errorMessage)
      );
    }
    Object.assign(req, value);
    return next();
  };
