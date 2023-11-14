import axios from "axios";
import { api } from "../../constants/api-link"

export const getAllStreams = async() => {
    const {data}= await axios.get(api.SAVEDSTREAM, {withCredentials: true});
    return data;
}