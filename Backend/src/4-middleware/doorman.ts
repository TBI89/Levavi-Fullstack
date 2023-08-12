import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../3-models/error-model";

// Allow access only for the our frontend:
function doorman(request: Request, response: Response, next: NextFunction): void {

    const doormanKey = "Levavi-Association-2023";
    if(request.header("doormanKey") !== doormanKey) {
        next(new UnauthorizedError("You are not authorized!")); // If the doorman key doesn't match: don't continue.
        return;
    }

    next(); // If the key matches: continue.
}

export default doorman;