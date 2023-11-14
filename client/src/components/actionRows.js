import { useNavigate } from 'react-router-dom';

import LiveTvIcon from '@mui/icons-material/LiveTv';
import PodcastsIcon from '@mui/icons-material/Podcasts';

import { path } from '../constants/client-path';

export const ActionRows = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row justify-evenly space-x-4 mt-10 w-5/6">
            <button type="button" className="w-1/2 group bg-blue text-yellow-light max-w-full h-24 focus:ring-4 focus:outline-none focus:ring-blue shadow-lg shadow-blue font-medium rounded-lg py-2.5" onClick={() => navigate(path.LIVE)}>
                <LiveTvIcon fontSize="large" />
                <h1 className="invisible group-hover:visible">Live</h1>
            </button>
            <button type="button" className="w-1/2 group bg-blue text-yellow-light max-w-full h-24 focus:ring-4 focus:outline-none focus:ring-blue shadow-lg shadow-blue font-medium rounded-lg py-2.5">
                <PodcastsIcon fontSize="large" />
                <h1 className="invisible group-hover:visible">Podcast</h1>
            </button>
        </div>
    )
}