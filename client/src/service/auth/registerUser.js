import axios from "axios";
import { api } from "../../constants/api-link";

export const registerUser = async(first_name, last_name, username, email, password, phone) => {
    const payload = {first_name, last_name, username, email, password, phone};

    const {data}= await axios.post(api.SIGNUP, payload, {withCredentials: true});
    return data;
}