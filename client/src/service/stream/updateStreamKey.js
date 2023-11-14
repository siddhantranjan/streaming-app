import axios from "axios";
import { api } from "../../constants/api-link";

export const updateStreamKey = async() => {
    const payload = {}
    
    const {data}= await axios.post(api.GENERATESTREAMKEY, payload, {withCredentials: true});
    return data;
}