import React, {useState} from 'react'

const Context = React.createContext({})

export function UserContextProvider ({children}) {
  const [usuario, setUsuario] = useState(() => JSON.parse(window.sessionStorage.getItem('usuario')))
  const [permisos, setPermisos] = useState(() => JSON.parse(window.sessionStorage.getItem('permisos')))
  const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('jwt'))
  const [nombreEmpresa, setNombreEmpresa] = useState(() => window.sessionStorage.getItem('empresa'))
  const [hotelSelected, setHotelSelected] = useState(() => window.sessionStorage.getItem('hotelSelected'))
  const [hotelesUsuario, setHotelesUsuario] = useState(() => JSON.parse(window.sessionStorage.getItem('hotelesUsuario')))

  return <Context.Provider value={{
    jwt,
    setJWT,
    usuario,
    setUsuario,
    permisos,
    setPermisos,
    hotelSelected,
    setHotelSelected,
    hotelesUsuario,
    setHotelesUsuario,
    nombreEmpresa,
    setNombreEmpresa
  }}>
    {children}
  </Context.Provider>
}

export default Context