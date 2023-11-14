import config from '../config/default';

import { generateStreamThumbnail } from './stream_utilities/helper';
import { User } from './models/user.dto';
import { getUserFilteredOnStreamKey } from './stream.service';
import NodeMediaServer from 'node-media-server';

const nms = new NodeMediaServer(config.rtmp_server);

nms.on('prePublish', async (id: any, StreamPath: string, args: any) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    log.info('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    const user: User = await getUserFilteredOnStreamKey(stream_key);

    if (!user) {
        let session: any = nms.getSession(id);
        session.reject();
    } else {
        log.info(`Stream Key is Valid ${stream_key}`)
        generateStreamThumbnail(stream_key)
    }
})

const getStreamKeyFromStreamPath = (path: string) => {
    let parts = path.split('/')
    return parts[parts.length - 1];
}

export default nms;