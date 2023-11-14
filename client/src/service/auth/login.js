import axios from "axios";
import { api } from "../../constants/api-link";

export const logInService = async(username ,password) => {
    const payload = {username, password};

    const {data}= await axios.post(api.LOGIN, payload, {withCredentials: true});
    return data;
}