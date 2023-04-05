import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser'
import { getBasePath, getImagenBasePath, getAuth, getPermisosEnPagina, permisoAdecuado, toastAlert } from '../../Utils'
import axios from "axios"
import Select from 'react-select'
import { Input, Form } from 'reactstrap'
import Swal from 'sweetalert2'
import SinPermisos from '../SinPermisos'

const Usuariosform = () => {
    const navigate = useNavigate();
    const {isLogged, permisosUsuario, dataUsuario} = useUser();
    const permisos = getPermisosEnPagina(permisosUsuario, 'Usuarios')
    const datos = useParams() //Obtenemos los parámetros pasados por url { accion: "edit", id: "1" }
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [telefono, setTelefono] = useState('')
    const [enviomailSN, setEnviomailSN] = useState('')
    const [activoSN, setActivoSN] = useState('')
    const [inactivo, setInactivo] = useState('')
    const [password, setPassword] = useState('')
    const [nuevoPass, setNuevoPass] = useState('')
    const [roles, setRoles] = useState([])
    const [rolesId, setRolesId]  = useState('')
    const [hoteles, setHoteles]  = useState([])
    const [hotelesPorEmpresa, setHotelesPorEmpresa]  = useState([])
    const [hotel, setHotel]  = useState('')
    const [listaHoteles, setListaHoteles]  = useState([])
    const [listaHotelesDefecto, setListaHotelesDefecto]  = useState([])
    const [empresas, setEmpresas]  = useState([])
    const [empresa, setEmpresa]  = useState('')
    const [newAvatar, setNewAvatar] = useState(null)

    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    const getData = async () => {
        try {
            const opcionesRoles = []
            const opcionesEmpresas = []

            const {data: respRoles} = await axios.get(`${getBasePath()}/roles`, getAuth());
            const {data: respEmpresas} = await axios.get(`${getBasePath()}/empresas`, getAuth());
            const {data: respHoteles} = await axios.get(`${getBasePath()}/hoteles`, getAuth());

            respRoles.forEach(el => {
                opcionesRoles.push({value: el.id, label: el.nombre})
            })
            respEmpresas.forEach(el => {
                opcionesEmpresas.push({value: el.id, label: el.nombre})
            })

            setEmpresas(opcionesEmpresas)
            setRoles(opcionesRoles)
            setHoteles(respHoteles)

        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'Error cargando datos necesarios',
                icon: 'error'
              })
        }
    }

    const getDatosUsuario = async () => {
        try {
            const {data: usuario} = await axios.get(`${getBasePath()}/users/${datos.id}`, getAuth());
            setNombre(usuario.name)
            setEmail(usuario.email)
            setEmpresa(usuario.empresaId)
            setAvatar(usuario.avatar)
            setRolesId(usuario.rolesId)
            setTelefono(usuario.telefono)
            setActivoSN(usuario.activoSN === "S")
            setEnviomailSN(usuario.enviomailSN === "S")
            setInactivo(usuario.inactivo === "S")
            setPassword(usuario.password)

            const hotelDefecto = usuario.usuarios_hoteles?.find(el => el.hotel_defecto_sn === 'S')
            if (hotelDefecto !== undefined) {
                setHotel(hotelDefecto.hotelId)

                const options = []
                const optionsListaHoteles = []
                const optionsHoteles = []
                let label
                usuario.usuarios_hoteles.forEach(el => { 
                    label = hoteles.find(hot => hot.id === el.hotelId)
                    if (label !== undefined){
                        options.push({value: el.hotelId, label: label.nombre}) 
                        optionsListaHoteles.push({hotelId: el.hotelId, label: label.nombre}) 
                    }
                })
                hoteles.filter(el => el.empresaId === usuario.empresaId).forEach(el => { 
                    optionsHoteles.push({value: el.id, label: el.nombre}) 
                })
                setListaHotelesDefecto(options)
                setListaHoteles(optionsListaHoteles)
                setHotelesPorEmpresa(optionsHoteles)
            }
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'Error en la carga del usuario',
                icon: 'error'
              })
        }
    }
    
    const handleImageChange = (e) => {
        const reader = new FileReader()
        reader.onload = function (e) {
            setAvatar(e.target.result)
            setNewAvatar(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleHotelesChange = ({target}) => {
        const hotelesSelected = []
        const opcionesHoteles = []
        Array.from(target.selectedOptions).forEach(el => {
            hotelesSelected.push({hotelId: el.value})
            opcionesHoteles.push({value: el.value, label: hoteles.find(hot => hot.id === Number(el.value)).nombre})
        })
        setListaHoteles(hotelesSelected)
        setListaHotelesDefecto(opcionesHoteles)
    }

    useEffect(() => {
        const hotelesFiltrados = hoteles.filter(h => h.empresaId === empresa)
        const opciones = []
        hotelesFiltrados.forEach(el => {
            opciones.push({value: el.id, label: el.nombre})
        })
        setHotelesPorEmpresa(opciones)
    }, [empresa])

    const submit = async (hotelesObj) => {
        try {
            if (datos.accion === 'nuevo') 
                await axios.post(`${getBasePath()}/users`, hotelesObj, getAuth());
            if (datos.accion === 'editar') 
                await axios.put(`${getBasePath()}/users/${datos.id}`, hotelesObj, getAuth());
            toastAlert('Usuarios')
            navigate("/usuarios")
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
        getData()
    }, [datos])

    useEffect(() => {
        if(datos.accion !== 'nuevo') { getDatosUsuario() }
    }, [hoteles])

    const booleanToSN = (value) => {
        return value ? 'S' : 'N'
    }

    function handleSubmit (e) {
        e.preventDefault()
        listaHoteles.forEach(el => {
            if (el.hotelId === hotel) {
                el.hotel_defecto_sn = "S"
            } else {
                el.hotel_defecto_sn = "N"
            }
        })
        const usuarioObj = {
            name: nombre,
            rolesId,
            email,
            telefono,
            enviomailSN: booleanToSN(activoSN),
            avatar,
            activoSN: booleanToSN(activoSN),
            usuarioInactivo: booleanToSN(inactivo),
            usuarios_hoteles: listaHoteles,
            password
        }
        if (inactivo === 'S') { 
            const date = new Date()
            usuarioObj.fechaInactivo = date.toString()
        }
        submit(usuarioObj)
    }

    const permisoAdecuadoUsuario = () => {
        if (datos.id === dataUsuario.id)
            return true
        return permisoAdecuado(permisos, datos.accion)
    }
    return isLogged && permisoAdecuadoUsuario() ? (
        <div className="row gap-20 " style={{ position:"relative",height:"1116px" }} >
            <div className="masonry-item col-md-12" style={{ position:"absolute", left:"0%", top:"0px" }} >
                <div className="bgc-white p-20 bd">
                    <h6 className="c-grey-900">{ datos.accion.charAt(0).toUpperCase() + datos.accion.slice(1).toLowerCase() } Usuario</h6>
                    <div className="mT-30">
                        <Form onSubmit={handleSubmit}>
                            <div className='row'>                                
                                <div className="mb-3 col-md-4">
                                    <img id="avatar" 
                                         className='user-avatar rounded mr-2 my-25 cursor-pointer'
                                         src={newAvatar || `${getImagenBasePath()}/${avatar}`}
                                         alt='Imagen avatar'
                                         height='90px'
                                         width='90px'
                                    />
                                    <label className="form-label" style={{width:"100%"}}>Avatar</label>
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
                                    <Input type="text" className="form-control" id="name" aria-describedby="nombre" value={nombre} onChange={({target}) => setNombre(target.value)} disabled={datos.accion === 'ver'} required />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">E-mail *</label>
                                    <Input type="mail" className="form-control" id="email" aria-describedby="email" value={email} onChange={({target}) => setEmail(target.value)} disabled={datos.accion === 'ver'} required />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Teléfono</label>
                                    <input type="text" className="form-control" id="telefono" aria-describedby="telefono" value={telefono} onChange={({target}) => setTelefono(target.value)} disabled={datos.accion === 'ver'}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Rol *</label>
                                    <Select 
                                        options={roles} 
                                        id="rol"
                                        value={roles.find(el => el.value === rolesId)}
                                        onChange={(target) => setRolesId(target.value)}
                                        isDisabled={datos.accion === 'ver'}
                                    />
                                    <input type="text" value={roles.find(el => el.value === rolesId)} required style={{  position:'absolute', height: '1px', width: '1px', border: '0px'}} />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Nuevo Password</label>
                                    <Input type="password" className="form-control" id="password" aria-describedby="nuevopassword"  value={nuevoPass} onChange={({target}) => setNuevoPass(target.value)} disabled={datos.accion === 'ver'}/>
                                    <small id="passwordHelp" className="text-muted">Introduce el nuevo password para cambiarlo.</small>
                                </div>
                                <div className="mb-3 col-md-4 pt-3">
                                    <div className="form-check" style={{display: 'none'}}>
                                        <label className="form-label form-check-label">
                                        <input className="form-check-input" id="enviomailSN" name="enviomailSN" type="checkbox" checked={enviomailSN} onClick={() => setEnviomailSN(!enviomailSN)} disabled={datos.accion === 'ver'}/> Envio de alertas por mail
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-label form-check-label">
                                        <input className="form-check-input" id="activoSN" name="activoSN" type="checkbox" checked={activoSN} onClick={() => setActivoSN(!activoSN)} disabled={datos.accion === 'ver'}/> Activo
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Empresa *</label>
                                    <Select 
                                        options={empresas} 
                                        id="empresa"
                                        value={empresas.find(el => el.value === empresa)}
                                        onChange={(target) => setEmpresa(target.value)}
                                        isDisabled={datos.accion === 'ver'}
                                    />
                                    <input type="text" value={empresas.find(el => el.value === empresa)} required style={{  position:'absolute', height: '1px', width: '1px', border: '0px'}} />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Hoteles *</label>
                                    <Input
                                        type="select"
                                        name="selectMulti"
                                        id="hoteles"
                                        multiple
                                        onChange={handleHotelesChange}
                                        >
                                        {hotelesPorEmpresa.map(el => {
                                            //
                                            //Devolvemos seleccionado o no 
                                            //
                                            for (const clave in listaHotelesDefecto) {
                                                if (listaHotelesDefecto[clave].value === el.value) {
                                                    return (<option value={el.value} selected>{el.label}</option>)
                                                } 
                                            }
                                            return (<option value={el.value} >{el.label}</option>)

                                        })}
                                        <input type="text" value={listaHotelesDefecto} required style={{  position:'absolute', height: '1px', width: '1px', border: '0px'}} />

                                    </Input>
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Hotel que se carga por defecto *</label>
                                    <Select 
                                        options={listaHotelesDefecto} 
                                        id="hotel"
                                        value={listaHotelesDefecto.find(el => el.value === hotel)}
                                        onChange={(target) => setHotel(target.value)}
                                        isDisabled={datos.accion === 'ver'}
                                    />
                                    <input type="text" value={listaHotelesDefecto.find(el => el.value === hotel)} required style={{  position:'absolute', height: '1px', width: '1px', border: '0px'}} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-color">Guardar</button>
                            <Link className="btn btn-secondary btn-color" to="/usuarios" style={{marginLeft: '10px'}}>Atras</Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    ): (<SinPermisos/>)
}

export default Usuariosform