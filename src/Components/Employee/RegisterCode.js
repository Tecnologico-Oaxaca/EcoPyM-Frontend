import React, { useState, useRef, useEffect } from 'react'
import { updateUser } from '../../services/apiUsersService';
import "./RegisterCode";
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import Notification from '../Notification/Notification';

function RegisterCode() {
    
    const [employeeImage, setEmployeeImage] = useState(null);
    const [Employeename, setEmployeeName] = useState("");
    const [EmployeelastName, setEmployeeLastName] = useState("");
    const [Employeeemail, setEmployeeEmail] = useState("");
    const [Employeepassword, setEmployeePassword] = useState("");
    const [Employeephone, setEmployeePhone] = useState("");
    const [ConfirmEmployeepassword, setConfirmOwnerPassword] = useState('');
    const [notification, setNotification] = useState({ show: false, message: "" });
    const [passwordError] = useState('');
    const [userId, setUserId] = useState(null); 
    const navigate = useNavigate();
    const fileInputRef = useRef();

    useEffect(() => {
        const storedData = sessionStorage.getItem('userData');
        if (storedData) {
            const userData = JSON.parse(storedData);
            setEmployeeName(userData.name || "");
            setUserId(userData.id);
        }
    }, []);


    const OwnerhandleClick = async (e) => {
        e.preventDefault();

        if (!Employeename || !EmployeelastName || !Employeephone || !Employeeemail || !Employeepassword ||!ConfirmEmployeepassword) {
            setNotification({ show: true, message: "Completa tus datos, por favor." });
        } 
        else if (Employeepassword !== ConfirmEmployeepassword) {
            setNotification({ show: true, message: "Las contraseñas no coinciden" });
            setEmployeePassword('');
            setConfirmOwnerPassword('');
        } 
        else {
            try {
                const userData = {
                  name: Employeename,
                  last_name: EmployeelastName,
                  phone: Employeephone,
                  email: Employeeemail,
                  password: Employeepassword,
                };
                await updateUser(userId,userData);
                sessionStorage.removeItem('userData');
                navigate('/Menu');
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
    const GoToLogin = () => {
        navigate('/registro');
    };




    const handleCameraClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = event => {
        const file = event.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmployeeImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setNotification({ show: true, message: "Por favor, selecciona una imagen." });
        }
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
                <button className="owner-button-img" onClick={handleCameraClick}>
                    {employeeImage ? (
                        <img 
                            src={employeeImage} 
                            alt="Imagen del Empleado" 
                            style={{ 
                                width: '8vw', 
                                height: '8vw',
                                objectFit: 'cover',
                                borderRadius: '50%'
                            }} />
                    ) : (
                        <FaCamera className="owner-icon-camara"/>
                    )}
                </button>
                <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
            </div>
            
        </div>
        <div className="owner-Content-form">
            <form className="owner-main-form">
                <p className="owner-title">Datos del Empleado</p>
                <hr className='owner-line-title'></hr>


                <div className="owner-inputGroups-container">
                    <div className="owner-inputGroup">
                        <label htmlFor="ownerName">Nombres(s):</label>
                        <div className="owner-input-container">
                            <input
                            value={Employeename}
                            type="text"
                            id="ownerName"
                            placeholder="Froylan Christofer"
                            onChange={(e) => setEmployeeName(e.target.value)}
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
                            value={EmployeelastName}
                            type="text"
                            id="ownerLastName"
                            placeholder="Martinez Carlos"
                            onChange={(e) => setEmployeeLastName(e.target.value)}
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
                        value={Employeephone}
                        placeholder="951 - 253 - 6797"
                        onChange={(e) => setEmployeePhone(e.target.value)}
                        required
                        />
                    </div>
                </div>
                <div className="owner-inputGroup">
                    <label htmlFor="ownerEmail">Correo Electronico:</label>
                    <div className="owner-input-container">
                        <BsEnvelope className="owner-input-Icon" />
                        <input
                        value={Employeeemail}
                        type="email"
                        id="ownerEmail"
                        placeholder="usuario@dominio.com"
                        onChange={(e) => setEmployeeEmail(e.target.value)}
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
                            value={Employeepassword}
                            type="password"
                            id="ownerPassword"
                            placeholder="********"
                            onChange={(e) => setEmployeePassword(e.target.value)}
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
                                value={ConfirmEmployeepassword}
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
                    <button type="submit" className="owner-submit-button" id='owner-button-cancelar' onClick={GoToLogin}>
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

export default RegisterCode
