import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser'
import { getBasePath, getAuth, getPermisosEnPagina, permisoAdecuado, toastAlert } from '../../Utils'
import axios from "axios"
import { Input, Form } from 'reactstrap'
import Swal from 'sweetalert2'
import SinPermisos from '../SinPermisos'

const Rolesform = () => {
    const navigate = useNavigate();
    const {isLogged, permisosUsuario} = useUser();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Roles')
    const datos = useParams() //Obtenemos los parámetros pasados por url { accion: "edit", id: "1" }
    const [nombre, setNombre] = useState('')
    const [activo, setActivo]  = useState(true)

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    const getDatosRols = async () => {
        try {
            const {data: Roles} = await axios.get(`${getBasePath()}/roles/${datos.id}`, getAuth());
            setNombre(Roles.nombre)
            setActivo(Roles.activoSN == 'S')
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'Roles no encontrados',
                icon: 'error'
              })
        }
    }

    const submitRols = async (rolObj) => {
        try {
            if (datos.accion == 'nuevo') 
                await axios.post(`${getBasePath()}/roles`, rolObj, getAuth());
            if (datos.accion == 'editar') 
                await axios.get(`${getBasePath()}/rolesupdate/${rolObj.id}/${rolObj.nombre}/${rolObj.activoSN}`, getAuth());
            toastAlert('Roles')
            navigate("/roles")
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error en los cambios',
                icon: 'error'
              })
            console.error(error)
        }
    }

    useEffect(() => {
        if(datos.accion != 'nuevo') { getDatosRols() }
    }, [datos])

    function handleSubmit (e) {
        e.preventDefault()
        const rolObj = {
            id: datos.id,
            nombre: nombre,
            activoSN: activo ? "S" : "N"
        }
        submitRols(rolObj)
    }
    
    return isLogged && permisoAdecuado(permisos, datos.accion) ? (
        <div className="row gap-20 " style={{ position:"relative",height:"1116px" }} >
            <div className="masonry-item col-md-12" style={{ position:"absolute", left:"0%", top:"0px" }} >
                <div className="bgc-white p-20 bd">
                    <h6 className="c-grey-900">{ datos.accion.charAt(0).toUpperCase() + datos.accion.slice(1).toLowerCase() } Registro</h6>
                    <div className="mT-30">
                        <Form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Nombre *</label>
                                    <Input type="text" className="form-control" id="nombre" value={nombre} onChange={({target}) => setNombre(target.value)} disabled={datos.accion == 'ver'} required />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Activo</label>
                                    <Input type="checkbox" className="form-control" id="activo" defaultChecked={activo} onChange={({target}) => setActivo(!activo)} disabled={datos.accion == 'ver'}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-color">Guardar</button>
                            <Link className="btn btn-secondary btn-color" to="/roles" style={{marginLeft: '10px'}}>Atras</Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    ): (<SinPermisos/>)
}

export default Rolesform