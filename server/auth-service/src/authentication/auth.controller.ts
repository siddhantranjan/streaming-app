import { login, signUp } from "./services/auth.service";
import {Request, Response, NextFunction, RequestHandler} from 'express';

export const loginUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: any = req.user;
        const token = await login(user.email, user.id);

        res.cookie('token', token, { httpOnly: true })
        res.json({ user })
    } catch (e) {
        next(e)
    }
}

export const registerUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const { user, token } = await signUp(body);

        res.cookie('token', token, { httpOnly: true })
        res.json({ user });
    } catch (e) {
        next(e)
    }
}

export const logoutUser: RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('token').json({message: "User Logger Out"});
}

