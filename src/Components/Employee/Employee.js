import React, { useState } from 'react';
import "./Employee.css";
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import { TfiMoney } from "react-icons/tfi";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardControlKey } from "react-icons/md";
import Notification from '../Notification/Notification';
import CalendarDays from '../CalendarDays/CalendarDays';
import { FloatingWhatsApp } from 'react-floating-whatsapp'


function Employee() {


    const [Ownername, setOwnerName] = useState("");
    const [OwnerRol, setOwnerRol] = useState("");
    const [OwnerSalary, setOwnerSalary] = useState("");
    const [OwnerShift, setOwnerShift] = useState("");
    const [notification, setNotification] = useState({ show: false, message: "" });
    const navigate = useNavigate();


    const OwnerhandleClick = (e) => {
        e.preventDefault();

        if (!Ownername || !OwnerRol || !OwnerSalary || !OwnerShift) {
            setNotification({ show: true, message: "Completa tus datos, por favor." });
        }
        else{
            //AQUI RECOLECTO LOS VALORES DE LOS INPUTS
            console.log("Nombre del Empleado:", Ownername);
            console.log("Rol del propietario:", OwnerRol);
            console.log("Salario:", OwnerSalary);
            console.log("Turno:", OwnerShift);
        }
    };
    const GoToMenu = () => {
        navigate('/registro/Menu');
    };


  return (

    <div className='employee-container'>
        <div className="employee-container-section1">
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
                    <p className="owner-title">¿Tienes empleados?</p>
                    <p className='employee-info'>Al registrarlos se generara un codigo que debes compartirles</p>
                    <hr className='owner-line-title'></hr>


                    
                        <div className="employee-inputGroup">
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
                        <div className="employee-inputGroup">
                            <label htmlFor="ownerRol">Rol:</label>
                            <div className="owner-input-container">
                                <MdKeyboardControlKey className="owner-input-Icon" />
                                <input
                                value={OwnerRol}
                                type="text"
                                id="ownerRol"
                                placeholder="SELECCIONE ROL"
                                onChange={(e) => setOwnerRol(e.target.value)}
                                required
                                />
                            </div>
                        </div>
                    
                        <div className="employee-inputGroup">
                            <label htmlFor="ownerSalary">Salario:</label>
                            <div className="owner-input-container">
                                <TfiMoney className="owner-input-Icon" />
                                <input
                                value={OwnerSalary}
                                type="text"
                                id="ownerSalary"
                                placeholder="200"
                                onChange={(e) => setOwnerSalary(e.target.value)}
                                required
                                />
                            </div>
                        </div>
                        <div className="employee-inputGroup">
                            <label htmlFor="OwnerShift">Turno:</label>
                            <div className="owner-input-container">
                                <MdKeyboardControlKey className="owner-input-Icon" />
                                <input
                                    value={OwnerShift}
                                    type="text"
                                    id="OwnerShift"
                                    placeholder="SELECCIONE TURNO"
                                    onChange={(e) => setOwnerShift(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    <div className="App">
                        <p className='employee-info-days'>Días que trabajá tu empleado</p>
                        <CalendarDays />
                    </div>
                    <div className="owner-buttons">
                        <button type="submit" className="owner-submit-button" id='owner-button-cancelar' onClick={GoToMenu}>
                            Cancelar <FaChevronCircleRight className="owner-arrow-Icon"/>
                        </button>
                        <button type="submit" className="owner-submit-button" id='owner-button-siguiente' onClick={OwnerhandleClick}>
                            Siguiente <FaChevronCircleRight className="owner-arrow-Icon"/>
                        </button>
                    </div>              
                </form>
            </div>
        </div>
        <div className='employee-container-code-section2'>
            <div className="employee-container-code">
                <p className='employee-info-days'>Comparte el codigo con tu empleado</p>
                <div className='employee-container-center'>
                    
                </div>
                <FloatingWhatsApp/>
            </div>
        </div> 
    </div>   
  )
}

export default Employee
