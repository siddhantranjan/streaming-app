import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet';
import { handleError, converter, notFound } from '../utilities/middlewares/error';
import { setupRateLimit } from '../setup/rate-limit-setup';
import { setupProxies } from '../setup/proxy-setup';
import { validation } from '../utilities/validations/validation';
import bodyParser from 'body-parser';
import cors from 'cors'

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  }


const app = express();

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.use(validation)

setupRateLimit(app);
setupProxies(app);

app.use(morgan('combined'))

app.use(helmet());

app.use(converter);

app.use(notFound);

app.use(handleError);

export default app;
