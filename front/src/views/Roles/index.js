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
        name: 'Nombre',
        selector: row => row.nombre,
        sortable: true,
    },
    {
        name: 'Activo',
        selector: row => row.activoSN,
        sortable: true,
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

const Roles = () => {
    const {isLogged, permisosUsuario} = useUser();
    const navigate = useNavigate();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Roles')
    const [data, setData] = useState([])

    const cargarData = async () => {
        const {data: rols} = await axios.get(`${getBasePath()}/roles`, getAuth());
        rols.forEach(el =>  {
            if(permisos.editar) 
                el.editar = (<div><Link to={`/rolesform/editar/${el.id}`} style={{ color:"black", marginRight:"4px"}} className="btn cur-p btn-outline-primary"><i className="ti ti-pencil"></i></Link></div>)
            if(permisos.borrar) 
                el.borar = (<div><Link to={`/roles`} onClick={() => eliminarRegistro(el.id, 'Roles')} style={{ color:"black",marginRight:"4px"}} className="btn cur-p btn-outline-primary"><i className="ti ti-trash"></i></Link></div>)
            el.ver = (<div><Link to={`/rolesform/ver/${el.id}`} style={{ color:"black",marginRight:"4px"}} className="btn cur-p btn-outline-primary"><i className="ti ti-eye"></i></Link></div>)
        })
        setData(rols)
    }

    useEffect(() => {
        cargarData()
    },[])

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    return isLogged && permisos.ver ? (<div>
        <div className="bgc-white p-20 bd" style={{ marginBottom: "10px" }}>
            <h6 className="c-grey-900">Roles</h6>
            { permisos.crear &&
                <div className="mT-30">
                    <Link className="btn btn-success btn-color" to="/rolesform/nuevo">Nuevo</Link>
                </div>
            }
        </div>
        {console.error(data)}
        <Tabla columns={columns} data={data} selectableRows />
    </div>) : (<SinPermisos/>)
}
export default Roles