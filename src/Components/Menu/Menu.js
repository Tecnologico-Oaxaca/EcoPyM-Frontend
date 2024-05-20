import React from 'react';
import {Link, useLocation } from 'react-router-dom';
import logo from "../../img/LogoEcoPyM.png";
import "./Menu.css"

function Menu({sections}) {

    const location = useLocation();
    // Función para determinar si una sección está activa basada en la ruta actual
    const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className='SignIn-Container'>
        <img src={logo} className="SignIn-logo" alt="Logo de EcoPyM" />
        <h1 className="SignIn-EcoPyM">EcoPyM</h1>
        <ul className='SignIn-Sections'>
            {sections.map(({ id, path, title, Icon }, index) => (
                <li key={id}>
                    <Link to={path} className={`SignIn-nav ${isActive(path)}`}>
                        <span><Icon className='SignIn-Icon'/> {title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Menu;