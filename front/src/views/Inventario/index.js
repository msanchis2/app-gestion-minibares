import React, { useState, useEffect } from 'react'
import Tabla from '../../components/Tabla'
import useUser from '../../hooks/useUser'
import { useNavigate, Link  } from 'react-router-dom'
import { getPermisosEnPagina, getBasePath, getAuth, getImagenBasePath } from '../../Utils'
import SinPermisos from '../SinPermisos'
import axios from "axios"
import Swal from 'sweetalert2'

const columns = [
    {
        name: 'Producto',
        selector: row => <img src={`${getImagenBasePath()}/${row.imagen}`} style={{maxWidth:"32px"}} />,
        sortable: true,
    },
    {
        name: 'Nombre',
        selector: row => row.producto,
        sortable: true,
    },
    {
        name: 'Cantidad',
        selector: row => row.cantidad,
        sortable: true,
    },
    {
        name: 'Caducidad',
        selector: row => row.fechaCaducidadMostrar,
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

const eliminarInventario = (nombre, productoId, hotelId, fechaCaducidad, cantidad) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Estás seguro de que deseas eliminar todo el inventario de ${nombre} de forma permanentemente?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then(async (result) => {
        if (result.value) {
            await axios.get(`${getBasePath()}/inventarioupdate/${productoId}/${hotelId}/${fechaCaducidad}/${cantidad}`, getAuth())
            .then(response =>{
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El inventario ha sido eliminado con éxito.',
                    icon: 'success'
                  }).then(() => { window.location.reload() })
            }).catch(error => {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error al borrar',
                    text: 'Compruebe que el dato a borrar no tiene registros relacionados'
                })
            });
        }
    })
}

const Inventario = () => {
    const {isLogged, permisosUsuario, hotelSelected} = useUser();
    const navigate = useNavigate();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Inventario')
    const [data, setData] = useState([])
    const [productosDefecto, setProductosDefecto] = useState([1])

    const cargarData = async () => {
        const {data: productosDefecto} = await axios.get(`${getBasePath()}/productos_defecto/porhotel/${hotelSelected}`, getAuth());
        if (productosDefecto.length){
            setProductosDefecto(productosDefecto.length)
        }
        const {data: inventario} = await axios.get(`${getBasePath()}/muestrainventarioporhotel/${hotelSelected}`, getAuth());
        const {data: productos} = await axios.get(`${getBasePath()}/productos`, getAuth());
        console.error(inventario)
        inventario.forEach(el =>  {
            el.producto = productos.find(pro => pro.id == el.productoId).nombre
            if(permisos.editar) 
                el.editar = (<div><Link to={`/inventarioform/editar/${el.productoId}&${el.cantidad}&${el.fechaCaducidad}`} style={{ color:"black",marginRight:"4px"}} className="btn cur-p btn-outline-primary"><i className="ti ti-pencil"></i></Link></div>)
            if(permisos.borrar) 
                el.borar = (<div><Link to={`/inventario`}
                                  onClick={() => eliminarInventario(el.nombreProducto, el.productoId, el.hotelId, el.fechaCaducidad, '0')} 
                                    style={{ color:"black",marginRight:"4px"}} 
                                className="btn cur-p btn-outline-primary">
                                    <i className="ti ti-trash"></i>
                                </Link>
                            </div>)
            el.ver = (<div><Link to={`/inventarioform/ver/${el.productoId}&${el.cantidad}&${el.fechaCaducidad}`} style={{ color:"black",marginRight:"4px"}} className="btn cur-p btn-outline-primary"><i className="ti ti-eye"></i></Link></div>)
        })
        setData(inventario)
    }

    useEffect(() => {
        cargarData()
    },[])

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    return isLogged && permisos.ver ? (<div>
        <div className="bgc-white p-20 bd" style={{ marginBottom: "10px" }}>
            <h6 className="c-grey-900">Inventario</h6>
            { permisos.crear &&
                (productosDefecto.length === 0) 
                ? <div className="mT-30" style={{color: 'red', fontSize: '-webkit-xxx-large'}}>
                        Debes indicar los productos por defecto antes
                  </div>
                : <div className="mT-30" style={{}}>
                    <Link className="btn btn-success btn-color" to="/inventarioform/nuevo">Nuevo</Link>
                  </div>
            }
        </div>
        <Tabla columns={columns} data={data} selectableRows />
    </div>) : (<SinPermisos/>)
}
export default Inventario