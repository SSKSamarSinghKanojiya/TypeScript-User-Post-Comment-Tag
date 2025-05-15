import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/utils/AppError";
import { errorResponse } from "../lib/utils/responseHandler";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) :any => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internl Server Error"

  return errorResponse(res,message,statusCode)
};
