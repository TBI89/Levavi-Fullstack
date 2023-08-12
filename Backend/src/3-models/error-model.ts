import StatusCode from "./status-code";

// Base class:
abstract class ClientError {
    constructor(public status: number, public message: string) { }
}

// Inherited classes:

// 400:
export class ValidationError extends ClientError {
    constructor(message: string) {
        super(StatusCode.BadRequest, message);
    }
}

// 401:
export class UnauthorizedError extends ClientError {
    constructor(message: string) {
        super(StatusCode.Unauthorized, message);
    }
}

// 404:
export class RouteNotfoundError extends ClientError {
    constructor(route: string) {
        super(StatusCode.NotFound, `Route ${route} doesn't exist.`);
    }
}

export class ResourceNotFoundError extends ClientError {
    constructor(id: number) {
        super(StatusCode.NotFound, `Id ${id} doesn't exist.`);
    }
}