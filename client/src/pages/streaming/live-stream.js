import { VideoPlayer } from "../../components/video-players/video-player"
import { Comment } from "../../components/comment"
import { Navbar } from "../../components/navbar/navbar"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { fetchCurrentUser, getUserDetails } from "../../service/user/fetchUserDetails"
import ReactPlayer from "react-player"
import { getLocalPreviewAndInitPeerConnection } from "../../helper/webRTCHandler/webRTCHandler"

export const LiveStreaming = () => {
    const [url, setUrl] = useState();
    const [title, setTitle] = useState();

    const { username } = useParams()

    useEffect(() => {
        async function getStreamDetails() {
            if (username) {
                const { stream_key, live_video_details } = await getUserDetails(username);
                setUrl(`http://localhost:8888/live/${stream_key}/index.m3u8`)
                const { title } = live_video_details;
                setTitle(title)
            }
        }

        getStreamDetails();
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="z-10">
                <Navbar />
            </div>
            <div className="flex flex-col items-center mt-20 space-y-4 lg:flex-row lg:h-full lg:m-5 lg:mt-20">
                <VideoPlayer videoUrl={url} videoTitle={title} channelTitle={username} />
                <Comment />
            </div>
        </div>
    )
}