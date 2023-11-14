import bodyParser from 'body-parser';
import express from 'express'
import morgan from 'morgan'
import compress from 'compression'
import helmet from 'helmet';
import { handleError, converter, notFound } from '../utilities/middlewares/error';
import cookieParser from 'cookie-parser'
import { replacer } from '../utilities/serializer/response.serializer';
import userRoutes from '../users/routes/user.route';

const app = express();

app.set("json replacer", replacer);

app.use(morgan('combined'))

app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.raw({ limit: '50mb', type: ['image/*'] }));

app.use(compress());

app.use(helmet());

app.use('/dev', userRoutes);

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handleError);

export default app;
