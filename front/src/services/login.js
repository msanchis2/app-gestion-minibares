import axios from "axios"
import { getBasePath } from "../Utils"

const login = async (logObject) => {
  
  const response = await axios.post(`${getBasePath()}/login`, logObject)
    if (!response.code === 200)
        throw new Error('Response is NOT ok')
    return response.data
}

export default login;