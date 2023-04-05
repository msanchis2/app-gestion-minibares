import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser'
import { getBasePath, getAuth, getPermisosEnPagina, permisoAdecuado, getImagenBasePath, toastAlert } from '../../Utils'
import axios from "axios"
import Select from 'react-select'
import { Input, Form } from 'reactstrap'
import Swal from 'sweetalert2'
import SinPermisos from '../SinPermisos'

const Habitacionesform = () => {
    const navigate = useNavigate();
    const {isLogged, permisosUsuario, hotelSelected} = useUser();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Habitaciones')
    const datos = useParams() //Obtenemos los parámetros pasados por url { accion: "edit", id: "1" }
    const [nombre, setNombre] = useState('')
    const [imagen, setImagen]  = useState('')
    const [newImagen, setNewImagen] = useState('')

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    const getDatosHabitaciones = async () => {
        try {
            const {data: habitaciones} = await axios.get(`${getBasePath()}/habitaciones/${datos.id}`, getAuth());
            setNombre(habitaciones.nombre)
            setImagen(habitaciones.imagen)
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'Habitación no encontrada',
                icon: 'error'
              })
        }
    }

    const submitHabitaciones = async (habitacionesObj) => {
        try {
            if (datos.accion === 'nuevo') 
                await axios.post(`${getBasePath()}/habitaciones`, habitacionesObj, getAuth());
            if (datos.accion === 'editar') 
                await axios.post(`${getBasePath()}/habitacionesupdate`, habitacionesObj, getAuth());
            toastAlert('Habitaciones')
            navigate("/habitaciones")
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error en la creación de la habitaciones',
                icon: 'error'
              })
            console.error(error)
        }
    }

    const handleImageChange = (e) => {
        const reader = new FileReader()
        reader.onload = function (e) {
            setImagen(e.target.result)
            setNewImagen(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if(datos.accion !== 'nuevo') { getDatosHabitaciones() }
    }, [datos])

    function handleSubmit (e) {
        e.preventDefault()
        const habitacionesObj = {
            id: datos.id,
            nombre,
            hotelId: hotelSelected,
            imagen
        }
        console.log(habitacionesObj)
        submitHabitaciones(habitacionesObj)
    }
    
    return isLogged && permisoAdecuado(permisos, datos.accion) ?(
        <div className="row gap-20 " style={{ position:"relative",height:"1116px" }} >
            <div className="masonry-item col-md-12" style={{ position:"absolute", left:"0%", top:"0px" }} >
                <div className="bgc-white p-20 bd">
                    <h6 className="c-grey-900">{ datos.accion.charAt(0).toUpperCase() + datos.accion.slice(1).toLowerCase() } Habitación</h6>
                    <div className="mT-30">
                        <Form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className="mb-3 col-md-4" id="uno">
                                    <img id="imagen" 
                                        className='user-avatar rounded mr-2 my-25 cursor-pointer'
                                        src={newImagen || `${getImagenBasePath()}/${imagen}`}
                                        alt='Imagen empresa'
                                        height='90px'
                                        width='90px'
                                    />
                                    <label className="form-label">Imagen</label>
                                    <Input 
                                        type="file" 
                                        className="form-control" 
                                        onChange={(e) => handleImageChange(e)} 
                                        disabled={datos.accion === 'ver'}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-4" id="dos">
                                    <label className="form-label">Nombre *</label>
                                    <Input type="text" className="form-control" id="nombre" aria-describedby="nombre" disabled={datos.accion === 'ver'} value={nombre} onChange={({target}) => setNombre(target.value)} required />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-color">Guardar</button>
                            <Link className="btn btn-secondary btn-color" to="/habitaciones" style={{marginLeft: '10px'}}>Atras</Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    ): (<SinPermisos/>)
}

export default Habitacionesform