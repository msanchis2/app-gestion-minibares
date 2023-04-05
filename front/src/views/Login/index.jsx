import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'

const Login = ({onLogin}) => { 
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isLoginLoading, hasLoginError, login, isLogged} = useUser()
  
    useEffect(() => {
      if (isLogged) {
        navigate("/");
        onLogin && onLogin()
      }
    }, [isLogged, onLogin]) 
  
    const handleSubmit = (e) => {
      e.preventDefault();
      login({email: email, password: password})
    };
  
    return (
      <>        
        <div className='peers ai-s fxw-nw h-100vh'>
          <div className="d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv" style={{ backgroundImage: 'url(/hotel.webp)' }}>
            <div className="pos-a centerXY">
              <div className="bgc-white bdrs-50p pos-r" style={{ width: '120px', height: '120px' }}>
                <img className="pos-a centerXY" src="/favicon.webp" alt="" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r ps">
            <section id="loginForm"  style={{ marginLeft: '20px'}}>
              <h2>Iniciar Sesión</h2>
              <form className='form' onSubmit={handleSubmit}>
                <label>Email:</label>
                  <input
                  className='form-control'
                  id="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
          
                <br/>
                <label>Password: </label>
                  <input
                    className='form-control'
                    id="pass"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                <br/>
                <button className='btn btn-primary btn-color'>Log in</button>
                <p>
                  <br />
                  <label>
                    { isLoginLoading && <strong>Comprobando credenciales...</strong> }
                    { hasLoginError && <strong style={{ color: 'red' }}>Email o contraseña incorrecto</strong> }
                  </label>
                </p>
              </form>
            </section>
          </div>
        </div>
      </>
    );
};

export default Login;