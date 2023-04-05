import React, { useState, useEffect } from 'react'
import useUser from '../../hooks/useUser'
import { getPermisosEnPagina, getBasePath, getAuth, getImagenBasePath } from '../../Utils'
import SinPermisos from '../SinPermisos'
import axios from "axios"
import { Card, CardBody } from 'reactstrap'
import './productosDefecto.scss'
import Select from 'react-select'

const ProductosDefecto = () => {
    const {isLogged, permisosUsuario, hotelSelected} = useUser();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Sistema')
    const [hotel, setHotel] = useState([])
    const [productos, setProductos] = useState([])
    const [productosDefecto, setProductosDefecto] = useState([])
    const getTipoOptions = [
        {value: 'Bandeja', label: "Bandeja"},
        {value: 'Nevera', label: "Nevera"}
    ]
    const [situacion, setSituacion] = useState([])
    const cargarDatos = async () => {
        const {data: hotelesData} = await axios.get(`${getBasePath()}/hoteles/${hotelSelected}`, getAuth());
        const {data: productosData} = await axios.get(`${getBasePath()}/productos`, getAuth());
        const {data: productosDefecto} = await axios.get(`${getBasePath()}/productos_defecto/porhotel/${hotelSelected}`, getAuth());

        setHotel(hotelesData)
        setProductos(productosData)
        setProductosDefecto(productosDefecto)
    }

    useEffect(() => {
        cargarDatos()
    },[])

    const changeEstadoProducto = async (productoId, hotelId) => {
        const elementImagen = document.getElementById(`${productoId}-${hotelId}`)
        const importeVenta = document.getElementById(`importe-venta-${productoId}-${hotelId}`).value || 0
        const importeCoste = document.getElementById(`importe-coste-${productoId}-${hotelId}`).value || 0

        if(elementImagen.className.indexOf("elementoProducto-inactivo") >= 0) {
            elementImagen.className = elementImagen.className.replace('elementoProducto-inactivo', 'elementoProducto-activo');
            await axios.post(`${getBasePath()}/productos_defecto`, {hotelId, productoId, importeVenta, importeCoste}, getAuth());
        } else {
            elementImagen.className = elementImagen.className.replace('elementoProducto-activo', 'elementoProducto-inactivo');
            const prodDefecto = productosDefecto.find(el => (el.hotelId === hotelId && el.productoId === productoId))
            if (prodDefecto !== undefined) {
                await axios.delete(`${getBasePath()}/productos_defecto/${prodDefecto.productoDefectoId}`, getAuth())
            }
        }
    }

    const changeEstadoCantidad = async (idProducto, idHotel) => {
        const elementImagen = document.getElementById(`${idProducto}-${idHotel}`)
        let importeVenta = document.getElementById(`importe-venta-${idProducto}-${idHotel}`)
        let importeCoste = document.getElementById(`importe-coste-${idProducto}-${idHotel}`)
        console.log(situacion)
        
        if(elementImagen.className.indexOf("elementoProducto-activo") >= 0) {
            await axios.get(`${getBasePath()}/productos_defectoupdate/${idHotel}/${idProducto}/${importeVenta.value}/${importeCoste.value}/${situacion}`, getAuth());
        }
    }

    const getCantidadProducto = (idProducto, idHotel, tipo) => {
        const prodDefecto = productosDefecto.find(el => (el.hotelId === idHotel && el.productoId === idProducto))
        if (prodDefecto !== undefined) {
            return prodDefecto[tipo]
        }
    }

    const esDefecto = (idProducto, idHotel) =>  {
        if (productosDefecto.length) {
            const pd = productosDefecto.find(el =>  (el.hotelId === idHotel && el.productoId === idProducto))
            return pd === undefined ? 'elementoProducto-inactivo' : 'elementoProducto-activo'
        }
        else
            return 'elementoProducto-inactivo'
    }

    const getSituacionProducto = (idProducto, idHotel) => {
        const prodDefecto = productosDefecto.find(el => (el.hotelId === idHotel && el.productoId === idProducto))
        if (prodDefecto !== undefined) {
            return prodDefecto["situacion"]
        }
    }

    return isLogged && permisos.ver ? (
    <main>
        <h4 className="c-grey-900 mT-10 mB-30">Productos por defecto</h4>
        <div>
            <Card className='mb-2 ml-2'>
                <CardBody className='invoice-padding' id={`productos-${hotel.id}`} >
                    <div className='row'>
                        {productos.map(prod => {
                            return (
                                <div className="mb-3 col-md-3">
                                    <div >
                                        <img id={`${prod.id}-${hotel.id}`} style={{border: esDefecto(prod.id, hotel.id)}}
                                            src={`${getImagenBasePath()}/${prod.imagen}`}
                                            onClick={() => { changeEstadoProducto(prod.id, hotel.id) }}
                                            className={`cuadrado ${esDefecto(prod.id, hotel.id)}`}
                                            alt="imagen producto"
                                        />
                                    </div>
                                    <div>
                                        <label>Importe Venta</label>
                                        <input 
                                            type="number" 
                                            id={`importe-venta-${prod.id}-${hotel.id}`}
                                            onBlur={() => changeEstadoCantidad(prod.id, hotel.id)}
                                            defaultValue={getCantidadProducto(prod.id, hotel.id, "importeVenta")}
                                            className="form-control form-control"
                                            style={{padding: "0.375rem 0.75rem"}}
                                            placeholder="Importe Venta"
                                        />
                                    </div>
                                    <div>
                                        <label>Importe Coste</label>
                                        <input 
                                            type="number" 
                                            id={`importe-coste-${prod.id}-${hotel.id}`}
                                            onBlur={() => changeEstadoCantidad(prod.id, hotel.id)}
                                            defaultValue={getCantidadProducto(prod.id, hotel.id, "importeCoste")}
                                            className="form-control form-control"
                                            style={{padding: "0.375rem 0.75rem"}}
                                            placeholder="Importe Coste"
                                        />
                                    </div>
                                    <div>
                                        <label>Situación</label>
                                        <Select 
                                            options={getTipoOptions}
                                            id={`situacion-${prod.id}-${hotel.id}`}
                                            defaultValue={getSituacionProducto(prod.id, hotel.id)}
                                            onChange={(e) => {setSituacion(e.value) 
                                                             console.log(situacion)
                                                             changeEstadoCantidad(prod.id, hotel.id)}
                                                     }
                                            style={{padding: "0.375rem 0.75rem", maxWidth: '140px'}}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardBody>
            </Card>
        </div>
    </main>) : (<SinPermisos/>)
}

export default ProductosDefecto