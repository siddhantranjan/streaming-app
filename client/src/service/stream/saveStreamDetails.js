import axios from "axios";
import { api } from "../../constants/api-link";

export const saveStreamDetails = async(video_title) => {
    const payload = {video_title};

    const {data}= await axios.post(api.STREAMDETAILS, payload, {withCredentials: true});
    return data;
}