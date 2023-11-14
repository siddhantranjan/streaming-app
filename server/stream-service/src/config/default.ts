const config = {
    auth: {
        jwtSecret: 'someLiteralSecret'
    },
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
        port: 3004,
        nodeEnv: 'development'
    },
    rtmp_server: {
        path: {
            live_stream_thumbnails: 'D:/Projects/nyx-project/media/thumbnails/live_stream_thumbnails',
            stream_thumbnails: 'D:/Projects/nyx-project/media/thumbnails/stream_thumbnails'
        },
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8888,
            mediaroot: 'D:/Projects/nyx-project/media/videos',
            allow_origin: '*'
        },
        trans: {
            ffmpeg: 'C:/Users/Sidha/Desktop/ffmpeg-5.0.1-full_build/bin/ffmpeg.exe',
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
                    vc: "copy",
                    vcParam: ['-preset', 'slow', '-crf', '22'],
                    mp4: true,
                    mp4Flags: '[movflags=faststart]',
                }, 
            ]
        }
    }
};

export default config;