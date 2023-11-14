import { NextFunction, Request, Response } from 'express';
import passport from 'passport'
import { handleJWT } from '../../authorization/jwt-strategies';
import { jwt } from '../../authorization/passport.jwt';

export const authorize = (req: Request, res: Response, next: NextFunction) => passport.authenticate(
    jwt, { session: false },
    handleJWT(req, res, next),
  )(req, res, next);