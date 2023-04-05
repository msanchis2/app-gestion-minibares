import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser'
import { getBasePath, getAuth, getPermisosEnPagina, permisoAdecuado, getImagenBasePath, toastAlert } from '../../Utils'
import axios from "axios"
import Select from 'react-select'
import { Input, Form } from 'reactstrap'
import Swal from 'sweetalert2'
import SinPermisos from '../SinPermisos'

const Empresasform = () => {
    const navigate = useNavigate();
    const {isLogged, permisosUsuario} = useUser();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Empresas')
    const datos = useParams() //Obtenemos los parámetros pasados por url { accion: "edit", id: "1" }
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [nombreContacto, setNombreContacto] = useState('')
    const [razonSocial, setRazonSocial] = useState('')
    const [tipoCifNif, setTipoCifNif]  = useState('')
    const [cifNif, setCifNif]  = useState('')
    const [imagen, setImagen]  = useState('')
    const [newImagen, setNewImagen] = useState('')
    const [tabEmpresa, setTabEmpresa] = useState(true)

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    const options = [
        { value: 'Cif', label: 'Cif' },
        { value: 'Nif', label: 'Nif' },
        { value: 'DNI', label: 'DNI' },
        { value: 'Pasaporte', label: 'Pasaporte' }
      ]

    const getDatosEmpresa = async () => {
        try {
            const {data: empresa} = await axios.get(`${getBasePath()}/empresas/${datos.id}`, getAuth());
            setNombre(empresa.nombre)
            setDescripcion(empresa.descripcion)
            setRazonSocial(empresa.razonSocial)
            setTelefono(empresa.telefono)
            setNombreContacto(empresa.nombreContacto)
            setTipoCifNif(empresa.tipoCifNif)
            setCifNif(empresa.cifnif)
            setImagen(empresa.imagen)
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'Empresa no encontrada',
                icon: 'error'
              })
        }
    }

    const submitEmpresa = async (empresaObj) => {
        try {
            console.log(`${getBasePath()}/empresas/${datos.id}`)
            if (datos.accion === 'nuevo') 
                await axios.post(`${getBasePath()}/empresas`, empresaObj, getAuth());
            if (datos.accion === 'editar') 
                await axios.put(`${getBasePath()}/empresas/${datos.id}`, empresaObj, getAuth());
            toastAlert('Empresas')
            navigate("/empresas")
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error en la creación de la empresa',
                icon: 'error'
              })
            console.error(error)
        }
    }

    const handleImageChange = (e) => {
        const reader = new FileReader()
        reader.onload = function (e) {
            setImagen(e.target.result)
            setNewImagen(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if(datos.accion !== 'nuevo') { getDatosEmpresa() }
    }, [datos])

    function handleSubmit (e) {
        e.preventDefault()
        const empresaObj = {
            nombre,
            descripcion,
            telefono,
            nombreContacto,
            razonSocial,
            tipoCifNif,
            cifNif,
            imagen
        }
        submitEmpresa(empresaObj)
    }
    const cambiaTabs = (tipo) => {

        (tipo == 'empresa') ? setTabEmpresa(true) : setTabEmpresa(false)
        
    
    }
    return isLogged && permisoAdecuado(permisos, datos.accion) ? (
        <div className="row gap-20 " style={{ position:"relative",height:"1116px" }} >
            <div className="masonry-item col-md-12" style={{ position:"absolute", left:"0%", top:"0px" }} >
                <div className="bgc-white p-20 bd">
                    {/*<h6 className="c-grey-900">{ datos.accion.charAt(0).toUpperCase() + datos.accion.slice(1).toLowerCase() } Empresa</h6>*/}
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={tabEmpresa ? 'nav-link active' : 'nav-link'} href="#" onClick={() => cambiaTabs('empresa')}>Datos Empresa</a>
                        </li>
                        <li className="nav-item">
                            <a className={tabEmpresa ? 'nav-link ' : 'nav-link active'} href="#" onClick={() => cambiaTabs('facturacion')}>Datos Facturación</a>
                        </li>
                    </ul>
                    <div className="mT-30">
                        <Form onSubmit={handleSubmit}>
                            {tabEmpresa ? (
                                <div>
                                    <input type="hidden" id="imagen_antigua" value={imagen} />
                                    <div className='row'>
                                        <div className="mb-3 col-md-4">
                                            <img id="imagen" 
                                                className='user-avatar rounded mr-2 my-25 cursor-pointer'
                                                src={newImagen || `${getImagenBasePath()}/${imagen}`}
                                                alt='Imagen empresa'
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
                                            <Input type="text" className="form-control" id="nombre" aria-describedby="nombre" value={nombre} onChange={({target}) => setNombre(target.value)} disabled={datos.accion === 'ver'} required/>
                                        </div>
                                        <div className="mb-3 col-md-4">
                                            <label className="form-label">Descripción</label>
                                            <Input type="text" className="form-control" id="descripcion" aria-describedby="descripcion" value={descripcion} onChange={({target}) => setDescripcion(target.value)} disabled={datos.accion === 'ver'}/>
                                        </div>
                                        <div className="mb-3 col-md-4">
                                            <label className="form-label">Teléfono</label>
                                            <Input type="text" className="form-control" id="telefono" aria-describedby="telefono" value={telefono} onChange={({target}) => setTelefono(target.value)} disabled={datos.accion === 'ver'}/>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="mb-3 col-md-4">
                                            <label className="form-label">Nombre de Contacto</label>
                                            <Input type="text" className="form-control" id="nombreContacto" aria-describedby="nombreContacto" value={nombreContacto} onChange={({target}) => setNombreContacto(target.value)} disabled={datos.accion === 'ver'}/>
                                        </div>
                                        <div className="mb-3 col-md-4">
                                            <label className="form-label">Razón Social</label>
                                            <Input type="text" className="form-control" id="razonSocial" aria-describedby="razonSocial" value={razonSocial} onChange={({target}) => setRazonSocial(target.value)} disabled={datos.accion === 'ver'}/>
                                        </div>
                                        </div>
                                    <div className='row'>
                                        <div className="mb-3 col-md-4">
                                            <label className="form-label">CifNif</label>
                                            <Select 
                                                options={options} 
                                                id="tipoCifNif"
                                                value={options.find(el => el.value === tipoCifNif)}
                                                onChange={(target) => setTipoCifNif(target.value)}
                                                isDisabled={datos.accion === 'ver'}
                                            />
                                        </div>
                                        <div className="mb-3 col-md-4">
                                            <label className="form-label">Documento</label>
                                            <Input type="text" className="form-control" id="cifnif" aria-describedby="cifnif" value={cifNif} onChange={({target}) => setCifNif(target.value)} disabled={datos.accion === 'ver'}/>
                                        </div>
                                    </div>                            
                                    <div className='d-flex'>
                                        <button type="submit" className="btn btn-primary btn-color" disabled={datos.accion === 'ver'}>Guardar</button>
                                        <Link className="btn btn-secondary btn-color" to="/empresas" style={{marginLeft: '10px'}}>Atras</Link>
                                    </div>
                                </div>
                            ) : <div>hola</div>}
                            
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    ): (<SinPermisos/>)
}

export default Empresasform