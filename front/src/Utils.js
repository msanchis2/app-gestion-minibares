import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2'

export function getPermisosEnPagina (permisos, pagina) {
    if(permisos === null || permisos === undefined) { return {ver: false, crear: false, editar: false, borrar: false} }
    const ver = permisos.find(el => (el.controlador === pagina && el.accion === 'ver')) !== undefined
    const editar = permisos.find(el => (el.controlador === pagina && el.accion === 'ver')) !== undefined
    const borrar = permisos.find(el => (el.controlador === pagina && el.accion === 'ver')) !== undefined
    const crear = permisos.find(el => (el.controlador === pagina && el.accion === 'ver')) !== undefined
    return {ver: ver, crear: crear, editar: editar, borrar: borrar}
}

export function getPaginasVisibles (permisos, rol) {
    const permisoPagina = permisos.filter(el => (el.accion === 'ver' && el.roleId === rol) )
    const paginas = []
    permisoPagina.forEach(el => paginas.push(el.controlador))
    return paginas; 
}

export function getBasePath() {
    switch(process.env.REACT_APP_ENTORNO) {
        case 'LOCAL':  return process.env.REACT_APP_API_ROUTE_LOCAL
        case 'DEV':    return process.env.REACT_APP_API_ROUTE_DEV
        case 'PRO':    return process.env.REACT_APP_API_ROUTE_PRO
        default: console.error('Entorno mal configurado')
    }
}

export function getImagenBasePath() {
    switch(process.env.REACT_APP_ENTORNO) {
        case 'LOCAL':  return process.env.REACT_APP_IMAGEN_ROUTE_LOCAL
        case 'DEV':    return process.env.REACT_APP_IMAGEN_ROUTE_DEV
        case 'PRO':    return process.env.REACT_APP_IMAGEN_ROUTE_PRO
        default: console.error('Entorno mal configurado')
    }
}

export function getAuth() {
    const jwt = sessionStorage.getItem('jwt')
    return {headers: {'Authorization': `Bearer ${jwt}`}}
}

export function permisoAdecuado(permisos, accion) {
    switch(accion) {
        case 'ver': return permisos.ver
        case 'editar': return permisos.editar
        case 'nuevo': return permisos.crear
    }
}

export function abreCierraMenu () {
    const bodyElement = document.querySelector('body')
    bodyElement.className = (bodyElement.className === 'app is-collapsed') ? 'app' : 'app is-collapsed'
  }

export function toastAlert (content) {
  swal.fire({
    title: 'Acción realizada con exito',
    text: content,
    type: 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    background: '#f5f5f5'
});
}