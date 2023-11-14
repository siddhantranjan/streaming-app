import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import APIError from '../error/api-errors';
import { NextFunction, Request, Response, Errback } from 'express';
import config from '../../config/default';

const env = config.server.nodeEnv;

export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack
    }

    if(env !== 'development') delete response.stack;

    res.status(err.status);
    res.json(response);
};

export const converter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let convertedError = err;

    if(err instanceof expressValidation.ValidationError){
        convertedError = new APIError({
            message: 'Validation Error',
            status: err.statusCode,
            stack: err.stack,
            errors: err.error
        });
    }else if(!(err instanceof APIError)){
        convertedError = new APIError({
            message: err.message,
            status: err.status,
            stack: err.stack
        });
    }

    return handleError(convertedError, req, res, next);
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const err = new APIError({
        message: 'Not Found',
        status: httpStatus.NOT_FOUND,
    })

    return handleError(err, req, res, next);
}
