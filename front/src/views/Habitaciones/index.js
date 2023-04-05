import React, { useState, useEffect } from 'react'
import Tabla from '../../components/Tabla'
import useUser from '../../hooks/useUser'
import { useNavigate, Link  } from 'react-router-dom'
import { getPermisosEnPagina, getBasePath, getAuth, getImagenBasePath } from '../../Utils'
import SinPermisos from '../SinPermisos'
import axios from "axios"
import eliminarRegistro from '../../components/eliminarRegistro'

const columns = [
    {
        name: 'Imagen',
        selector: row => <img src={`${getImagenBasePath()}/${row.imagen}`} style={{maxWidth:"32px"}} alt="Imagen Habitación" />,
        sortable: true,
        width: "21%"
    },
    {
        name: 'Nombre',
        selector: row => row.nombre,
        sortable: true,
        width: "21%"
    },
    {
        name: '',
        selector: row => row.ver,
        sortable: false,
        width: "75px",
        margin: "0"
    },
    {
        name: '',
        selector: row => row.editar,
        sortable: false,
        width: "75px",
        margin: "0"
    },
    {
        name: '',
        selector: row => row.borar,
        sortable: false,
        width: "75px",
        margin: "0"
    }
];

const Habitaciones = () => {
    const {isLogged, permisosUsuario, hotelSelected} = useUser();
    const navigate = useNavigate();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Habitaciones')
    const [data, setData] = useState([])

    const cargarData = async () => {
        const {data: habitacionesData} = await axios.get(`${getBasePath()}/devuelvehabitacionesporhotel/${hotelSelected}`, getAuth());
        habitacionesData.forEach(el =>  {
            if(permisos.editar) 
                el.editar = (<div><Link to={`/habitacionesform/editar/${el.id}`} style={{ color:"black",marginRight:"4px"}} className="btn cur-p btn-outline-primary"><i className="ti ti-pencil"></i></Link></div>)
            if(permisos.borrar) 
                el.borar = (<div><Link to={`/habitaciones`} onClick={() => eliminarRegistro(el.id, 'habitaciones')} style={{ color:"black",marginRight:"4px"}} className="btn cur-p btn-outline-primary"><i className="ti ti-trash"></i></Link></div>)
            el.ver = (<div><Link to={`/habitacionesform/ver/${el.id}`} style={{ color:"black",marginRight:"4px"}} className="btn cur-p btn-outline-primary"><i className="ti ti-eye"></i></Link></div>)
        })
        setData(habitacionesData)
    }

    useEffect(() => {
        cargarData()
    },[])

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    return isLogged && permisos.ver ? (<div>
        <div className="bgc-white p-20 bd" style={{ marginBottom: "10px" }}>
            <h6 className="c-grey-900">Habitaciones</h6>
            { permisos.crear &&
                <div className="mT-30">
                    <Link className="btn btn-success btn-color" to="/habitacionesform/nuevo">Nuevo</Link>
                </div>
            }
        </div>
        <Tabla columns={columns} data={data} selectableRows />
    </div>) : (<SinPermisos/>)
}

export default Habitaciones;