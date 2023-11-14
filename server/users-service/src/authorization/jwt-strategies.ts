import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status'
import { User } from '../users/models/dtos/user.dto';
import APIError from '../utilities/error/api-errors'

export const handleJWT = (req: Request, res: Response, next: NextFunction) => async (err: Error, user: User, info: any) => {
    const error = err || info;

    const apiError = new APIError({
        message: error ? error.message : 'Unauthorized',
        status: httpStatus.UNAUTHORIZED,
        stack: error ? error.stack : undefined,
      });

      if (error || !user){
        return next(apiError)
      };

      req.user = user;
      return next();
}