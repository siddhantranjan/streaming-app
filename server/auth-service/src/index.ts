import config from './config/default'
import app from './config/express'
import {logger, stream} from './config/logger'
import { PrismaClient } from '@prisma/client'

const port = config.server.port;
const env = config.server.nodeEnv;

declare global {
    var log: any;
    var logStream: any;
    var prisma: any;
}

global.log = logger
global.logStream = stream
global.prisma = new PrismaClient()

app.listen(port, () => logger.info(`Auth Server started on port ${port} (${env})`))

export default app;