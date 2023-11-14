import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { scrypt as _scrypt } from "crypto";
import config from '../config/default';
import { Payload } from './auth.dto';
import { Request } from 'express';
import { findOne } from '../streaming/stream.service';

const cookieExtractor = function(req: Request) {
    var token = null;
    if (req && req.cookies) token = req.cookies['token'];

    return token;
  };

const jwtOptions = {
    secretOrKey: config.auth.jwtSecret,
    jwtFromRequest: cookieExtractor
}

const jwtFunc = async (payload: Payload, done: any) => {
    try {
        const { username }: Payload = payload;
        const user = await findOne(username);

        if (!user) return done(null, false);

        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
}

export const jwt = new JwtStrategy(jwtOptions, jwtFunc)

