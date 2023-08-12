import { Request, Response, NextFunction } from "express";
import { RouteNotfoundError } from "../3-models/error-model";

function routeNotFound(request: Request, response: Response, next: NextFunction): void {
    next(new RouteNotfoundError(request.originalUrl));
}

export default routeNotFound;