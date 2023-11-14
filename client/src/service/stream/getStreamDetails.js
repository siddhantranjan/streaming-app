import axios from "axios";
import { api } from "../../constants/api-link";

export const getStreamDetails = async() => {
    const {data}= await axios.get(api.STREAMDETAILS, {withCredentials: true});
    return data;
}