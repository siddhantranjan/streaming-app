import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";

import { Navbar } from "../../components/navbar/navbar";
import { VideoThumbnail } from "../../components/thumbnail/videoThumbnail";
import { CategoryRow } from "../../components/categoryRow";
import { GoingLiveStepOne } from "../../components/live-action/goLiveStepOne";
import { GoingLiveStepTwo } from "../../components/live-action/goLiveStepTwo";
import { GoingLiveStepThree } from "../../components/live-action/goLiveStepThree";
import { ShowAll } from "../../components/basic/showAll";

import { getStreamKey } from "../../service/stream/getStreamKey";
import { saveStreamDetails } from "../../service/stream/saveStreamDetails";
import { getStreamDetails } from "../../service/stream/getStreamDetails";
import { getStreamInfo } from "../../service/stream/getStreamInfo";
import { getLiveStreamDetails } from "../../service/stream/getLiveStreamDetails";
import { updateStreamKey } from "../../service/stream/updateStreamKey";
import { path } from "../../constants/client-path";

export function Live() {
    const [step, setStep] = useState(1);
    const [platform, setPlatform] = useState('')
    const [streamKey, setStreamKey] = useState()
    const [liveDetails, setLiveDetails] = useState([])
    const [title, setTitle] = useState('Stream Title')

    const navigate = useNavigate();
    const user = useSelector(state => state.users)

    useEffect(() => {
        async function getAllLiveStreaming() {
            const streams = await getStreamInfo();
            if (streams['live']) {
                const liveStreamDetails = await getLiveStreamDetails(streams['live'])

                const liveDetailsFromDatabase = []
                liveStreamDetails.forEach((liveStream) => {
                    const liveDetail = {
                        title: liveStream.video_details[0].title,
                        username: liveStream.username,
                        streamKey: liveStream.stream_key,
                        videoId: liveStream.video_details[0].id
                    }
                    liveDetailsFromDatabase.push(liveDetail)
                })
                setLiveDetails(liveDetailsFromDatabase)
            }
        }
        getAllLiveStreaming();
    }, [])

    const generateNewStreamkey = async () => {
        //generate new Stream key;
        const { stream_key } = await updateStreamKey();

        setStreamKey(stream_key)
    }

    const setCurrentPlatform = (event) => {
        localStorage.setItem("platform", event.target.value);
        setPlatform(event.target.value)
    }

    const handlePlatForm = async () => {

        if (step === 1) {
            if (platform === '') {
                alert("Please choose among two")
            }
            else if (platform === 'STREAMING') {
                const { stream_key } = await getStreamKey();
                setStreamKey(stream_key);
                setStep(step + 1)
            } else if (platform === 'WEBCAM') {
                setStep(step + 1)
            }
            const videoDetails = await getStreamDetails();

            if (videoDetails?.title) setTitle(videoDetails?.title)
        } else if (step === 2) {
            const streamDetails = await saveStreamDetails(title);
            setTitle(streamDetails.title)

            platform === 'STREAMING' ? setStep(step+1) : navigate(generatePath(path.USER_LIVE, {username: user.value.user.username}))

        }
    }

    return (
        <div className="flex flex-col">
            <Navbar />
            <div className={`"mx-2 md:mx-auto md:w-1/2 lg:w-1/3 lg:px-24" + ${user.value ? "" : "hidden"}`}>
                <div className="box-border bg-blue rounded-lg h-auto mt-32">
                    {
                        {
                            1: <GoingLiveStepOne setCurrentPlatform={setCurrentPlatform} />,
                            2: <GoingLiveStepTwo title={title} setTitle={setTitle} />,
                            3: <GoingLiveStepThree stream_key={streamKey} />
                        }[step]
                    }

                </div>

                <div className="flex flex-row justify-between items-center p-5 mx-auto">
                    <button className={`" text-yellow-light bg-blue hover:bg-blue focus:ring-4 focus:ring-blue font-medium rounded-lg text-base px-5 py-2.5 focus:outline-none"+ ${step === 1 ? "hidden" : "block"} + ${step === 3 ? "mx-auto" : ""}`} onClick={() => setStep(step - 1)}>Previous</button>
                    <button className={`" text-yellow-light bg-blue hover:bg-blue focus:ring-4 focus:ring-blue font-medium rounded-lg text-base px-10 py-2.5 focus:outline-none" + ${step === 1 ? "mx-auto" : ""} + ${step === 3 ? "hidden" : "block"}`} onClick={handlePlatForm}>Next</button>
                    <button className={`" text-yellow-light bg-blue hover:bg-blue focus:ring-4 focus:ring-blue font-medium rounded-lg text-base px-5 py-2.5 focus:outline-none"+ ${step === 3 ? "block" : "hidden"} + ${step === 2 ? "mx-auto" : ""}`} onClick={generateNewStreamkey}>Generate New Stream Key</button>


                </div>
            </div>
            <div className={`"flex flex-col items-center space-y-7 p-2 w-full lg:h-full" + ${user.value ? "" : "mt-20"}`}>
                <div className="w-full mx-auto mt-10 flex flex-col space-y-5 items-center">
                    <p className="mx-5 font-bold capitalize text-blue lg:text-base">Current Live Channels</p>
                    <CategoryRow categoryImages={[require('../../styles/img/league_of_legends.jpg'), require('../../styles/img/apex-legends.jpg'), require('../../styles/img/dota2.jpg'), require('../../styles/img/overwatch.jpg')]} />

                    <ShowAll category="Live" />
                </div>

                <div className="w-full m-2 mt-5">
                    <div className="grid grid-cols-3 gap-6 justify-between mt-2">
                        {
                            liveDetails.length ? (liveDetails.map(({ title, username, streamKey, videoId }, i) => (

                                <VideoThumbnail videoId={videoId} videoTitle={title} username={username} streamKey={streamKey} live={true} />

                            ))) : (<div></div>)
                        }
                    </div>
                    {
                        liveDetails.length ? (<div></div>) : (<div className="w-fit mx-auto text-3xl">Currently No One is Live Now</div>)
                    }
                </div>
            </div>
        </div>
    )
}