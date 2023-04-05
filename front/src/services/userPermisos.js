import axios from "axios"
import { getBasePath, getAuth } from '../Utils'

const userPermisos = async (rolesId) => {
  const response = await axios.get(`${getBasePath()}/roles_permisos`, getAuth())
    if (!response.code === 200) {
        throw new Error('Response is NOT ok')
    } else {
        const permisosDeRol = response.data.filter(el => el.roleId == rolesId)
        return permisosDeRol
    }
}

export default userPermisos;