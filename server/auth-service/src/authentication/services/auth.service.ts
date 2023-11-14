import { scrypt as _scrypt } from "crypto";
import APIError from "../../utilities/error/api-errors";
import { createUser, findOne } from "./users.service"
import httpStatus from "http-status";
import jwt from 'jsonwebtoken'
import { promisify } from 'util';
import config from "../../config/default";
import shortid from 'shortid'
import encryptPassword from "../../utilities/encryptPassword";
import { Payload, RegisterUser } from "../models/dtos/auth.dto";
import { User } from "../models/dtos/user.dto";

const scrypt = promisify(_scrypt);

export const signUp = async (body: RegisterUser) => {
    const users = await findOne(body.email);

    if (users) {
        throw new APIError({
            message: 'User Already Exist',
            status: 400
        })
    }

    body.password = await encryptPassword(body.password)

    const stream_key = shortid.generate()

    Object.assign(body, {stream_key})
    const user = await createUser(body);

    const payload: Payload = { username: user.email, id: user.id };
    const token = jwt.sign(payload, config.auth.jwtSecret as string);
    return {token, user}
}

export const validateUser = async (email: string, password: string) => {
    const user: User = await findOne(email);

    if (!user) throw new APIError({
        message: "Invalid Username",
        status: httpStatus.BAD_REQUEST
    })

    const [salt, storedHashedPassword] = user.password.split('.');
    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHashedPassword !== hashedPassword.toString('hex')) {
        throw new APIError({
            message: 'Invalid Password',
            status: httpStatus.BAD_REQUEST
        })
    }

    return user
}

export const login = async(username: string, id: string) => {
    const user = await findOne(username);

    if(!user) throw new APIError({
        message: "Invalid Credentials",
        status: httpStatus.BAD_REQUEST
    })

    const payload: Payload = {
        username,
        id
    }
    const token = jwt.sign(payload, config.auth.jwtSecret as string);
    return token
}