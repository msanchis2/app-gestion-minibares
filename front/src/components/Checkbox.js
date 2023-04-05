import axios from "axios"
import React, { useState } from 'react';
import { getBasePath, getAuth } from '../Utils'

const Checkbox = (props) => {
    const {accion, permisoId, roleId, controlador} = props
    const [clickado, setClickado] = useState(permisoId != 0)
    
    const cambiarPermiso = async (e) => {
        try {
            if (!clickado) {
                const objPermiso = {roleId: roleId, accion: accion, controlador: controlador}
                await axios.post(`${getBasePath()}/roles_permisos`, objPermiso, getAuth())
            } else {
                await axios.delete(`${getBasePath()}/roles_permisos/destroy?id=${permisoId}`, getAuth())
            }
            setClickado(!clickado)
        } catch(errror) {
            console.error(errror)
        }
    }

    return (
        <input 
            type = "checkbox"
            id = {roleId+"-"+controlador+"-"+accion}
            defaultChecked = {permisoId != 0}
            onClick={(e) => cambiarPermiso(e)}
        />
    )
  }
  
  export default Checkbox