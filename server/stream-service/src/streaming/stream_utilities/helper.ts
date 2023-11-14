import { spawn, exec } from "child_process";
import config from "../../config/default";

export const generateStreamThumbnail = (stream_key: string) => {
    const args = [
        '-y',
        '-i', 'http://127.0.0.1:8888/live/'+stream_key+'/index.m3u8',
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        `${config.rtmp_server.path.live_stream_thumbnails}/${stream_key}.png`
    ];

    const cmd = config.rtmp_server.trans.ffmpeg;
    spawn(cmd, args, {
        detached: true,
        stdio: 'ignore'
    }).unref()
}

