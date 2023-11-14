import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { getUrl } from "../../service/stream/getUrl"
import { getAllStreams } from "../../service/stream/getAllStreams"

import { localResource } from "../../constants/local-resource"

import { VideoRow } from "../../components/videoRow"
import { VideoPlayer } from "../../components/video-players/video-player"
import { Comment } from "../../components/comment"
import { Navbar } from "../../components/navbar/navbar"


export const VideoStreaming = () => {
    const [title, setTitle] = useState('Default Title');
    const [channel, setChannel] = useState('Default Channel')
    const [url, setUrl] = useState('')
    const {videoId} = useParams()
    const [videoIds, setVideoIds] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if(videoId){

            const getUrlFromVideoId = async() => {
                let {url} = await getUrl(videoId);
                url = url.split('/')
                
                const fullTitle = url[url.length - 1];
                const streamKey = url[url.length -2];
                let title = fullTitle.split('_');

                setTitle(title[0])
                setChannel(title[1])
                setUrl(`${localResource.URL}/live/${streamKey}/${fullTitle}`)
            }
            getUrlFromVideoId();
        }

        const getAllVideos = async() => {
            const getAllVideosIds = await getAllStreams();
            const allVideoIds = getAllVideosIds.map((videoId) => videoId.id)
            setVideoIds(allVideoIds.reverse())
        }
        getAllVideos();
    }, [videoId])
    

    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="z-10">
            <Navbar />
            </div>
            <div className="p-4 lg:w-3/4 ">
                <VideoPlayer videoUrl={url} videoTitle={title} channelTitle={channel}/>
            </div>
            <div className="h-96">
                <Comment />
            </div>
            <div className="flex flex-col items-center mt-20 space-y-4 p-4 lg:w-3/4 lg:h-full lg:-mt-10">
                <VideoRow videoIds={videoIds} limit={3} rowTitle={"Similar"} />
                <VideoRow videoIds={videoIds} limit={3} rowTitle={"Trending"} />
                <VideoRow videoIds={videoIds} limit={3} rowTitle={"Recent"} />
            </div>
        </div>
    )
}