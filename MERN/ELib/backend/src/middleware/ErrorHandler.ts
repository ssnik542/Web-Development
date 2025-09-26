import { HttpError } from "http-errors";
import { config } from "../config/config";
import { NextFunction, Request, Response } from "express";

const ErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message || "Internal Server",
    errorStack: config.env === "development" ? err.stack : "",
  });
};
export default ErrorHandler;
