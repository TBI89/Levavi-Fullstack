import { Request, Response, NextFunction } from "express";
import StatusCode from "../3-models/status-code";
import logger from "../2-utils/logger";
import appConfig from "../2-utils/app-config";

// Catch all middleware:
function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

    const status = err.status || StatusCode.InternalServerError; // Take status.
    const isCrash = status >= 500 && status <= 599;
    console.log("Error: " , err); // Display error on the console.
    logger.logError(err.message, err) // Log errors to a file.
    const message = isCrash && appConfig.isProduction ? "Server error, please try again." :  err.message; // Take message.
    response.status(status).send(message); // Display the error to the user. 
}

export default catchAll;