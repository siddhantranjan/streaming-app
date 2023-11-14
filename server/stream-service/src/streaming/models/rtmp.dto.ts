type StreamServerConfig = {
    rtmp: rtmp;
    http: HttpConfig;
    trans: TransConfig;
};

type rtmp = {
    port: number;
    chunk_size?: number;
    gop_cache?: boolean;
    ping?: number;
    ping_timeout?: number;
};

type HttpConfig = {
    port: number;
    allow_origin?: string;
    mediaroot?: string;
    webroot?: string;
    api?: boolean;
};

type TransConfig = {
    ffmpeg: string;
    tasks: TranscodingTask[];
};

type TranscodingTask = {
    app: string;
    hls?: boolean;
    hlsFlags?: string;
    dash?: boolean;
    dashFlags?: string;
};
