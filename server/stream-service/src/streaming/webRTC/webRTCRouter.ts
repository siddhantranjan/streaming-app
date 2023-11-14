import express from 'express';
import { displayStreams } from './webRTCController';

const webRTCRoutes = express.Router();

webRTCRoutes.get('/allstreams', displayStreams)

export default webRTCRoutes;