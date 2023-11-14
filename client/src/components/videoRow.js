import { VideoThumbnail } from "./thumbnail/videoThumbnail";
import { ShowAll } from "./basic/showAll";

export const VideoRow = ({ videoIds, limit, rowTitle }) => {

    return (
        <div className="w-full m-5 mx-auto">
            <span className="mx-5 lg:text-base font-bold">{rowTitle} Videos</span>
            <div className="grid grid-cols-3 gap-6 justify-between mx-5 mt-2">
                {
                    videoIds.length ? (videoIds.slice(0, limit).map((videoId, i) => (
                        <VideoThumbnail videoId={videoId} videoTitle={"Title of Video"} username={"Channel Name"} streamKey={"Stream Key"} live={false} />
                    ))) : (<div></div>)
                }
            </div>
            <div className={`${limit === videoIds.length? 'hidden' : ''}`}>
                <ShowAll category={"trending"} />
            </div>
        </div>
    )
}