import React, { useEffect, useState } from 'react';
import Checkbox from '../../components/Checkbox'
import useUser from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { getBasePath, getAuth } from '../../Utils'
import axios from "axios"
import './Permisos.scss'

const Permisos = () => {
    const {isLogged, dataUsuario} = useUser();
    const [roles, setRoles] = useState([])
    const [permisos, setPermisos] = useState([])
    const paginas = ['Panel','Empresas','Hoteles','Habitaciones','Inventario','Productos','Posteos','Sistema','Informe General', 'Informe Resumen Ventas','Usuarios', 'Roles']
    const esAdmin = dataUsuario.rolesId == 1;
    const navigate = useNavigate();

    const llamadasBackend = async () => {
        try {
            const {data: roles} = await axios.get(`${getBasePath()}/roles`, getAuth());
            const {data: permisos} = await axios.get(`${getBasePath()}/roles_permisos`, getAuth())
            setRoles(roles.filter(rol => rol.activoSN === 'S'));
            setPermisos(permisos);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        llamadasBackend();
    }, [])
        
    useEffect(() => {
        if (!isLogged) { navigate("/login"); }
    }, [isLogged]);

    const getIdPermiso = (rolId, accion, pagina) => {
        const permiso = permisos.find(el => (el.roleId === rolId && el.accion === accion && el.controlador === pagina));
        if (permiso === undefined) 
            return 0;
        else 
            return permiso.id;
    }

    return (isLogged && esAdmin) ? ( 
    <div className='app-permission-list'>
        <h4 className="c-grey-900 mT-10 mB-30">Permisos</h4>
        <table id="tablaPermisos">
            <thead>
            <tr id="cabecera">
                <th></th>
                {roles.map(rol => { return (<th>{rol.nombre}</th>) })}
            </tr>
            </thead>
        {paginas.map(pag => {
            return (
            <tbody>
                <tr className='tituloPagina'>
                    <td colSpan={roles.length+1}>{pag}</td>
                </tr>
                <tr className='lineaCheckbox'>
                    <td>Ver</td>
                    {roles.map(rol => {return (<td><Checkbox accion="ver" roleId={rol.id} permisoId={getIdPermiso(rol.id, "ver", pag)}    controlador={pag}/></td>)} )}
                </tr>
                <tr className='lineaCheckbox'>
                <td>Crear</td>
                    {roles.map(rol => {return (<td><Checkbox accion="crear" roleId={rol.id} permisoId={getIdPermiso(rol.id, "crear", pag)}    controlador={pag}/></td>)} )}
                </tr>
                <tr className='lineaCheckbox'>
                <td>Editar</td>
                    {roles.map(rol => {return (<td><Checkbox accion="editar" roleId={rol.id} permisoId={getIdPermiso(rol.id, "editar", pag)}    controlador={pag}/></td>)} )}
                </tr>
                <tr className='lineaCheckbox'>
                <td>Borrar</td>
                    {roles.map(rol => {return (<td><Checkbox accion="borrar" roleId={rol.id} permisoId={getIdPermiso(rol.id, "borrar", pag)}    controlador={pag}/></td>)} )}
                </tr>
            </tbody>)}
        )}
        </table>
    </div>
    ) : (<div>No tienes permisos para ver esto</div>)
}

export default Permisos;