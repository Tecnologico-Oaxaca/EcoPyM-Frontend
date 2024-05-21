import React, { useState } from 'react';
import "./Company.css";
import Map from '../Map/Map';
import { FaCamera } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { SiMobxstatetree } from "react-icons/si";
import { PiCity } from "react-icons/pi";
import { SiOpenstreetmap } from "react-icons/si";
import { FaChevronCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';

function Company() {


  const [CompanyName, setCompanyName] = useState("");
  const [CompanyOpenTime, setCompanyOpenTime] = useState("");
  const [CompanyClose, setCompanyClose] = useState("");
  const [CompanySector, setCompanySector] = useState("");
  const [CompanyState, setCompanyState] = useState("");
  const [CompanyDistrict, setCompanyDistrict] = useState("");
  const [CompanyCity, setCompanyCity] = useState("");
  const [CompanyStreet, setCompanyStreet] = useState('');
  const [notification, setNotification] = useState({ show: false, message: "" });
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const GoToOwner = () => {
    navigate('/');
  };

  const OwnerhandleClick = (e) => {
    e.preventDefault();

    if (!CompanyName || !CompanySector || !CompanyState || !CompanyDistrict || !CompanyCity || !CompanyStreet) {
      setNotification({ show: true, message: "Completa tus datos, por favor." });
    } else {
      setPasswordError('');
      navigate('/registro/miNegocio');
    }
  };

  const handleLocationChange = (location) => {
    console.log(location);
    setCompanyState(location.state || "");
    setCompanyDistrict(location.district || "");
    setCompanyCity(location.city || "");
    setCompanyStreet(location.street || "");
  };
  


  return (
    <div>
      <div className='Company-container-header'>
        {notification.show &&
          <Notification
            message={notification.message}
            show={notification.show}
            onClose={() => setNotification({ show: false, message: "" })}
          />
        }
        <div className='company-container-seccion2'>
          <div className="company-container-img">
            <button className="company-button-img">
              <FaCamera className="company-icon-camara" />
            </button>
          </div>
          <div className="company-Content-form">
            <form className="company-main-form">
              <p className="company-title">Datos de mi negocio</p>
              <hr className='company-line-title'></hr>
              <div className="company-inputGroups-container">
                <div className="company-inputGroup">
                  <label htmlFor="companyName">Nombre</label>
                  <div className="company-input-container">
                    <input
                      value={CompanyName}
                      type="text"
                      id="companyName"
                      placeholder="Tienda Azul"
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                    <CiShop className="owner-input-Icon" />
                  </div>
                </div>
                <div className="company-inputGroup">
                  <label htmlFor="companySector">Sector:</label>
                  <div className="company-input-container">
                    <CiShoppingBasket className="company-input-Icon" />
                    <input
                      value={CompanySector}
                      type="text"
                      id="companySector"
                      placeholder="Abarrotes"
                      onChange={(e) => setCompanySector(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="company-inputGroups-container">
                <div className="company-inputGroup">
                  <label htmlFor="companyOpenTime">Hora de apertura</label>
                  <div className="company-input-container">
                    <input
                      value={CompanyOpenTime}
                      type="time"
                      id="companyOpenTime"
                      placeholder="8:00 AM"
                      onChange={(e) => setCompanyOpenTime(e.target.value)}
                      required
                    />
                    <CiShop className="owner-input-Icon" />
                  </div>
                </div>
                <div className="company-inputGroup">
                  <label htmlFor="CompanyClose">Hora de cierre:</label>
                  <div className="company-input-container">
                    <CiShoppingBasket className="company-input-Icon" />
                    <input
                      value={CompanyClose}
                      type="time"
                      id="CompanyClose"
                      placeholder="8:00 PM"
                      onChange={(e) => setCompanyClose(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="company-inputGroup">
                <label htmlFor="companyState">Estado</label>
                <div className="company-input-container">
                  <SiMobxstatetree className="company-input-Icon" />
                  <input
                    type="text"
                    id="companyState"
                    value={CompanyState}
                    onChange={(e) => setCompanyState(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="company-inputGroup">
                <label htmlFor="companyDistrict">Municipio:</label>
                <div className="company-input-container">
                  <SiMobxstatetree className="company-input-Icon" />
                  <input
                    value={CompanyDistrict}
                    type="text"
                    id="companyDistrict"
                    onChange={(e) => setCompanyDistrict(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="company-inputGroups-container">
                <div className="company-inputGroup">
                  <label htmlFor="companyCity">Colonia:</label>
                  <div className="company-input-container">
                    <PiCity className="company-input-Icon" />
                    <input
                      value={CompanyCity}
                      type="text"
                      id="companyCity"
                      onChange={(e) => setCompanyCity(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="company-inputGroup">
                  <label htmlFor="companyStreet">Calle:</label>
                  <div className="company-input-container">
                    <SiOpenstreetmap className="company-input-Icon" />
                    <input
                      value={CompanyStreet}
                      type="text"
                      id="companyStreet"
                      onChange={(e) => setCompanyStreet(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              {passwordError && <div className="owner-password-error">{passwordError}</div>}
              <div className="owner-buttons">
                <button type="submit" className="owner-submit-button" id='owner-button-cancelar' onClick={GoToOwner}>
                  Cancelar <FaChevronCircleRight className="owner-arrow-Icon" />
                </button>
                <button type="submit" className="owner-submit-button" id='owner-button-siguiente' onClick={OwnerhandleClick}>
                  Siguiente <FaChevronCircleRight className="owner-arrow-Icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='company-container-seccion1'>
          <Map onLocationChange={handleLocationChange}></Map>
        </div>
      </div>
    </div>
  )
}

export default Company;
