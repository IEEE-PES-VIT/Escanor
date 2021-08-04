import { Response } from "express";

export const customErrorHandler = (
  res: Response | any, // or any at times
  statusCode: number = 500,
  message: string = "Internal Server Error",
  error?: Error
) => {
  res.status(statusCode || 500).json({
    msgError: true,
    message,
    error: error ? error.message : null,
  });
};
