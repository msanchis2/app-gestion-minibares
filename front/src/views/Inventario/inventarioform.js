import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser'
import { getBasePath, getAuth, getPermisosEnPagina, permisoAdecuado, toastAlert } from '../../Utils'
import axios from "axios"
import { Input, Form } from 'reactstrap'
import Swal from 'sweetalert2'
import SinPermisos from '../SinPermisos'
import Select from 'react-select'

const Hotelesform = () => {
    const navigate = useNavigate();
    const {isLogged, permisosUsuario, hotelSelected} = useUser();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Inventario')
    const datos = useParams() //Obtenemos los parámetros pasados por url { accion: "edit", id: "1" }
    const [producto, setProducto] = useState('')
    const [cantidad, setCantidad]  = useState('')
    const [caducidad, setCaducidad]  = useState('')
    const [productos, setProductos]  = useState([])

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    const getProductosOptions = () => {
        const options = []
        productos && productos.forEach(el => {
            options.push({value: el.id, label: el.nombre})
        })
        return options
    }

    const getDatosInventario = async () => {
        try {
            const inventario = datos.id.split('&')
            setProducto(inventario[0])
            setCantidad(inventario[1])
            setCaducidad(inventario[2])
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'Inventario no encontrados',
                icon: 'error'
              })
        }
    }

    const getProductos = async () => {
        try {
            const {data: dataProductos} = await axios.get(`${getBasePath()}/productos_defecto/porhotel/${hotelSelected}`, getAuth());
            setProductos(dataProductos)
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'Inventario no encontrados',
                icon: 'error'
              })
        }
    }

    const submitInventario = async (inventarioObj) => {
        try {
            if (datos.accion == 'nuevo') 
                await axios.post(`${getBasePath()}/inventarios`, inventarioObj, getAuth());
            if (datos.accion == 'editar')
                await axios.get(`${getBasePath()}/inventarioupdate/${inventarioObj.productoId}/${inventarioObj.hotelId}/${inventarioObj.fechaCaducidad}/${inventarioObj.cantidad}`, getAuth());
            toastAlert('Inventario')
            navigate("/inventario")
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
        if(datos.accion != 'nuevo') { getDatosInventario() }
        getProductos()
    }, [datos])

    function handleSubmit (e) {

        e.preventDefault()
        const inventarioObj = {
            productoId: producto,
            hotelId: parseInt(hotelSelected),
            fechaCaducidad: caducidad,
            cantidad: parseInt(cantidad)
        }
        submitInventario(inventarioObj)
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
                                    <label className="form-label">Producto *</label>
                                    <Select 
                                        options={getProductosOptions()} 
                                        id="productos"
                                        className="form-control"
                                        value={getProductosOptions().find(el => el.value == producto)}
                                        onChange={(target) => setProducto(target.value)}
                                        isDisabled={(datos.accion != 'nuevo')}
                                        isRequired={ true }
                                    />
                                    <input type="text" value={getProductosOptions().find(el => el.value == producto)} required style={{  position:'absolute', height: '1px', width: '1px', border: '0px'}} />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Fecha de caducidad *</label>
                                    <Input 
                                       type="date" 
                                       className="form-control" 
                                       id="caducidad" 
                                       value={caducidad} 
                                       onChange={({target}) => setCaducidad(target.value)} 
                                       disabled={(datos.accion != 'nuevo')}
                                       required
                                    />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Cantidad *</label>
                                    <Input type="number" style={{width: '100%', marginTop: '0', height: '37px'}} id="cantidad" value={cantidad} onChange={({target}) => setCantidad(target.value)} disabled={datos.accion == 'ver'} required />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-color">Guardar</button>
                            <Link className="btn btn-secondary btn-color" to="/inventario" style={{marginLeft: '10px'}}>Atras</Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    ): (<SinPermisos/>)
}

export default Hotelesform