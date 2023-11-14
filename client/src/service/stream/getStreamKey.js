import axios from "axios";
import { api } from "../../constants/api-link";

export const getStreamKey = async() => {
    const {data}= await axios.get(api.STREAMKEY, {withCredentials: true});
    return data;
}

