import axios from "axios"
import Swal from 'sweetalert2'
import { getBasePath, getAuth } from '../Utils'

const eliminarRegistro = async (id, tabla) => { 
    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Estás seguro de que deseas eliminar este registro de ${tabla} permanentemente?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.value) {
            await axios.delete(`${getBasePath()}/${tabla}/${id}`, getAuth())
            .then(response =>{
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El elemento ha sido eliminado con éxito.',
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
export default eliminarRegistro