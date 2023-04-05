import { Link } from "react-router-dom";
import useUser from '../../hooks/useUser'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Modal, Button, ModalHeader, ModalBody, FormGroup } from 'reactstrap'
import { getBasePath, getAuth, getImagenBasePath} from '../../Utils'
import axios from 'axios';
import { getPaginasVisibles, abreCierraMenu } from '../../Utils'

const MenuLateral = () => {
  const {isLogged, dataUsuario, permisosUsuario, hotelesUsuario, hotelSelected, changeHotelSelected} = useUser()
  const rol = dataUsuario.rolesId
  const permisos = getPaginasVisibles(permisosUsuario, rol)
  const [abierto, setAbierto] = useState(false)
  const [hotelAbierto, setHotelAbierto] = useState(hotelSelected)
  const [nombreHotelSelected, setNombreHotelSelected] = useState('')
  const [imagenHotel, setImagenHotel] = useState('')
  const [todosHoteles, setTodosHoteles] = useState([])
  const [isOpenSistema, setIsOpenSistema] = useState(false);
  const [isOpenInformes, setIsOpenInformes] = useState(false);

  const cargarHoteles = async () => {
    const {data: hoteles} = await axios.get(`${getBasePath()}/hoteles`, getAuth())
    setTodosHoteles(hoteles)
    //NO CAMBIAR == POR === O DEJA DE FUNCIONAR
    const hotelesFiltrado = hoteles.find(el => el.id == hotelSelected)
    if (hotelesFiltrado != undefined){
      setNombreHotelSelected(hotelesFiltrado.nombre)
      setImagenHotel(hotelesFiltrado.imagen)
    }
  }

  useEffect(() => {
    cargarHoteles()
  },[])

  const getModalOptions = () => {
    const options = []
    let label
    hotelesUsuario.forEach(el => { 
      label = todosHoteles.find(h => h.id === el.hotelId)
      if (label !== undefined)
        options.push({value: el.hotelId, label: label.nombre}) 
    })
    return options
  }

  const mostrarEnlace = (pagina) => {
    if (pagina === 'Permisos') {
      return rol === 1 ? 'block' : 'none'
    }
    return permisos.includes(pagina) ? 'block' : 'none'
  }

  const modalStyles = { 
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px'
  }

  const cambiarEstadoModal = () => {
    setAbierto(!abierto)
    if (abierto)
      window.location.reload()
  }
  const cierraModal = () => {
    setAbierto(!abierto)
  }

    if(!isLogged) return null
    return (
      <div className="sidebar">
        <Modal isOpen={abierto} style={modalStyles}>
          <ModalHeader>
            Hotel con el que trabajar
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Select 
                  options={getModalOptions()} 
                  id="hoteles" className="form-control" 
                  value={getModalOptions().find(el => el.value === hotelAbierto)} 
                  onChange={(target) => {
                    changeHotelSelected(target)
                    setHotelAbierto(target.value)
                    setNombreHotelSelected(todosHoteles.find(el => el.id === target.value).nombre)
                  }}
                  />
            </FormGroup>
            <div style={{marginTop: "10px"}}>
              <Button color="primary" onClick={cambiarEstadoModal} style={{marginRight: '5px'}}>Aceptar</Button>
              <Button color="secondary" onClick={cierraModal}>Cancelar</Button>
            </div> 
          </ModalBody>
        </Modal>

        <div className="sidebar-inner">
          <div className="sidebar-logo">
            <div className="peers ai-c fxw-nw">
              <div className="peer peer-greed">
                <div className="peers ai-c fxw-nw" onClick={cambiarEstadoModal}>
                  <div className="peer">
                    <div className="logo">
                      <img src={`${getImagenBasePath()}/${imagenHotel}`} alt="Logo del hotel" width="70px" height="70px"/>
                    </div>
                  </div>
                  <div style={{marginLeft: '10px'}}>
                    <h5 className="lh-1 mb-0 ml-1 logo-text">{nombreHotelSelected}</h5>
                  </div>
                </div>
              </div>
              <div className="peer">
                <div className="mobile-toggle sidebar-toggle">
                  <span className="td-n" onClick={abreCierraMenu}>
                    <i className="ti-arrow-circle-left"></i>
                  </span> 
                </div>
              </div>
            </div>
          </div>

          <ul className="sidebar-menu scrollable pos-r">
            <li className="nav-item mT-30 actived" style={{display: mostrarEnlace('Panel')}}>
              <Link className="sidebar-link" to="/">
                <span className="icon-holder">
                  <i className="c-blue-500 ti-home"></i>
                </span>
                <span className="title">Panel</span>
              </Link> 
            </li>
            <li className="nav-item" style={{display: mostrarEnlace('Empresas')}}>
              <Link className='sidebar-link' to="empresas">
                <span className="icon-holder">
                  <i className="c-deep-orange-500 ti-briefcase"></i>
                </span>
                <span className="title">Empresas</span>
              </Link> 
            </li>
            <li className="nav-item" style={{display: mostrarEnlace('Hoteles')}}>
              <Link className='sidebar-link' to="hoteles">
                <span className="icon-holder">
                  <i className="c-blue-500 ti-direction"></i>
                </span>
                <span className="title">Hoteles</span>
              </Link> 
            </li>
            <li className="nav-item" style={{display: mostrarEnlace('Habitaciones')}}>
              <Link className='sidebar-link' to="habitaciones">
                <span className="icon-holder">
                  <i className="c-deep-orange-500 ti-direction-alt"></i>
                </span>
                <span className="title">Habitaciones</span>
              </Link> 
            </li>
            <li className="nav-item" style={{display: mostrarEnlace('Inventario')}}>
              <Link className='sidebar-link' to="inventario">
                <span className="icon-holder">
                  <i className="c-deep-orange-500 ti-clipboard"></i>
                </span>
                <span className="title">Inventario</span>
              </Link> 
            </li>
            <li className="nav-item" style={{display: mostrarEnlace('Productos')}}>
              <Link className='sidebar-link' to="productos">
                <span className="icon-holder">
                  <i className="c-deep-purple-500 ti-package"></i>
                </span>
                <span className="title">Productos</span>
              </Link> 
            </li>
            <li className="nav-item" style={{display: mostrarEnlace('Posteos')}}>
              <Link className='sidebar-link' to="posteos">
                <span className="icon-holder">
                  <i className="c-indigo-500 ti-panel"></i>
                </span>
                <span className="title">Posteos</span>
              </Link> 
            </li>
            <li className={`nav-item dropdown ${isOpenInformes ? 'open' : ''}`} style={{display: mostrarEnlace('Informes')}}>
              <a className="dropdown-toggle" href="javascript:void(0);" onClick={() => setIsOpenInformes(!isOpenInformes)}>
                <span className="icon-holder">
                    <i className="c-red-500 ti-files"></i>
                  </span>
                <span className="title">Informes</span>
                <span className="arrow">
                    <i className="ti-angle-right"></i>
                  </span>
              </a> 
              <ul className="dropdown-menu">
                <li className="d-flex">
                  <span className="icon-holder mt-2"><i className="c-red-800 ti-user"></i></span>
                  <Link className='sidebar-link' to="informes">
                    <span className="title">General</span>
                  </Link> 
                </li>                 
                <li className="d-flex">
                  <span className="icon-holder mt-2"><i className="c-red-800 ti-id-badge"></i></span>
                  <Link className='sidebar-link' to="resumenventas">
                    <span className="title">Resumen Ventas</span>
                  </Link> 
                </li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${isOpenSistema ? 'open' : ''}`} style={{display: mostrarEnlace('Sistema')}}>
              <a className="dropdown-toggle" href="javascript:void(0);" onClick={() => setIsOpenSistema(!isOpenSistema)}>
                <span className="icon-holder">
                    <i className="c-red-500 ti-desktop"></i>
                  </span>
                <span className="title">Sistema</span>
                <span className="arrow">
                    <i className="ti-angle-right"></i>
                  </span>
              </a> 
              <ul className="dropdown-menu">
                <li className="d-flex">
                  <span className="icon-holder mt-2"><i className="c-red-800 ti-user"></i></span>
                  <Link className='sidebar-link' to="usuarios">
                    <span className="title">Usuarios</span>
                  </Link> 
                </li>                 
                <li className="d-flex">
                  <span className="icon-holder mt-2"><i className="c-red-800 ti-id-badge"></i></span>
                  <Link className='sidebar-link' to="roles">
                    <span className="title">Roles</span>
                  </Link> 
                </li>
                <li className="d-flex">
                  <span className="icon-holder mt-2"><i className="c-red-800 ti-na"></i></span>
                  <Link className='sidebar-link' to="permisos"><span className="title">Permisos</span></Link> 
                </li>
                <li className="d-flex">
                  <span className="icon-holder mt-2"><i className="c-red-800 ti-bolt"></i></span>
                  <Link className='sidebar-link' to="generarhabitaciones">
                    <span className="title">Generar habitaciones</span>
                  </Link> 
                </li>
                <li className="d-flex">
                  <span className="icon-holder mt-2"><i className="c-red-800 ti-check-box"></i></span>
                  <Link className='sidebar-link' to="productosdefecto">
                    <span className="title">Productos por defecto</span>
                  </Link> 
                </li>
              </ul>
            </li>
            {/*<li className={`nav-item dropdown ${isOpenInformes ? 'open' : ''}`} style={{display: mostrarEnlace('Informes')}}>
                <a className="dropdown-toggle" href="javascript:void(0);" onClick={() => setIsOpenInformes(!isOpenInformes)}>
                  <span className="icon-holder">
                    <i className="c-red-500 ti-files"></i>
                  </span>
                  <span className="title">Informes</span>
                  <span className="arrow">
                    <i className="ti-angle-right"></i>
                  </span>
              </a> 
              <ul className="dropdown-menu">
              <li className="d-flex">
                  <span className="icon-holder mt-2"><i className="c-red-800 ti-bag"></i></span>
                  <Link className='sidebar-link' to="ventas">
                    <span className="title">Ventas</span>
                  </Link> 
                </li>                 
                <li className="d-flex">
                  <span className="icon-holder mt-2"><i className="c-red-800 ti-archive"></i></span>
                  <Link className='sidebar-link' to="stock">
                    <span className="title">Stock</span>
                  </Link> 
                </li>
              </ul>
            </li>*/}
          </ul>
        </div>
      </div>
    )
  }
  
  export default MenuLateral