import { Request, Response, NextFunction } from "express";
import logger from "../2-utils/logger";
import requestIp from "request-ip";

// Console log what happens in real time:
function verbose(request: Request, response: Response, next: NextFunction): void {

    const now = new Date();

    const userActivity = `
    User IP: ${requestIp.getClientIp(request)}
    Route: ${request.originalUrl}
    Method: ${request.method}
    Body: ${JSON.stringify(request.body)}`;

   logger.logActivity(userActivity);

    next(); // Continue request.
}

export default verbose;
