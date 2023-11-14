import axios from "axios";
import { api } from "../../constants/api-link";

export const fetchCurrentUser = async() => {
    const {data}= await axios.get(api.WHOAMI, {withCredentials: true});
        return data;
}

export const getUserDetails = async(username) => {
    const params = {username};
    const {data}= await axios.get(api.USERNAMEDETAILS, {params}, {withCredentials: true});
    console.log("data: ", JSON.stringify(data))
    return data;
}