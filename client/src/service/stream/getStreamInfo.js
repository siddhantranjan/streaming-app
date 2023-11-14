import axios from "axios";
import { api } from "../../constants/api-link";

export const getStreamInfo = async() => {
    const {data}= await axios.get(api.STREAMINFO);
    return data;
}
