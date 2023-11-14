import config from './config/default'
import app from './config/express'
import {logger, stream} from './config/logger'
const port = config.server.port;
const env = config.server.nodeEnv;

declare global {
    var log: any;
    var logStream: any;
    var prisma: any;
}

global.log = logger
global.logStream = stream

app.listen(port, () => logger.info(`API Gateway Server started on port ${port} (${env})`))

export default app;