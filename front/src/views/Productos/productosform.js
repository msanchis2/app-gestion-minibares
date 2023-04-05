import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser'
import { getBasePath, getAuth, getPermisosEnPagina, permisoAdecuado, getImagenBasePath, toastAlert } from '../../Utils'
import axios from "axios"
import { Input, Form } from 'reactstrap'
import Swal from 'sweetalert2'
import SinPermisos from '../SinPermisos'

const Hotelesform = () => {
    const navigate = useNavigate();
    const {isLogged, permisosUsuario} = useUser();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Productos')
    const datos = useParams() //Obtenemos los parámetros pasados por url { accion: "edit", id: "1" }
    const [nombre, setNombre] = useState('')
    const [imagen, setImagen]  = useState('')
    const [newImagen, setNewImagen] = useState('')
    const [descripcion, setDescripcion]  = useState('')

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    const getDatosProductos = async () => {
        try {
            const {data: Productos} = await axios.get(`${getBasePath()}/productos/${datos.id}`, getAuth());
            setNombre(Productos.nombre)
            setDescripcion(Productos.descripcion)
            setImagen(Productos.imagen)
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'Productos no encontrados',
                icon: 'error'
              })
        }
    }

    const submitProductos = async (productoObj) => {
        try {
            if (datos.accion === 'nuevo') 
                await axios.post(`${getBasePath()}/productos`, productoObj, getAuth());
            if (datos.accion === 'editar') 
                await axios.put(`${getBasePath()}/productos/${datos.id}`, productoObj, getAuth());
            toastAlert('Productos')
            navigate("/productos")
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
        if(datos.accion !== 'nuevo') { getDatosProductos() }
    }, [datos])

    const handleImageChange = (e) => {
        const reader = new FileReader()
        reader.onload = function (e) {
            setImagen(e.target.result)
            setNewImagen(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function handleSubmit (e) {
        e.preventDefault()
        const productoObj = {
            nombre,
            imagen,
            descripcion
        }
        submitProductos(productoObj)
    }
    
    return isLogged && permisoAdecuado(permisos, datos.accion) ? (
        <div className="row gap-20 " style={{ position:"relative",height:"1116px" }} >
            <div className="masonry-item col-md-12" style={{ position:"absolute", left:"0%", top:"0px" }} >
                <div className="bgc-white p-20 bd">
                    <h6 className="c-grey-900">{ datos.accion.charAt(0).toUpperCase() + datos.accion.slice(1).toLowerCase() } Registro</h6>
                    <div className="mT-30">
                        <Form onSubmit={handleSubmit}>
                            <input type="hidden" id="imagen_antigua" value={imagen} />
                            <div className='row'>
                                <div className="mb-3 col-md-4">
                                    <img id="imagen" 
                                        className='user-avatar rounded mr-2 my-25 cursor-pointer'
                                        src={newImagen || `${getImagenBasePath()}/${imagen}`}
                                        alt='Imagen producto'
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
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Nombre *</label>
                                    <Input type="text" className="form-control" id="nombre" value={nombre} onChange={({target}) => setNombre(target.value)} disabled={datos.accion === 'ver'} required />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Descripción</label>
                                    <Input type="text" className="form-control" id="descripcion" value={descripcion} onChange={({target}) => setDescripcion(target.value)} disabled={datos.accion === 'ver'}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-color">Guardar</button>
                            <Link className="btn btn-secondary btn-color" to="/productos" style={{marginLeft: '10px'}}>Atras</Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    ): (<SinPermisos/>)
}

export default Hotelesform