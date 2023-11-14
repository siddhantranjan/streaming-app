import { NextFunction, Request, Response } from 'express';
import passport from 'passport'
import { handleLocal } from '../../authentication/local-strategies';
import { local } from '../../authentication/passport.local';

export const authenticate = (req: Request, res: Response, next: NextFunction) => passport.authenticate(
  local, { session: false },
  handleLocal(req, res, next),
)(req, res, next);