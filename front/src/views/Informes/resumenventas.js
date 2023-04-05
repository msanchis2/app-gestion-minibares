import React, { useState, useEffect } from 'react'
import Tabla from '../../components/Tabla'
import useUser from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { getPermisosEnPagina, getBasePath, getAuth } from '../../Utils'
import SinPermisos from '../SinPermisos'
import axios from "axios"
import Select from 'react-select'

const columns = [
    {
        name: 'Hotel',
        selector: row => row.Hotel,
        sortable: true,
        width: "24%"
    },
    {
        name: 'Media Anual',
        selector: row => row.Acumulado,
        sortable: true,
        width: "18%"
    },
    {
        name: 'Mes Anterior',
        selector: row => row.MesAnterior,
        sortable: false,
        width: "18%",
        margin: "0"
    },
    {
        name: 'Mes Actuaal',
        selector: row => row.MesActual,
        sortable: false,
        width: "18%",
        margin: "0"
    },
    {
        name: 'Hoy',
        selector: row => row.Hoy,
        sortable: false,
        width: "18%",
        margin: "0"
    }
];

const ResumenVentas = () => {
    const {isLogged, permisosUsuario, dataUsuario, hotelSelected} = useUser();
    const navigate = useNavigate();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Informe Resumen Ventas')
    const [data, setData] = useState([])
    const [tipoImporte, setTipoImporte] = useState('importeVenta')

    const cargarData = async () => {
        const {data: resumenVentas} = await axios.get(`${getBasePath()}/informes/resumenventas/${dataUsuario.empresaId}/${tipoImporte}`, getAuth());
        setData(resumenVentas)
    }
    const getTipoImportes = [
        {value: 'importeVenta', label: "Venta"},
        {value: 'importeCoste', label: "Coste"}
    ]

    useEffect(() => {
        cargarData()
    },[tipoImporte])

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    return isLogged && permisos.ver ? (<div>
        <div className="bgc-white p-20 bd" style={{ marginBottom: "10px" }}>
            <h6 className="c-grey-900">Resumen de ventas</h6>
            <div className="mb-3 col-md-4">
                <label className="form-label">Tipo Importe</label>
                <Select
                    options={getTipoImportes}
                    placeholder='Venta'
                    onChange={(target) => {setTipoImporte(target.value)}}
                />
            </div>
        </div>
        <Tabla columns={columns} data={data} selectableRows />
    </div>) : (<SinPermisos/>)
}

export default ResumenVentas;