import { validate } from "class-validator"
import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import APIError from "../error/api-errors";
import { UpdateUser } from "../../dtos/update-user.dto";
import { LoginUser, RegisterUser } from "../../dtos/auth.dto";
import { VideoDetails } from "../../dtos/video_details.dto";

const dtos: any = {
    "/users/dev/update": [UpdateUser, false],
    "/auth/dev/login": [LoginUser, true],
    "/auth/dev/signup": [RegisterUser, true],
    "/stream/dev/title": [VideoDetails, false]
}

interface ClassConstructor {
    new(...args: any[]): {};
}

export const validation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`URL: ${req.url}, METHOD: ${req.method}`);
        if (dtos[req.url]) {
            const dto: ClassConstructor = dtos[req.url][0];
            const forbidNonWhitelisted = dtos[req.url][1];

            req.body = plainToInstance(dto, req.body);

            const validationErrors: any[] = await validate(req.body, { whitelist: true, forbidNonWhitelisted });

            if (validationErrors.length) {
                const message: any = Object.entries(validationErrors[0]["constraints"])[0]
                throw new APIError({
                    message,
                    status: httpStatus.BAD_REQUEST
                })
            }
        }

        next()
    } catch (e) {
        next(e)
    }
}