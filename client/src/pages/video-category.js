import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getAllStreams } from '../service/stream/getAllStreams';

import { Navbar } from '../components/navbar/navbar';
import { VideoRow } from '../components/videoRow';
import { ShowAll } from '../components/basic/showAll';
import { CategoryRow } from '../components/categoryRow';

export function VideoCategory() {
    const {category} = useParams();
    const [videoIds, setVideoIds] = useState([]);

    useEffect(() => {
        const getAllVideos = async() => {
            const getAllVideosIds = await getAllStreams();
            const allVideoIds = getAllVideosIds.map((videoId) => videoId.id)
            setVideoIds(allVideoIds.reverse())
        }
        getAllVideos();
    }, [])

    return (
        <div className="w-screen h-auto flex flex-col">
            <Navbar />
            <div className="flex flex-col items-center mt-10 space-y-7 p-4 max-w-full lg:h-full lg:mt-10">
                <div className="w-full m-5 flex flex-col space-y-5 items-center">
                    <p className="mx-5 font-bold capitalize text-blue lg:text-base">{category} Channels</p>
                    <CategoryRow categoryImages={[require('../styles/img/league_of_legends.jpg'), require('../styles/img/apex-legends.jpg'), require('../styles/img/dota2.jpg'), require('../styles/img/overwatch.jpg')]} />
                    <ShowAll category={category}/>
                </div>

                <VideoRow videoIds={videoIds} limit={videoIds.length} rowTitle={'Trending'} />
            </div>
        </div>
    )
}