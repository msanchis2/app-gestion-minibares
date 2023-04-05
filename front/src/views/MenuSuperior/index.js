import useUser from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { abreCierraMenu, getImagenBasePath } from '../../Utils';

const MenuSuperior = () => {
    const {isLogged, logout, dataUsuario, nombreEmpresa} = useUser()
    const navigate = useNavigate();
    const handleLogout = e => {
      e.preventDefault()
      navigate("/login");
      logout()
    }

    return isLogged ? (
      <div className="header navbar">
        <div className="header-container">
          <ul className="nav-left">
            <li>
              <a className="sidebar-toggle" href="javascript:void(0);" onClick={abreCierraMenu}>
                <i className="ti-menu"></i>
              </a>
            </li>
          </ul>
          <ul className="nav-right">
            <li>
              <div className="mt-3 pt-1">{nombreEmpresa}</div>
            </li>
            <li className="notifications dropdown" style={{display: 'none'}}>
              <span className="counter bgc-red">3</span>
              <a href="" className="dropdown-toggle no-after" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="ti-bell"></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1"> 
                <li className="pX-20 pY-15 bdB">
                  <i className="ti-bell pR-10"></i>
                  <span className="fsz-sm fw-600 c-grey-900">Notifications</span>
                </li>
                <li>
                  <ul className="ovY-a pos-r scrollable lis-n p-0 m-0 fsz-sm">
                    <li>
                      <a href="" className='peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100'>
                        <div className="peer mR-15">
                          <img className="w-3r bdrs-50p" src={`${getImagenBasePath()}/${dataUsuario.avatar}`} alt="" />
                        </div>
                        <div className="peer peer-greed">
                          <span>
                            <span className="fw-500">{dataUsuario.name}</span>
                            <span className="c-grey-600">liked your <span className="text-dark">post</span>
                            </span>
                          </span>
                          <p className="m-0">
                            <small className="fsz-xs">5 mins ago</small>
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="" className='peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100'>
                        <div className="peer mR-15">
                          <img className="w-3r bdrs-50p" src={`${getImagenBasePath()}/${dataUsuario.avatar}`} alt="" />
                        </div>
                        <div className="peer peer-greed">
                          <span>
                            <span className="fw-500">Moo Doe</span>
                            <span className="c-grey-600">liked your <span className="text-dark">cover image</span>
                            </span>
                          </span>
                          <p className="m-0">
                            <small className="fsz-xs">7 mins ago</small>
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="" className='peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100'>
                        <div className="peer mR-15">
                          <img className="w-3r bdrs-50p" src={`${getImagenBasePath()}/${dataUsuario.avatar}`} alt="" />
                        </div>
                        <div className="peer peer-greed">
                          <span>
                            <span className="fw-500">Lee Doe</span>
                            <span className="c-grey-600">commented on your <span className="text-dark">video</span>
                            </span>
                          </span>
                          <p className="m-0">
                            <small className="fsz-xs">10 mins ago</small>
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="pX-20 pY-15 ta-c bdT">
                  <span>
                    <a href="" className="c-grey-600 cH-blue fsz-sm td-n">View All Notifications <i className="ti-angle-right fsz-xs mL-10"></i></a>
                  </span>
                </li>
              </ul>
            </li>            
            <li className="dropdown">
              <a href="" className="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-bs-toggle="dropdown">
                <div className="peer mR-10">
                  <img className="w-2r bdrs-50p" src={`${getImagenBasePath()}/${dataUsuario.avatar}`} alt="" />
                </div>
                <div className="peer">
                  <span className="fsz-sm c-grey-900">{dataUsuario.name}</span>
                </div>
              </a>
              <ul className="dropdown-menu fsz-sm">
                <li>
                  <Link to={`usuariosform/editar/${dataUsuario.id}`} className="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                    <i className="ti-settings mR-10"></i>
                    <span>Setting</span>
                  </Link>
                </li>
                <li role="separator" className="divider"></li>
                <li onClick={handleLogout}>
                  <a href="" className="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                    <i className="ti-power-off mR-10"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    ) : 
        <div className="header-container"> 
          <div className="peers ai-c fxw-nw">
            <div className="peer">
              <div className="logo">
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/LetterH.svg/800px-LetterH.svg.png' style={{paddingLeft: '20px'}} alt="" width="50px"/>
              </div>
            </div>
            <div className="peer peer-greed">
              <h2 className="logo-text" style={{padding: '10px'}}>Hoteles</h2>
            </div>
          </div>
        </div>
}

export default MenuSuperior