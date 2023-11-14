import config from "../../config/default";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import encryptPassword from "../../utilities/encryptPassword";
import APIError from "../../utilities/error/api-errors";
import { User } from "../models/dtos/user.dto";
import { update, findAll, findOne, deleteOne, saveUserCoverMedia, saveUserProfileMedia, findUsername } from "../services/user.service"
const fs = require('fs');

export const findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email: any = req.query.email;
        let user: User | User[];

        if (email) {
            user = await findOne(email);
        } else {
            user = await findAll();
        }

        res.json({ user })
    } catch (e) {
        next(e);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new APIError({
            message: "Invalid User",
            status: httpStatus.BAD_REQUEST
        })

        const { email, id }: any = req.user;

        const deletedUser = await deleteOne(email, id);
        res.json({ deletedUser });
    } catch (e) {
        next(e);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        if (data.password) {
            data.password = await encryptPassword(data.password)
        }

        if (!req.user) throw new APIError({
            message: "Invalid User",
            status: httpStatus.BAD_REQUEST
        })

        const { email }: any = req.user;

        const updatedUser = await update(email, data);
        res.json({ updatedUser });
    } catch (e) {
        next(e);
    }
}

export const getStreamKey = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email }: any = req.user;

        if (!email) throw new APIError({
            message: 'Invalid User',
            status: httpStatus.BAD_REQUEST
        })

        const user = await findOne(email);

        res.json({ email, stream_key: user.stream_key })
    } catch (e) {
        next(e);
    }
}

export const whoAmI = async (req: Request, res: Response) => {
    const user: any = req.user;
    res.json({ user })
}

export const getUserDetailsFromUsername = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {username}: any = req.query
        const userDetails = await findUsername(username);

        res.json(userDetails);
    }catch(e){
        next(e);
    }
}


export const saveCoverMediaDetails = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id }: any = req.user;

        const imageBuffer = req.body;
        const filePath = `${config.mediaPath}/${id}_cover.png`;

        const buffer = req.body
        console.log('someData:  ', JSON.stringify(buffer))

        fs.writeFileSync(filePath, imageBuffer);
        let mediaDetails: any = await saveUserCoverMedia(id, filePath);

        res.json({ mediaDetails });
    } catch (e) {
        next(e);
    }
}

export const saveProfileMediaDetails = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id }: any = req.user;

        const imageBuffer = req.body;
        const filePath = `${config.mediaPath}/${id}_profile.png`

        fs.writeFileSync(filePath, imageBuffer);
        let mediaDetails: any = await saveUserProfileMedia(id, filePath);

        res.json({ mediaDetails });
    } catch (e) {
        next(e);
    }
}