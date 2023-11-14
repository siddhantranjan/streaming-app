import { useNavigate, generatePath } from "react-router-dom"
import { path } from "../../constants/client-path"
import { localResource } from "../../constants/local-resource"

export function VideoThumbnail({ videoId, videoTitle, username, streamKey, live=false}) {
    const navigate = useNavigate()

    return (
        <div className="mb-4 basis-1/3 cursor-pointer mx-2.5" onClick={() => {
            const generatedPath = live ? generatePath(path.USER_LIVE, {username }) : generatePath(path.VIDEO, { videoId: videoId })
            navigate(generatedPath)
        }}>
            <div className="max-w-full h-auto flex flex-col">
                <img src={live ? `${localResource.LIVE_THUMBNAILS}/${streamKey}.png` : `${localResource.STREAM_THUMBNAILS}/${videoId}.png`} className="rounded-lg" alt="" />
                <div className="max-w-full">
                    <p className="text-xs break-all md:text-base ">{videoTitle} </p>
                    <p className="text-xs break-all md:text-base">{username}</p>
                </div>
            </div>
        </div>
    )
}