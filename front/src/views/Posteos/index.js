import React, { useState, useEffect } from 'react'
import useUser from '../../hooks/useUser'
import { getPermisosEnPagina, getBasePath, getAuth, getImagenBasePath, toastAlert } from '../../Utils'
import SinPermisos from '../SinPermisos'
import axios from "axios"
import './posteos.scss'
import { Card, CardBody, Button} from 'reactstrap'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Posteos = () => {
    const {isLogged, permisosUsuario, hotelSelected, dataUsuario} = useUser();
    const navigate = useNavigate();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Posteos')
    const [productosHabitaciones, setProductosHabitaciones] = useState([])
    const [productosDefecto, setProductosDefecto] = useState([])
    const [habitaciones, setHabitaciones] = useState([])
    const [inventarioHotel, setInventarioHotel] = useState([])
    const [inventarioEnHabitacion, setInventarioEnHabitacion] = useState([])
    const [productoSelected, setProductoSelected] = useState('')
    const [targetSeleccionado, setTargetSeleccionado] = useState('')
    const [habitacionSelected, setHabitacionSelected] = useState(0)
    const [productos, setProductos] = useState([])
    const [accion, setAccion] = useState('V')
    const [tipoIncidencia, setTipoIncidencia] = useState('')
    const [reemplazo, setReemplazo] = useState('')
    const [tieneStock, setTieneStock] = useState('')
    
    const [reemplazoIncidencia, setReemplazoIncidencia] = useState('Reponer con...')
    const [reemplazoTipoIncidencia, setReemplazoTipoIncidencia] = useState('Tipo de incidencia...')

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
      }, [isLogged]);
 
    const cargarDatosInventario = async () => {
        try {
            const {data: pDefecto} = await axios.get(`${getBasePath()}/productos_defecto/porhotel/${hotelSelected}`, getAuth());
            const {data: inventarioData} = await axios.get(`${getBasePath()}/muestrainventarioenalmacenporhotel/${hotelSelected}`, getAuth());  //('hotelId', $hotelId)->where('situacion', 'A')
            const {data: inventarioDataHab} = await axios.get(`${getBasePath()}/muestrainventarioenhabitacionporhotel/${hotelSelected}`, getAuth()); //('hotelId', $hotelId)->where('situacion', 'H')
            
            setProductosDefecto(pDefecto)
            setInventarioEnHabitacion(inventarioDataHab)
            return inventarioData
        } catch (error) {
            Swal.fire({icon: 'error', text: 'Error de carga de inventarios en almacen'})
            console.error(error)
        }
    }

    const cargarDatosHabitaciones = async () => {
        try {
            const {data: habitacionesData} = await axios.get(`${getBasePath()}/devuelvehabitacionesporhotel/${hotelSelected}`, getAuth());  //table('habitaciones')->where('hotelId',  $id)
            return habitacionesData
        } catch (error) {
            Swal.fire({icon: 'error', text: 'Error carga de habitaciones'})
            console.error(error)
        }
    }

    const cargarDatosProductos = async () => {
        try {
            const {data: dataProductos} = await axios.get(`${getBasePath()}/productos`, getAuth());
            return dataProductos
        } catch (error) {
            Swal.fire({icon: 'error', text: 'Error carga de productos'})
            console.error(error)
        }
    }

    const cargarDatosInventarioHabitacion = () =>  {
        const productosPorHabitaciones = []
        let productosDeHabitacion, productoDentro
        habitaciones.forEach(habitacion => {
                productosDeHabitacion = inventarioEnHabitacion.filter(el => el.habitacionId == habitacion.id)
            if (productosDeHabitacion != undefined) {
                productosPorHabitaciones[habitacion.id] = []
                productosDeHabitacion.forEach(prod => productosPorHabitaciones[habitacion.id].push(prod))
            }
        })
        productosDefecto.forEach(prodDefecto => {
            productosPorHabitaciones.forEach(prodHab => {
                productoDentro = prodHab.find(el => el.productoId == prodDefecto.productoId)
                if(productoDentro == undefined) {
                    productosPorHabitaciones[productosPorHabitaciones.indexOf(prodHab)].push(prodDefecto)
                }
            })
        })
        setProductosHabitaciones(productosPorHabitaciones) 
    }

    const cargarDatos = async () => {
        const datosInventarioAlmacen = await cargarDatosInventario()
        const datosHabitaciones =  await cargarDatosHabitaciones()  
        const dataProductos =  await cargarDatosProductos()  
        setProductos(dataProductos)
        setInventarioHotel(datosInventarioAlmacen)
        setHabitaciones(datosHabitaciones)
    }

    useEffect(() => {
        cargarDatosInventarioHabitacion()
    }, [habitaciones])

    useEffect(() => {
        cargarDatos()
    }, [])

    const getInventariosOption = (producto) => {
        const inventarioPorducto = inventarioHotel.filter(el => (el.productoId == producto)) 
        const options = []
        options.push({label: 'Reponer con...', value: '', selected: true})
        if (inventarioPorducto.length) {
            inventarioPorducto.forEach(el => { options.push({label: el.fechaCaducidad, value: el.id }) })
        }
        return options
    }

    const setEstadoHabitacionView = (idH) => {
        const bloque = document.getElementById(`productos-${idH}`)
        const estado = bloque.style.display
        bloque.style.display = estado === 'none' ? 'block' : 'none'
    }

    const getNombreHabitacion = (idHab) => {
        const hab = habitaciones.find(el => el.id == idHab) 
        return hab !== undefined ? hab.nombre : ""
    }

    const getImagenProducto = (idProducto) => {
        const productoImg = productos.find(el => el.id == idProducto)
        if (productoImg != undefined) { return productoImg.imagen }
    }

    const postear = async () => {
        try {
            //
            //************************************************************************************************************************************************* */
            //
            //Control de Errores
            //
            //************************************************************************************************************************************************* */
            //
            //Debemos haber seleccionado un producto
            //
            if (productoSelected == ''){
                Swal.fire({
                    icon: 'warning',
                    text: 'Debe seleccionar un producto'
                })
                return null
            }
            //
            //Debemos haber seleccionado una incidencia
            //
            if (accion == 'I' && (reemplazoTipoIncidencia == '' || reemplazoTipoIncidencia == undefined)) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Tipo de incidencia no indicado'
                })
                return null
            }
            //
            //Si el registro no existe en la habitación no puede crear una incidencia
            //
            const inventarioSelected = inventarioEnHabitacion.find(inv => (inv.productoId == productoSelected && inv.habitacionId == habitacionSelected))
            if ((accion == 'I') && (inventarioSelected == undefined)) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Al no existir el registro en la habitación debe hacer una venta con una fecha de resposición para primero incluirlo'
                })
                return null
            }
            //
            //Si el registro no existe no lo puede vender
            //
            if ((accion != 'I') && (inventarioSelected == undefined) && (reemplazo == '')) {
                Swal.fire({
                    icon: 'warning',
                    text: 'No puede vender un registro que no existe. Seleccione Venta + un producto para reponer + Postear para continuar'
                })
                return null
            }
            //
            //************************************************************************************************************************************************* */
            //
            //Fin del Control de Errores
            //
            //************************************************************************************************************************************************* */
            //
            //Insertamos si existía un registro en la habitación
            //
            let idReemplazo = 'sinReemplazo'
            if(reemplazo.value)
                idReemplazo = reemplazo.value
            if(reemplazoIncidencia.value)
                idReemplazo = reemplazoIncidencia.value
            
            if (inventarioSelected != undefined) {
                inventarioSelected.situacion = accion == 'V' ? 'V' : reemplazoTipoIncidencia.value
                await axios.get(`${getBasePath()}/actualizaposteo/${inventarioSelected.id}/${hotelSelected}/${idReemplazo}/${inventarioSelected.situacion}/${dataUsuario.id}/${habitacionSelected}`, getAuth())
            }
            //
            //Insertamos si NO EXISTÍA UN REGISTRO EN LA HABITACIÓN
            //
            else{
                await axios.get(`${getBasePath()}/actualizaposteo/0/${hotelSelected}/${idReemplazo}/H/${dataUsuario.id}/${habitacionSelected}`, getAuth())
            }
            targetSeleccionado.classList.remove('elementoProducto-inactivo')
            toastAlert('Posteo realizado con éxito')
        } catch (rr) {
            console.error(rr)
        }
    }

    const handleProductoChange = (pId, habitacion, {target}, index) =>  {
        if (!target.classList.contains('seleccionado')) {
            //
            //Ponemos por defecto el valor del desplegable a Reponer con... para que vuelva a seleccionarlo en el nuevo producto
            //
            setReemplazo('Reponer con...')
            setReemplazoIncidencia('Reponer con...')
            setReemplazoTipoIncidencia('Tipo de incidencia...')

            const selected = document.getElementsByClassName('seleccionado')[0]
            if (selected != undefined) {
                selected.classList.remove('seleccionado')
            }
            target.classList.add('seleccionado')
            if(target.className.indexOf('elementoProducto-inactivo') >= 0){
                setTieneStock(false)
                document.getElementsByClassName(`${index}`)[0].innerHTML ="Reponer"
            }
            else{
                setTieneStock(true)
                document.getElementsByClassName(`${index}`)[0].innerHTML ="Venta"
            }

            setProductoSelected(pId)
            setHabitacionSelected(habitacion)
            setTargetSeleccionado(target)
        }
    }

    const getTiposDeIncidencia = () => {
        return ([
           {label: 'Tipo de incidencia...' },
           {label: 'Robo', value: 'R'},
           {label: 'Caducado', value: 'C'},
           {label: 'Accidente', value: 'A'}
        ])
    }

    const hayStock = ({target}, producto) => {
        if (producto.productoDefectoId != undefined) {
            target.classList.add('elementoProducto-inactivo')
        }
    }

    const handleAccionChange = ({target}, accionValor, identificador) => {
        let element = document.getElementsByClassName(identificador)

        for (var i = 0; i < element.length; i++) {
            element[i].classList.remove('btn-info');
            element[i].classList.add('btn-secondary')
        }

        target.classList.add('btn-info')

        setAccion(accionValor)
    }

    function tipoBloque(productos){
        if(productos.find(el => (el.productoDefectoId !== undefined)))
            return 'danger'
        else
            return 'success'
    }
    return isLogged && permisos.ver ? (
        <main>
            <h4 className="c-grey-900 mT-10 mB-30">Posteos</h4>
            {productosHabitaciones.map((productos, index) => {
                const habitacion = productosHabitaciones.indexOf(productos)
                return(
                    <div>
                        <Card className='mb-2 ml-2' style={{ display: 'block' }}>
                            <div className={`d-flex alert alert-${tipoBloque(productos)}`} style={{padding: '10px', display: 'block !important'}}  onClick={() => setEstadoHabitacionView(habitacion)}>
                                    <h6><span style={{ marginRight: '20px'}}>{getNombreHabitacion(habitacion)}</span></h6>
                                        {productos.length && productos.map(el => {
                                            if (el.productoDefectoId !== undefined){
                                                return (
                                                    <div className="mb-2 col-md-2">
                                                        <img 
                                                            className='imagenProd' 
                                                            onLoad={(e) => hayStock(e, el)}
                                                            src={`${getImagenBasePath()}/${getImagenProducto(el.productoId)}`}
                                                            style={{width: '94%'}}
                                                        />
                                                    </div>)
                                            }
                                            })
                                        }
                            </div>
                            <CardBody className='invoice-padding' id={`productos-${habitacion}`} style={{display: 'none'}}>
                                <div className='d-flex mt-2'>
                                    {productos.length && productos.map(el => {
                                        return (
                                        <div>
                                            <img 
                                                className='imagenProd' 
                                                onLoad={(e) => hayStock(e, el)}
                                                onClick={(e) => { handleProductoChange(el.productoId, habitacion, e, index)} } 
                                                src={`${getImagenBasePath()}/${getImagenProducto(el.productoId)}`}
                                                style={{width: '100%'}}
                                            /> 
                                        </div>) 
                                    })}
                                </div>
                                <div className='d-flex mt-2'>
                                    <Button 
                                        className={`btn-accion btn-color ${index}`}
                                        color="info"
                                        onClick={(e) => handleAccionChange(e, 'V', `${index}`)}
                                        >Venta</Button>
                                    <Select 
                                        value={reemplazo}
                                        className='desplegable'
                                        options={getInventariosOption(productoSelected)}
                                        onChange={setReemplazo}
                                        id={`opcionesVenta-${index}`}
                                        placeholder='Reponer con...'
                                    />
                                </div>
                                {tieneStock && (<div className='d-flex mt-2'>
                                    <Button 
                                        className={`btn-accion btn-color ${index}`}
                                        color="secondary"
                                        onClick={(e) => handleAccionChange(e, 'I', `${index}`)}
                                        >Incidencia</Button>
                                    <Select 
                                        value={reemplazoIncidencia}
                                        className='desplegable'
                                        options={getInventariosOption(productoSelected)}
                                        onChange={setReemplazoIncidencia}
                                        id={`opcionesIncidencia`}
                                        placeholder='Reponer con...'
                                    />
                                    <Select 
                                        value={reemplazoTipoIncidencia}
                                        className='desplegable'
                                        options={getTiposDeIncidencia()}
                                        onChange={setReemplazoTipoIncidencia}
                                        id={`opcionesIncidencia`}
                                        placeholder='Tipo de incidencia...'
                                    />
                                </div>) }
                                <button className="btn btn-primary btn-color mt-2" onClick={() => postear()}>Postear</button>
                            </CardBody>
                        </Card>
                    </div>
                )
            })}
        </main>
    ) : (<SinPermisos/>)
}

export default Posteos