import {useCallback, useContext, useState} from 'react'
import Context from '../context/UserContext'
import loginService from '../services/login'
import permisosService from '../services/userPermisos'
import empresaService from '../services/userEmpresa'
import { useNavigate } from 'react-router-dom'

export default function useUser () {
  const navigate = useNavigate();
  const {jwt, setJWT, usuario, setUsuario, permisos, setPermisos, hotelSelected, setHotelSelected, hotelesUsuario, setHotelesUsuario, nombreEmpresa, setNombreEmpresa} = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  const removeStorage = () => {
    window.sessionStorage.removeItem('jwt')
    window.sessionStorage.removeItem('usuario')
    window.sessionStorage.removeItem('permisos')
    window.sessionStorage.removeItem('hotelSelected')
    window.sessionStorage.removeItem('hotelSelectednombre')
    window.sessionStorage.removeItem('hotelesUsuario')
    window.sessionStorage.removeItem('empresa')
  }

  const login = useCallback(({email, password}) => {
    setState({loading: true, error: false })
    loginService({email, password})
      .then(data => {
        const hotelDefecto = data.usuarios_hoteles.find(el => el.hotel_defecto_sn == 'S')
        setState({loading: false, error: false })
        setJWT(data.token)
        setUsuario(data.user)
        setHotelSelected(hotelDefecto.hotelId)
        setHotelesUsuario(data.usuarios_hoteles)

        window.sessionStorage.setItem('jwt', data.token)

        permisosService(data.user.rolesId).then(permisosUser => {
          setPermisos(permisosUser)
          window.sessionStorage.setItem('permisos', JSON.stringify(permisosUser))
        })
        empresaService(data.user.empresaId).then(resp => {
          setNombreEmpresa(resp)
          window.sessionStorage.setItem('empresa', resp)
        })

        window.sessionStorage.setItem('usuario', JSON.stringify(data.user))
        window.sessionStorage.setItem('hotelSelected', hotelDefecto.hotelId)
        window.sessionStorage.setItem('hotelesUsuario', JSON.stringify(data.usuarios_hoteles))

        navigate("/");
      })
      .catch(err => {
        removeStorage()
        setState({loading: false, error: true })
        console.error(err)
      })
  }, [setJWT])

  const logout = useCallback(() => {
    removeStorage()
    setJWT(null)
  }, [setJWT])

  const changeHotelSelected = (hotel) => {
    setHotelSelected(hotel.value)
    window.sessionStorage.setItem('hotelSelected', hotel.value)
    window.sessionStorage.setItem('hotelSelectednombre', hotel.label)
  }

  return {
    isLogged: Boolean(jwt),
    dataUsuario: usuario,
    permisosUsuario: permisos,
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    hotelSelected: hotelSelected,
    hotelesUsuario: hotelesUsuario,
    nombreEmpresa: nombreEmpresa,
    login,
    logout,
    changeHotelSelected
  }
} 