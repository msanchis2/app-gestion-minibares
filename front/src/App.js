//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import PanelAdministrador from './views/PanelAdministrador'
import Principal from './views/Principal'
import Empresas from './views/Empresas'
import Empresasform from './views/Empresas/empresasform'
import Hoteles from './views/Hoteles'
import Hotelesform from './views/Hoteles/hotelesform'
import Habitaciones from './views/Habitaciones'
import Habitacionesform from './views/Habitaciones/habitacionesform'
import Productosform from './views/Productos/productosform'
import Productos from './views/Productos'
import Usuarios from './views/Usuarios'
import Usuariosform from './views/Usuarios/usuariosform'
import Inventarioform from './views/Inventario/inventarioform'
import Login from './views/Login'
import Inventario from './views/Inventario'
import Permisos from './views/Permisos'
import NoPage from './views/NoPage'
import GenerarHabitaciones from './views/GenerarHabitaciones';
import ProductosDefecto from './views/productosDefecto'
import Posteos from './views/Posteos'
import Roles from './views/Roles'
import Rolesform from './views/Roles/rolesform'
import Informes from './views/Informes'
import ResumenVentas from './views/Informes/resumenventas'
//import Maestras from './views/Maestras'
//import TablaEjemplo from "./views/TablaEjemplo"

function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />}>
          <Route index element={<PanelAdministrador />} />
          <Route path="empresas" element={<Empresas />} />
          <Route path='empresasform/:accion/:id?' element={<Empresasform />} />
          <Route path="hoteles" element={<Hoteles />} />
          <Route path="hotelesform/:accion/:id?" element={<Hotelesform />} />
          <Route path="habitaciones" element={<Habitaciones />} />
          <Route path="habitacionesform/:accion/:id?" element={<Habitacionesform />} />
          <Route path="productos" element={<Productos />} />
          <Route path="productosform/:accion/:id?" element={<Productosform />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuariosform/:accion/:id?" element={<Usuariosform />} />
          <Route path="Permisos" element={<Permisos />} />
          <Route path="Login" element={<Login />} />
          <Route path="Inventario" element={<Inventario />} />
          <Route path="inventarioform/:accion/:id?" element={<Inventarioform />} />
          <Route path="generarhabitaciones" element={<GenerarHabitaciones />} />
          <Route path="productosDefecto" element={<ProductosDefecto />} />
          <Route path="posteos" element={<Posteos />} />
          <Route path="Roles" element={<Roles />} />
          <Route path="rolesform/:accion/:id?" element={<Rolesform />} />
          <Route path="Informes" element={<Informes />} />
          <Route path="resumenventas" element={<ResumenVentas />} />
          {/*<Route path="Maestras" element={<Maestras />} />*/}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
