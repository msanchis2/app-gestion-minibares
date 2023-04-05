import React, { useState, useEffect } from 'react'
import useUser from '../../hooks/useUser'
import { useNavigate, Link  } from 'react-router-dom'
import { getPermisosEnPagina, getBasePath, getAuth, getImagenBasePath } from '../../Utils'
import SinPermisos from '../SinPermisos'
import axios from "axios"
import Swal from 'sweetalert2'
import { Input, Form } from 'reactstrap'
import Select from 'react-select'

const GenerarHabitaciones = () => {
    const {isLogged, permisosUsuario, hotelSelected} = useUser();
    const navigate = useNavigate();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Sistema')
    const [productos, setProductos] = useState([])
    const [datos, setDatos] = useState({})
    const [bloqueInferior, setBloqueInferior] = useState()

    const handleChange = (ev) => {
        setDatos({
            ...datos,
            [ev.target.id]: ev.target.value,
            hotelId: hotelSelected
        });
    }

    const cargaProductosDefecto = async () => {
        //
        //Recuperamos todos los productos del hotel y controlamos que tengan la fecha rellena, lo que nos indica que tienen inventario y podremos mostrar el bloque de productos
        //
        const {data: productosAux} = await axios.get(`${getBasePath()}/productos_defecto/porhotel/${hotelSelected}`, getAuth())
        setProductos(productosAux)
        let producto = productosAux.find(prod => prod.fechas.length > 0);
        (producto?.fechas !== undefined) ? setBloqueInferior("S") : setBloqueInferior("N")

    }

    useEffect(() => {
        //
        //Mostramos un bloque u otro dependiendo si tiene inventario
        //
        if (bloqueInferior == "S") {
            document.getElementById('labelsininventario').setAttribute('style', 'display: none')
            document.getElementById('tablaproductos').setAttribute('style', 'display: block')
        }
        if (bloqueInferior == "N") {
            document.getElementById('labelsininventario').setAttribute('style', 'display: block; color: red; font-style: italic; margin-bottom: 20px;');
        }

    }, [bloqueInferior]);

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${getBasePath()}/habitaciones/generahabitaciones`, datos, getAuth());
            Swal.fire({
                icon: 'success',
                title: 'Cambios realizados',
                text: 'Proceso iniciado, espere unos minutos para revisar los cambios'
              })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
              })
        }
    }

    function muestraFechasProductosDefecto(fechas, nombre){

        return fechas.map((fecha, key) => (
            <tr style={{ verticalAlign: 'middle'}}>
                <td>{key == 0 ? <img src={`${getImagenBasePath()}/${nombre}`} style={{maxWidth:"120px"}} /> : ""}</td>
                <td>
                    <input className="form-check-input" 
                                type="checkbox" id={"producto_"+fecha.hotelId+"_"+fecha.productoId+"_"+fecha.fechaCaducidad} 
                    data-cantidad={fecha.cantidad}
                            checked={datos["producto_"+fecha.hotelId+"_"+fecha.productoId+"_"+fecha.fechaCaducidad] === "S"}
                            onChange={(ev) => {
                                        setDatos({
                                            ...datos,
                                            ["producto_"+fecha.hotelId+"_"+fecha.productoId+"_"+fecha.fechaCaducidad]: ev.target.checked ? "S" : "N",
                                        })
                                    }}
                            /> {fecha.fechaCaducidadMostrar}
                </td>
                <td>
                    {fecha.cantidad}
                </td>
                <td>
                    <input type="number" id={`cantidad-${fecha.hotelId}-${fecha.productoId}-${fecha.fechaCaducidad}`} className='form-control form-control' defaultValue="1" style={{width: '100%', marginTop: '0', height: '37px'}} onChange={handleChange} />
                </td>
            </tr>
        )) 
    }

    return isLogged && permisos.ver ? (
        <div className="container-fluid">
            <h4 className="c-grey-900 mT-10 mB-30">Generar Habitaciones</h4>
            <div className="row">
            <div className="col-md-12">
                <div className="bgc-white bd bdrs-3 p-20 mB-20">
                <h5 className="c-grey-900 mB-20">Genera habitaciones masívamente</h5>
                <p>El siguiente proceso añade habitaciones a un hotel, <strong>solo debe usarse cuando el hotel está vacio</strong>.</p>
                    <Form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Habitación Inicial *</label>
                                <Input type="text" className="form-control" id="habIni" aria-describedby="Habitación inicial" onChange={handleChange} required />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Habitación Final *</label>
                                <Input type="text" className="form-control" id="habFin" aria-describedby="Habitación final" onChange={handleChange} required />
                            </div>
                            <div className="mb-3 col-md-4 ">
                                <label className="form-label form-check-label">
                                    <input className="form-check-input" type="checkbox" id="incluirProductosdef" checked={datos.incluirProductosdef === "S"}
                                            onChange={(ev) => {
                                                        setDatos({
                                                            ...datos,
                                                            incluirProductosdef: ev.target.checked ? "S" : "N",
                                                        })
                                                    }}
                                        onClick={cargaProductosDefecto}/> Incluir productos defecto
                                </label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="mb-9 col-md-12 ">
                                <table className="table" id='tablaproductos' style={{display: 'none'}}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Fecha Caducidad Lote</th>
                                            <th scope="col">Unidades disponibles</th>
                                            <th scope="col">Cantidad a la Hab.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { productos.map((datos) => (
                                            muestraFechasProductosDefecto(datos.fechas, datos.imagen ? datos.imagen : datos.nombre)
                                        ))}
                                    </tbody>
                                </table>
                                <label id="labelsininventario" style={{display: 'none'}}>No existen productos en el inventario. Añádalos para continuar</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-color">Guardar</button>
                        <Link className="btn btn-secondary btn-color" to="/" style={{marginLeft: '10px'}}>Atras</Link>
                    </Form>
                </div>
            </div>
            </div>
                                    
        </div>
        ) : (<SinPermisos/>)

}

export default GenerarHabitaciones