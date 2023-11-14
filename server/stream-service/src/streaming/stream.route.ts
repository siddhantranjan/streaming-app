import express from 'express';
import { authorize } from '../utilities/middlewares/auth';
import { generateStreamKey, getAllStreams, getUrlForvideoId, getVideoDetails, streamInfo, videoDetails } from './stream.controller';

const streamRoutes = express.Router();

streamRoutes.get('/info', streamInfo)
streamRoutes.post('/details', authorize, videoDetails)
streamRoutes.post('/generate/stream-key', authorize, generateStreamKey)
streamRoutes.get('/details', authorize, getVideoDetails)
streamRoutes.get('/saved/streams', getAllStreams)
streamRoutes.get('/url/:videoid', getUrlForvideoId)

export default streamRoutes;