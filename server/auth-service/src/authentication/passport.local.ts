import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/dtos/user.dto';
import { validateUser } from "./services/auth.service";

const localFunc = async (username: string, password: string, done: any) => {
    try {
        const user: User = await validateUser(username, password);

        if (!user) return done(null, false)

        return done(null, user);
    } catch (e) {
        return done(e);
    }
}

export const local = new LocalStrategy(localFunc)

