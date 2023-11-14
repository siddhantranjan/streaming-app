import { ChannleList } from "../components/channelList";
import { Navbar } from "../components/navbar/navbar";
import { useEffect, useState } from "react";
import { getAllStreams } from "../service/stream/getAllStreams";
import { VideoRow } from "../components/videoRow";
import { CategoryRow } from "../components/categoryRow";
import { ActionRows } from "../components/actionRows";


export function Dashboard() {
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

            {/* Channel list and activities and top videos */}
            <div className="flex flex-row mt-14 px-2 lg:mx-5 md:px-10">
                <div className="basis-1/4 h-10 hidden md:block">
                    <div>
                        <span>Favourites</span>
                        <ChannleList />
                    </div>
                    <div className="mt-10">
                        <span>Trending</span>
                        <ChannleList />
                    </div>
                </div>
                <div className="w-screen flex flex-col items-center lg:basis-3/4 md:ml-10">
                    <ActionRows />
                    <div className="flex flex-col items-center mt-10 space-y-4 p-4 max-w-full lg:h-full lg:mt-10">
                    <VideoRow videoIds={videoIds} limit={3} rowTitle={'Trending'} />
                    <VideoRow videoIds={videoIds} limit={3} rowTitle={'Trending'} />
                    </div>
                </div>
            </div>

            {/* Related to Streaming */}
            <div className="flex flex-col items-center mt-6 space-y-7 p-4 max-w-full lg:h-full lg:mt-10">

                <CategoryRow categoryImages={[require('../styles/img/league_of_legends.jpg'), require('../styles/img/apex-legends.jpg'), require('../styles/img/dota2.jpg'), require('../styles/img/overwatch.jpg')]} />

                <VideoRow videoIds={videoIds} limit={3} rowTitle={'Trending'} />
                <VideoRow videoIds={videoIds} limit={3} rowTitle={'Recent'} />
            </div>

            {/* Related to Podcast */}
            <div className="flex flex-col items-center mt-6 space-y-7 p-4 max-w-full lg:h-full lg:mt-10">

                <CategoryRow categoryImages={[require('../styles/img/20s.png'), require('../styles/img/americanRadical.jpg'), require('../styles/img/dark-house.jpg'), require('../styles/img/trojan-horse.jpg')]} />

                <VideoRow videoIds={videoIds} limit={3} rowTitle={'Trending'} />
                <VideoRow videoIds={videoIds} limit={3} rowTitle={'Trending'} />
            </div>
        </div>
    )
}