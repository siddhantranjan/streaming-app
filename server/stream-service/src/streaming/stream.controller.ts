import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import APIError from "../utilities/error/api-errors";
import { findAllUsersFromStreamKey, getDetails, saveLiveVideoDetails, getAllSavedStreams, getUrl, updateStreamKey } from "./stream.service";
import shortid from "shortid";

export const streamInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.streams) {
            let streams: any = req.query.streams;
            streams = JSON.parse(streams)

            let streamKeys: any = [];

            for (let stream in streams) {
                if (!streams.hasOwnProperty(stream)) continue;
                streamKeys.push(stream);
            }

            const users: any = await findAllUsersFromStreamKey(streamKeys)

            if (!users.length) {
                throw new APIError({
                    message: "Forbidden",
                    status: httpStatus.FORBIDDEN
                })
            }

            res.json(users)
        }
    } catch (e) {
        next(e)
    }
}

export const videoDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {video_title} = req.body;

        const {id}: any = req.user;
        const saveTitle = await saveLiveVideoDetails({user_id: id, title: video_title});

        res.send(saveTitle)
    }catch(e){
        next(e);
    }
}

export const getVideoDetails = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id}: any = req.user;
        const videoDetails = await getDetails(id);

        res.json(videoDetails);
    }catch(e){
        next(e);
    }
}

export const getAllStreams = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const allSavedStreams = await getAllSavedStreams();
        res.json(allSavedStreams);
    }catch(e){
        next(e);
    }
}

export const getUrlForvideoId = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {videoid}: any = req.params

        const urlForVideoId = await getUrl(videoid);
        res.json(urlForVideoId);
    }catch(e){
        next(e);
    }
}

export const generateStreamKey = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id}: any = req.user;

        const stream_key = shortid.generate();

        console.log("running: ", stream_key, id);
        const newstreamKey = await updateStreamKey(stream_key, id);

        res.json(newstreamKey);
    }catch(e){
        next(e);
    }
}