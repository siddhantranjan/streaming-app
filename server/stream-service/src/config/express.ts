import bodyParser from 'body-parser';
import express from 'express'
import morgan from 'morgan'
import compress from 'compression'
import helmet from 'helmet';
import { handleError, converter, notFound } from '../utilities/middlewares/error';
import cookieParser from 'cookie-parser'
import streamRoutes from '../streaming/stream.route';
import { replacer } from '../utilities/serializer/response.serializer';
import webRTCRoutes from '../streaming/webRTC/webRTCRouter';

const app = express();
app.set("json replacer", replacer);

app.use(morgan('combined'))

app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.use(compress());

app.use(helmet());

app.use('/dev/webrtc', webRTCRoutes)
app.use('/dev', streamRoutes)

app.use(converter);

app.use(notFound);

app.use(handleError);

export default app;
