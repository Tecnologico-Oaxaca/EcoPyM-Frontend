import React, { useState } from 'react';
import { createUsers } from '../../services/apiUsersService';

import "./Owner.css";
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import Notification from '../Notification/Notification';

function Owner() {

    const [Ownername, setOwnerName] = useState("");
    const [OwnerlastName, setOwnerLastName] = useState("");
    const [Owneremail, setOwnerEmail] = useState("");
    const [Ownerpassword, setOwnerPassword] = useState("");
    const [Ownerphone, setOwnersetPhone] = useState("");
    const [ConfirmOwnerpassword, setConfirmOwnerPassword] = useState('');
    const [notification, setNotification] = useState({ show: false, message: "" });
    const [passwordError] = useState('');
    const navigate = useNavigate();


    const OwnerhandleClick = async (e) => {
        e.preventDefault();

        if (!Ownername || !OwnerlastName || !Ownerphone || !Owneremail || !Ownerpassword ||!ConfirmOwnerpassword) {
            setNotification({ show: true, message: "Completa tus datos, por favor." });
        } 
        else if (Ownerpassword !== ConfirmOwnerpassword) {
            setNotification({ show: true, message: "Las contraseñas no coinciden" });
            setOwnerPassword('');
            setConfirmOwnerPassword('');
        } 
        else {

            try {
                const userdata = {
                  name: Ownername,
                  last_name: OwnerlastName,
                  phone: Ownerphone,
                  email: Owneremail,
                  password: Ownerpassword,
                  branch_id: sessionStorage.getItem('branchId'),
                  role_id: 1
                };
                await createUsers(userdata);
                navigate('/registro/MisEmpleados');
              } catch (error) {
                if (error instanceof Error) {
                  setNotification({ show: true, message: error.message });
                } else {
                  Object.values(error).flat().forEach(msg => {
                    setNotification({ show: true, message: msg }); 
                  });
                }
              }
        }
    };
    const GoToEmployee = () => {
        navigate('/registro/MisEmpleados');
    };


    

  return (
    <div className="owner-container">
        {notification.show && 
                <Notification 
                  message={notification.message} 
                  show={notification.show} 
                  onClose={() => setNotification({ show: false, message: "" })}
                />
            }
        <div className="owner-container-header">
            <div className="owner-container-img">
                <button className="owner-button-img">
                    <FaCamera  className="owner-icon-camara"/>
                </button>
            </div>
            
        </div>
        <div className="owner-Content-form">
            <form className="owner-main-form">
                <p className="owner-title">Datos del propietario</p>
                <hr className='owner-line-title'></hr>


                <div className="owner-inputGroups-container">
                    <div className="owner-inputGroup">
                        <label htmlFor="ownerName">Nombres(s):</label>
                        <div className="owner-input-container">
                            <input
                            value={Ownername}
                            type="text"
                            id="ownerName"
                            placeholder="Froylan Christofer"
                            onChange={(e) => setOwnerName(e.target.value)}
                            required
                            />
                            <FaRegUser className="owner-input-Icon" />
                        </div>
                    </div>
                    <div className="owner-inputGroup">
                        <label htmlFor="ownerLastName">Apellidos:</label>
                        <div className="owner-input-container">
                            <FaRegUser className="owner-input-Icon" />
                            <input
                            value={OwnerlastName}
                            type="text"
                            id="ownerLastName"
                            placeholder="Martinez Carlos"
                            onChange={(e) => setOwnerLastName(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className="owner-inputGroup">
                    <label htmlFor="ownerPhone">Telefono:</label>
                    <div className="owner-input-container">
                        <BsTelephone className="owner-input-Icon" />
                        <input
                        type="tel"
                        id="ownerPhone"
                        value={Ownerphone}
                        placeholder="951 - 253 - 6797"
                        onChange={(e) => setOwnersetPhone(e.target.value)}
                        required
                        />
                    </div>
                </div>
                <div className="owner-inputGroup">
                    <label htmlFor="ownerEmail">Correo Electronico:</label>
                    <div className="owner-input-container">
                        <BsEnvelope className="owner-input-Icon" />
                        <input
                        value={Owneremail}
                        type="email"
                        id="ownerEmail"
                        placeholder="usuario@dominio.com"
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        required
                        autoComplete="email"
                        />
                    </div>
                </div>
                <div className="owner-inputGroups-container">
                    <div className="owner-inputGroup">
                        <label htmlFor="ownerPassword">Contraseña:</label>
                        <div className="owner-input-container">
                            <MdLockOutline className="owner-input-Icon" />
                            <input
                            value={Ownerpassword}
                            type="password"
                            id="ownerPassword"
                            placeholder="********"
                            onChange={(e) => setOwnerPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                            />
                        </div>
                    </div>
                    <div className="owner-inputGroup">
                        <label htmlFor="confirmOwnerPassword">Confirmar Contraseña:</label>
                        <div className="owner-input-container">
                            <MdLockOutline className="owner-input-Icon" />
                            <input
                                value={ConfirmOwnerpassword}
                                type="password"
                                id="confirmOwnerPassword"
                                placeholder="********"
                                onChange={(e) => setConfirmOwnerPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>
                </div>  
                {passwordError && <div className="owner-password-error">{passwordError}</div>}
                <div className="owner-buttons">
                    <button type="submit" className="owner-submit-button" id='owner-button-cancelar' onClick={GoToEmployee}>
                        Cancelar <FaChevronCircleRight className="owner-arrow-Icon"/>
                    </button>
                    <button type="submit" className="owner-submit-button" id='owner-button-siguiente' onClick={OwnerhandleClick}>
                        Siguiente <FaChevronCircleRight className="owner-arrow-Icon"/>
                    </button>
                </div>              
            </form>
        </div>
    </div>
  )
}

export default Owner;
