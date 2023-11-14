import { Request, Response } from "express";
import * as Streams from "./streams";

export const displayStreams = (req: Request, res: Response) => {
    let streamList = Streams.getStreams()
    res.json({streamList})
}