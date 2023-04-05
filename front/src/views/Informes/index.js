import React, { useState, useEffect } from 'react'
import useUser from '../../hooks/useUser'
import { getPermisosEnPagina, getBasePath, getAuth, getImagenBasePath } from '../../Utils'
import SinPermisos from '../SinPermisos'
import axios from "axios"
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardTitle, Input } from 'reactstrap'
import './informes.scss'

const Informes = () => {
    const {isLogged, permisosUsuario, dataUsuario, nombreEmpresa} = useUser()
    const navigate = useNavigate();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Informes')
    const [informe, setInforme] = useState([])
    const [productos, setProductos] = useState([])
    const [fechaIni, setFechaIni] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [tipo, setTipo] = useState('V')
    const getTipoOptions = [
        {value: 'V', label: "Venta"},
        {value: 'R', label: "Robo"}
    ]
    const [tipoimporte, setTipoimporte] = useState('importeVenta')
    const getTipoImportes = [
        {value: 'importeVenta', label: "Venta"},
        {value: 'importeCoste', label: "Coste"}
    ]

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
      }, [isLogged]);

    const getInforme = async (filtros) => {
        try {
            const {data: informesData} = await axios.post(`${getBasePath()}/informes/general`, filtros, getAuth());

                const resultado = {};
                informesData.forEach(item => {
                    let hotel = item.nombreHotel;
                    let habitacion = item.nombreHabitacion;
                    let producto = item.idProducto;

                    if (!resultado[nombreEmpresa]) {
                        resultado[nombreEmpresa] = {};
                    }
                    if (!resultado[nombreEmpresa][hotel]) {
                        resultado[nombreEmpresa][hotel] = {};
                    }
                    if (!resultado[nombreEmpresa][hotel][habitacion]) {
                        resultado[nombreEmpresa][hotel][habitacion] = {};
                    }
                    if (!resultado[nombreEmpresa][hotel][habitacion][producto]) {
                        resultado[nombreEmpresa][hotel][habitacion][producto] = item[tipoimporte]
                    }
                });
                setInforme(resultado)
        } catch (err) {
            console.error(err)
        }
    }

    const informePorRango = (fecha) => {
        const filtros = {
            empresa: dataUsuario.empresaId,
            tipo,
            periodo: fecha
        }
        getInforme(filtros)
    }

    const informePorFechas = () => {
        const filtros = {
            empresa: dataUsuario.empresaId,
            tipo,
            fecha_ini: fechaIni,
            fecha_fin: fechaFin,
        }
        getInforme(filtros)
    }

    const getData = async () => {
        try {
            const {data: response} = await axios.get(`${getBasePath()}/productos`, getAuth());
            setProductos(response)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData()
    },[])

    const handleFechaInicioChange = ({target}) => { setFechaIni(target.value) }

    const handleFechaFinChange = ({target}) => { setFechaFin(target.value) }

    const handleFiltroFechaChange = (fecha) => {
        const boton = document.getElementById(fecha)
        if (!boton.classList.contains('btn-primary')) {
            const botonesFiltro = document.getElementsByClassName('filtroFecha')
            Array.from(botonesFiltro).forEach(el => {
                el.classList.remove('btn-primary')
                el.classList.add('btn-secondary')
            })
            boton.classList.add('btn-primary')
            boton.classList.remove('btn-secondary')
            informePorRango(fecha)
        }  
    }

    const objectToArray = (obj) => {
        return Object.keys(obj).map(key => obj[key])
    }

    const getImagenProducto = (id) => {
        const producto = productos.find(el => id == el.id)
        return producto != undefined ? producto.imagen : ''
    }

    const getImporteTotalEmpresa = (empresa) => {
        let importes = 0
        objectToArray(informe[empresa]).forEach(emp => {
            objectToArray(emp).forEach(hotel => { 
                objectToArray(hotel).forEach(hab => { 
                    if (hab != null)
                        importes += parseInt(hab)
                })
            })
        })
        return importes
    }

    const getImporteTotalHotel = (hotel, empresa) => {
        let importes = 0
        objectToArray(informe[empresa][hotel]).forEach(emp => {
            objectToArray(emp).forEach(hab => { 
                if (hab != null)
                    importes += parseInt(hab)
            })
        })
        return importes
    }

    const getImporteTotalHabitacion = (habitacion, hotel, empresa) => {
        let importes = 0
        objectToArray(informe[empresa][hotel][habitacion]).forEach(hab => {
            if (hab != null)
                importes += parseInt(hab)
        })
        return importes
    }

    const desplegar = (element) => {
        if (element.classList.contains('oculto')) {
            element.classList.remove('oculto')
        } else {
            element.classList.add('oculto')
        }
    } 

    const desplegarHabiacion = (habitacion, hotel, empresa) => {
        const card = document.getElementById(`ha-${empresa}-${hotel}-${habitacion}`)
        desplegar(card)
    }

    const desplegarHotel = (hotel, empresa) => {
        const card = document.getElementById(`ho-${empresa}-${hotel}`)
        desplegar(card)
    }

    const desplegarEmpresa = (empresa) => {
        const card = document.getElementById(`e-${empresa}`)
        desplegar(card)
    }

    return isLogged && permisos.ver ? (
    <main>
        <h4 className="c-grey-900 mT-10 mB-30">Informes</h4>
        <Card id='filtros'>
            <div className='row'>
                <div className="mb-3 col-md-4">
                    <label className="form-label">Tipo</label>
                    <Select
                        options={getTipoOptions}
                        value={getTipoOptions.find(el => el.value == tipo)}
                        onChange={(target) => {setTipo(target.value)}}
                    />
                </div>
                <div className="mb-3 col-md-4">
                    <label className="form-label">Tipo Importe</label>
                    <Select
                        options={getTipoImportes}
                        value={getTipoImportes.find(el => el.value == tipoimporte)}
                        onChange={(target) => {setTipoimporte(target.value)}}
                    />
                </div>
            </div>
            <div className='d-flex mt-2 mb-1'>
                <button className="btn btn-secondary btn-color filtroFecha" id='H' onClick={() => handleFiltroFechaChange('H')} >Hoy</button>
                <button className="btn btn-secondary btn-color filtroFecha" id='S' onClick={() => handleFiltroFechaChange('S')} >Semana actual</button>
                <button className="btn btn-secondary btn-color filtroFecha" id='M' onClick={() => handleFiltroFechaChange('M')} >Mes actual</button>
                <button className="btn btn-secondary btn-color filtroFecha" id='MA' onClick={() => handleFiltroFechaChange('MA')} >Mes anterior</button>
                <button className="btn btn-secondary btn-color filtroFecha" id='A' onClick={() => handleFiltroFechaChange('A')} >Año actual</button>
            </div>
            <div className='d-flex mt-2'>
                <label >Fecha inicio</label>
                <Input 
                    type="date" 
                    className="form-control fechas" 
                    id="f_inicio" 
                    onChange={(e) => handleFechaInicioChange(e)}
                />
                <label >Fecha fin</label>
                <Input 
                    type="date" 
                    className="form-control fechas" 
                    id="f_fin" 
                    onChange={(e) => handleFechaFinChange(e)}
                />
                <button className="btn btn-primary btn-color" onClick={informePorFechas}>Buscar</button>
            </div>
        </Card>
        
    { (Object.entries(informe).length > 0) ? (
        Array.from(Object.entries(informe)).map((empresa) => {
            return (
            <Card className='mb-2 ml-2 mt-2 card' style={{ display: 'block' }}>
                <div className='d-flex alert alert-primary' onClick={() => { desplegarEmpresa(empresa[0]) }}>
                    <CardTitle tag="h4" className=' '>{empresa[0]}</CardTitle>
                    <div className='importe'>{getImporteTotalEmpresa(empresa[0])}€</div>
                </div>
                <CardBody className='invoice-padding oculto' id={`e-${empresa[0]}`}>
                    {Array.from(Object.entries(empresa[1])).map((hotel) => {
                        return (
                            <Card className='mb-2 ml-2'>
                                <div className='d-flex alert alert-success' onClick={() => { desplegarHotel(hotel[0], empresa[0]) }}>
                                    <CardTitle tag="h4" >{hotel[0]}</CardTitle>
                                    <div className='importe'>{getImporteTotalHotel(hotel[0], empresa[0])}€</div>
                                </div>
                                <CardBody className='invoice-padding oculto' id={`ho-${empresa[0]}-${hotel[0]}`}>
                                    {Array.from(Object.entries(hotel[1])).map((habitacion) => {
                                        return (
                                            <Card className='mb-2 ml-2'>
                                                <div className='d-flex alert alert-info' onClick={() => { desplegarHabiacion(habitacion[0], hotel[0], empresa[0]) }}>
                                                    <CardTitle tag="h4" className='title'>{habitacion[0]}</CardTitle>
                                                    <div className='importe'>{getImporteTotalHabitacion(habitacion[0], hotel[0], empresa[0])}€</div>
                                                </div>
                                                <CardBody className='invoice-padding oculto' id={`ha-${empresa[0]}-${hotel[0]}-${habitacion[0]}`}>
                                                    <div className='d-flex'>
                                                    {Array.from(Object.entries(habitacion[1])).map(producto => {
                                                        return (
                                                            <div className='mb-3 col-md-3'> 
                                                                <div className='mr-1'><img src={`${getImagenBasePath()}/${getImagenProducto(producto[0])}`} width='120px' height='120px'/></div>
                                                                <div className='coste'>{producto[1]}€</div>
                                                            </div>
                                                        ) 
                                                    })}
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        )
                                    })}
                                </CardBody>
                            </Card>
                        )
                    })}
                </CardBody>
            </Card>
            )
        })
    ) : <div className="alert alert-danger" role="alert">
            Sin resultados para los parámetros seleccionados
        </div>
    }
         
    </main>) : (<SinPermisos/>)
}

export default Informes