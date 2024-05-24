import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../img/LogoEcoPyM.png";
import "./MenuHome.css";

function MenuHome({ sections1, sections2 }) {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate(sections1[0]?.path);
    }
  }, [location.pathname, navigate, sections1]);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className='MenuHome-Container'>
      <img src={logo} className="MenuHome-logo" alt="Logo de EcoPyM" />
      <h1 className="MenuHome-EcoPyM">EcoPyM</h1>
      <ul className='MenuHome-Sections1'>
        {sections1 && sections1.map(({ id, path, title, Icon }) => (
          <li key={id} className="MenuHome-Section-Group1">
            <Link to={path} className={`MenuHome-nav ${isActive(path)}`}>
              <span><Icon className='MenuHome-Icon' /></span>
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <ul className='MenuHome-Sections2'>
        <li className="MenuHome-separator"></li>  {/* Separador visual */}
        {sections2 && sections2.map(({ id, path, title, Icon }) => (
          <li key={id} className="MenuHome-Section-Group2">
            <Link to={path} className={`MenuHome-nav ${isActive(path)}`}>
              <span><Icon className='MenuHome-Icon' /></span>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuHome;
