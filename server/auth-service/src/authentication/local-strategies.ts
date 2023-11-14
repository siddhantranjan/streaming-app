import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status'
import APIError from '../utilities/error/api-errors'
import { User } from './models/dtos/user.dto';

export const handleLocal= (req: Request, res: Response, next: NextFunction) => async (err: Error, user: User, info: any) => {
  const error = err || info;
  const apiError = new APIError({
      message: error ? error.message : 'Invalid Credentials',
      status: httpStatus.BAD_REQUEST,
      stack: error ? error.stack : undefined,
    });

    if (error || !user){
      return next(apiError)
    };

    req.user = user;
    return next();
}
