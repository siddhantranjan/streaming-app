import axios from "axios";
import { api } from "../../constants/api-link";


export const saveUserMediaDetails = async(binaryData, type) => {
  const url = type === 'cover' ? api.SAVECOVERMEDIADETAILS : api.SAVEPROFILEMEDIADETAILS;
  
    const {data} = await axios.post(url, binaryData, {headers:{
      'Content-Type': 'image/jpeg'
    }, withCredentials: true})

    return data;
}