import config from './config/default'
import app from './streaming/webRTC/socketHandler'
import {logger, stream} from './config/logger'
import { PrismaClient } from '@prisma/client'
import nms from './streaming/media-server'
import { job } from './streaming/stream_utilities/cronThumbnails'


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

app.listen(port, () => logger.info(`Stream Server started on port ${port} (${env})`))
nms.run();
job.start();
