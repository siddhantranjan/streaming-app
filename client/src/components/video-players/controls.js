import { PlayerSlider, VolumeSlider } from "./slider";
import IconButton from "@material-ui/core/IconButton";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeMute from "@mui/icons-material/VolumeOff";
import FullScreen from "@mui/icons-material/Fullscreen";
import { forwardRef } from "react";
import { Tooltip } from "@material-ui/core";


function ValueLabelComponent(props) {
    const { children, open, value } = props;
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }


export const Controls = forwardRef(({
    currentTimeInSeconds,
    totalDurationInSeconds,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    onRewind,
    onPlayPause,
    onFastForward,
    onLive,
    playing,
    elapsedTime,
    totalDuration,
    onMute,
    muted,
    onVolumeSeekDown,
    onChangeDispayFormat,
    onToggleFullScreen,
    volume,
    onVolumeChange,
    title
}, ref) => {
    return (
        <div className="flex flex-col justify-between w-full h-[85%] absolute top-0 left-0 bottom-0 right-0 bg-blue bg-opacity-25">
            <div className="flex flex-row justify-between items-center">
                <div className="text-yellow-light ml-5 mt-5">{title}</div>
            </div>
            <div className="flex flex-row justify-center">
                <IconButton
                    onClick={onRewind}
                    className=""
                    aria-label="rewind"
                >
                    <FastRewindIcon
                        className=""
                        fontSize="inherit"
                        sx={{ color: "#F1BF01" }}
                    />
                </IconButton>
                <IconButton
                    onClick={onPlayPause}
                    className=""
                    aria-label="play"
                >
                    {playing ? (
                        <PauseIcon fontSize="inherit" sx={{ color: "#F1BF01" }} />
                    ) : (
                        <PlayArrowIcon fontSize="inherit" sx={{ color: "#F1BF01" }} />
                    )}
                </IconButton>
                <IconButton
                    onClick={onFastForward}
                    className=""
                    aria-label="forward"
                >
                    <FastForwardIcon fontSize="inherit" sx={{ color: "#F1BF01" }} />
                </IconButton>
            </div>
            <div className="flex flex-col">
                <div className="w-full basis-1/2 px-4 flex flex-col items-center">
                    <PlayerSlider
                        min={0}
                        max={totalDurationInSeconds}
                        ValueLabelComponent={(props) => (
                          <ValueLabelComponent {...props} value={elapsedTime} />
                        )}
                        aria-label="custom thumb label"
                        value={currentTimeInSeconds}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                    />
                </div>
                <div className="flex flex-row px-4 justify-between w-full -mt-5 md:mt-0">
                    <div className="basis-1/2 flex flex-row space-x-4 justify-start items-center">
                        {playing ? (
                            <PauseIcon fontSize="small" sx={{ color: "#F1BF01" }} onClick={onPlayPause} className="cursor-pointer"/>
                        ) : (
                            <PlayArrowIcon fontSize="small" sx={{ color: "#F1BF01" }} onClick={onPlayPause} className="cursor-pointer"/>
                        )}
                        {muted ? (
                            <VolumeMute fontSize="small" sx={{ color: "#F1BF01" }} onClick={onMute} className="cursor-pointer"/>
                        ) : volume > 0.5 ? (
                            <VolumeUp fontSize="small" sx={{ color: "#F1BF01" }} onClick={onMute} className="cursor-pointer"/>
                        ) : (
                            <VolumeDown fontSize="small" sx={{ color: "#F1BF01" }} onClick={onMute} className="cursor-pointer"/>
                        )}
                        <VolumeSlider
                            aria-label="volume slider"
                            min={0}
                            max={100}
                            value={muted ? 0 : volume * 100}
                            onChange={onVolumeChange}
                            aria-labelledby="input-slider"
                            onMouseDown={onSeekMouseDown}
                            onChangeCommitted={onVolumeSeekDown}
                        />
                        <button onClick={onChangeDispayFormat} className="text-yellow-light">
                            {elapsedTime}/{totalDuration}
                        </button>
                    </div>
                    <div className="basis-1/2 flex flex-row justify-end items-center space-x-4">
                        <h1 className="text-yellow-light text-xl cursor-pointer" onClick={onLive}>Live</h1>
                        <FullScreen fontSize="small" sx={{ color: "#F1BF01" }} onClick={onToggleFullScreen} className="cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>

    )
})