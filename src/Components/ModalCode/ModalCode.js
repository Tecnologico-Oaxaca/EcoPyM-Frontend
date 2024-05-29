import React, { useState } from 'react';
import { verifyCode } from '../../services/apiUsersService';
import { FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import "./ModalCode.css";

function ModalCode({ onClose, title, msg }) {
    const [code, setCode] = useState("");
    const [notification, setNotification] = useState({ show: false, message: "" });
    const navigate = useNavigate();

    // Aqui obtienes el codigo
    const onYes = async (e) => {
        e.preventDefault(); 
        if (!code) {
            setNotification({ show: true, message: "Todos los campos deben estar completos." });
            return;
        }
        try {
            const verifyData = {
              code: code
            };
            const response = await verifyCode(verifyData);
            sessionStorage.setItem('userData', JSON.stringify(response.data));
            navigate('/code/');
        } catch (error) {
            if (error instanceof Error) {
              setNotification({ show: true, message: error.message });
            } else {
              Object.values(error).flat().forEach(msg => {
                setNotification({ show: true, message: msg }); 
              });
            }
        }
    };

    return (
        <div className='ModalCode-overlay'>
            {notification.show &&
              <Notification
                message={notification.message}
                show={notification.show}
                onClose={() => setNotification({ show: false, message: "" })}
              />
            }
            <div className='ModalCode-container'>
                <div className='ModalCheck-container-form'>
                    <p className='ModalCode-employee-info'>{title}</p> 
                    <textarea
                        value={code}
                        id="codeInput"  
                        className="ModalCode-textarea" 
                        placeholder={msg} 
                        rows="4" 
                        cols="50" 
                        onChange={(e) => setCode(e.target.value)}
                    ></textarea>
                    <div className="ModalCheck-buttons">
                        <button type="submit" className="ModalCheck-submit-button" id='ModalCheck-button-Si' onClick={onYes} >
                            <FaCheck className="ModalCheck-arrow-Icon"/> Aceptar
                        </button> 
                        <button type="button" className="ModalCheck-submit-button" id='ModalCheck-button-No' onClick={onClose} >
                            <FaTimes className="ModalCheck-arrow-Icon"/>Cancelar
                        </button>   
                    </div>                         
                </div>
            </div>
        </div>
    );
}

export default ModalCode;
