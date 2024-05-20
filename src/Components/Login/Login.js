import React from 'react'
import logo from "../../img/LogoEcoPyM.png";
import { BsEnvelope } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import "./Login.css";
import { useNavigate } from 'react-router-dom';



function Login() {

    const navigate = useNavigate();

    const GoToRegistration = () => {
        navigate('/registro');
    };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-section1"></div>
        <div className="login-section2"></div>
        <div className="login-section3"></div>
        <div className="login-section4"></div>
      </div>
      <div className="login-right">
        <div className="login-content">
          <div className="login-content-img"><img src={logo} alt="EcoPyM Logo" className="login-logo" /></div>
          <h1 className="login-tittle">Bienvenido a EcoPyM!</h1>
          <p className="login-message">
            Se parte de nuestra comunidad de emprendedores
          </p>
          <form>
            <div className="login-form-content">
              <div className="login-input-group">
                <label htmlFor="userEmail">Correo Electrónico:</label>
                <div className="login-input-container">
                  <BsEnvelope className="login-input-icon" />
                  <input
                    type="email"
                    id="userEmail"
                    placeholder="usuario@dominio.com"
                    required
                  />
                </div>
              </div>
              <div className="login-input-group">
                <label htmlFor="userPassword">Contraseña:</label>
                <div className="login-input-container">
                  <MdLockOutline className="login-input-icon" />
                  <input
                    type="password" id="userPassword"  placeholder="***************" required
                  />
                </div>
              </div>
            </div>
            <a className="login-olvidar-contraseña-a" href="/forgot-password">¿Olvidaste tu contraseña?</a>
            <button className="login-ingresar-button" type="submit" >Ingresar</button>
            <div className="login-buttons-container">
                <button className="login-registro-button" type="button" onClick={GoToRegistration}>Registrarme</button>
                <button className="login-codigo-button" type="button" >Tengo un código</button>
            </div>
            </form>
        </div>
      </div>
      
      
    </div>
  )
}

export default Login;