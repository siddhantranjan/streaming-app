import axios from "axios";
import { api } from "../../constants/api-link";

export const getUrl = async(videoid) => {
    const finalUrl = api.GETURL + "/" + videoid
    const {data}= await axios.get(finalUrl, {withCredentials: true});

    return data;
}