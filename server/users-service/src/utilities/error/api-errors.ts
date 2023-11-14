import httpStatus from "http-status";
import ExtendableError from "./extendable-error";

class APIError extends ExtendableError {
    constructor({
        message,
        status = httpStatus.INTERNAL_SERVER_ERROR,
        stack = '',
        errors = '',
        isPublic = false,
    }: any) {
        super({ message, stack, status, errors, isPublic})
    }
}

export default APIError;