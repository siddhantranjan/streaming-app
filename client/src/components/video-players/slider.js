import Slider from '@material-ui/core/Slider';
import styled from "@emotion/styled";

export const PlayerSlider = styled(Slider)({
    color: '#F1BF01',
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: -16,
        backgroundColor: 'unset',
        color: "#F1BF01",
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: "#F1BF01",
        },
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
    },
});

export const VolumeSlider = styled(Slider)({
    color: '#F1BF01',
    width: "40%",
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: -16,
        backgroundColor: 'unset',
        color: "#F1BF01",
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: "#F1BF01",
        },
    },
});

