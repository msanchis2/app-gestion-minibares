import axios from "axios"
import { getBasePath, getAuth } from '../Utils'

const userEmpresa = async (idEmpresa) => {
  const response = await axios.get(`${getBasePath()}/empresas/${idEmpresa}`, getAuth())
    if (!response.code === 200) {
        throw new Error('Response is NOT ok')
    } else {
        return response.data.nombre
    }
}

export default userEmpresa;