import { CronJob } from 'cron';
import axios from 'axios';
import config from '../../config/default';
import { generateStreamThumbnail } from './helper';

const handleStream = async () => {
    try {
        const port = config.rtmp_server.http.port
        let streams: any = await axios.get('http://127.0.0.1:' + port + '/api/streams');

        if (streams.data['live']) {
            let liveStreams = streams.data['live'];
            for (let stream in liveStreams) {
                if (!liveStreams.hasOwnProperty(stream)) continue;
                generateStreamThumbnail(stream);
            }
        }
    } catch (e) {
        log.error(JSON.stringify(e))
    }
}

export const job = new CronJob('*/10 * * * * *', handleStream, null, true);