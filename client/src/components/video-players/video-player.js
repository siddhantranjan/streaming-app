import { useState } from "react";
import { useRef } from "react"
import ReactPlayer from "react-player"
import { Controls } from "./controls";
import screenful from 'screenfull'
import { useEffect } from "react";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export function VideoPlayer({ videoUrl, videoTitle, channelTitle }) {
  const [url, setUrl] = useState();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [seeking, setSeeking] = useState(false);
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal")

  useEffect(() => {
    setUrl(videoUrl);
    setPlayed(0);
  }, [videoUrl])

  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const playerContainerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  }

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  }

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleSeekChange = (e, newValue) => {
    setPlayed(parseFloat(newValue))
  };


  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e, newValue) => {
    setSeeking(false);
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue);
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setSeeking(false);
    setVolume(parseFloat(newValue / 100))
  };

  const handleVolumeChange = (e, newValue) => {
    setVolume(parseFloat(newValue / 100));
    setMuted(newValue === 0 ? true : false);
  };

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    )
  }

  const handlePlaybackRate = (rate) => {
    setPlaybackRate(rate);
  }

  const handleMute = () => {
    setMuted(!muted);
  }

  const currentTimeInSeconds = playerRef && playerRef.current ? playerRef.current.getCurrentTime() : "00:00";
  const totalDurationInSeconds = playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";

  const elapsedTime = timeDisplayFormat === "normal" ? format(currentTimeInSeconds) : `-${format(totalDurationInSeconds - currentTimeInSeconds)}`;

  const totalDuration = format(totalDurationInSeconds);

  const handleLive = () => {
    playerRef.current.seekTo(totalDurationInSeconds);
  }


  return (
    <div className="h-full w-full flex flex-col items-center p-2 lg:basis-3/4">
      <div className="w-full h-full group relative" ref={playerContainerRef}>
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="85%"
          url={url}
          playing={playing}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onProgress={(progress) => {
            if (!seeking) setPlayed(progress.playedSeconds);
          }}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onBuffer={() => console.log('onBuffer')}
          onSeek={e => console.log('onSeek', e)}
          onError={e => console.log('onError', e)}
          onEnded={() => setPlaying(!playing)}
        />
        <Controls
          ref={controlsRef}
          currentTimeInSeconds={currentTimeInSeconds === "00:00" ? 0 : currentTimeInSeconds}
          totalDurationInSeconds={totalDurationInSeconds === "00:00" ? 0 : totalDurationInSeconds}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          onRewind={handleRewind}
          onPlayPause={handlePlayPause}
          onFastForward={handleFastForward}
          onLive={handleLive}
          playing={playing}
          played={played}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onMute={handleMute}
          muted={muted}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekDown={handleVolumeSeekDown}
          onChangeDispayFormat={handleDisplayFormat}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRate}
          onToggleFullScreen={toggleFullScreen}
          title={videoTitle}
          volume={volume} />

        <div className="flex flex-row justify-between px-2 m-5 mb-0">
          <div className="flex flex-col">
            <span className="text-xs lg:text-sm">{videoTitle}</span>
            <span className="text-xs lg:text-sm">{channelTitle}</span>
          </div>
          <button type="button" className="text-blue hover:text-yellow-light border border-blue hover:border-yellow-light focus:ring-4 focus:outline-none focus:ring-blue font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-1 mb-1 lg:text-sm lg:px-5 lg:py-2.5 lg:mr-2 lg:mb-2">follow</button>
        </div>
      </div>
    </div>
  )
}