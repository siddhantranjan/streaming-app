import axios from "axios"
import { api } from "../../constants/api-link"

export const logOutUser = async () => {
    try{
        await axios.get(api.LOGOUT, {withCredentials: true})
    }catch(e){
        console.log(e);
    }
}