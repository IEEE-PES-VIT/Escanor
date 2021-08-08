import { Response } from "express";

/**
 * Custom Error Handler, for easy frontend integration and Error template
 * @param {Response | any} res - Express Response for returning json data with status. `Required`
 * @param {number} status - Status code for the response from the server.`Optional`
 * @param {string} message - Message to be sent to the client side by the server. `Optional`
 * @param {Error} error - If status is 500, it will show the error message. `Optional`
 * @returns {void} - Will Return json data with Express status and error message. `Optional`
 */
export const customErrorHandler = (
  res: Response | any, // or any at times
  statusCode: number = 500,
  message: string = "Internal Server Error",
  error?: Error
): void => {
  res.status(statusCode || 500).json({
    msgError: true,
    message,
    error: error ? error.message : null,
  });
};
