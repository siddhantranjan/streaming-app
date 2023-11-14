import axios from "axios";
import { api } from "../../constants/api-link";

export const getLiveStreamDetails = async(live_stream) => {
    const params = {streams: JSON.stringify(live_stream)}
    const {data}= await axios.get(api.LIVESTREAMDETAILS, {params}, {withCredentials: false});
    return data;
}
