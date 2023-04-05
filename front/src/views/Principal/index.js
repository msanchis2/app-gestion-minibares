import { Outlet } from "react-router-dom";
import MenuLateral from "../MenuLateral";
import MenuSuperior from "../MenuSuperior"
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import React, { useEffect } from 'react';
import { getPermisosEnPagina } from '../../Utils'

const Principal = () => {
  const {isLogged, permisosUsuario} = useUser();
  const navigate = useNavigate();
  const permisos = getPermisosEnPagina(permisosUsuario, 'Panel')

  useEffect(() => {
    if (!isLogged) { navigate("/login"); }
  }, [isLogged]);

  return (isLogged && permisos.ver) ? (
    <div>
      <MenuLateral />
      <div className="page-container">
          <MenuSuperior />
          <main className='main-content bgc-grey-100'>
            <div id='mainContent'>
              <div id='full-container'>
                <Outlet />
              </div>
            </div>
          </main>
        <Footer />
      </div>
    </div>
  ) : (
    
      <Outlet />
    
  )
};

export default Principal;