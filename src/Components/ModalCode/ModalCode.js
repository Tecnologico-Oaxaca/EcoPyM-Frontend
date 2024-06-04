import React, { useState } from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";
import Notification from '../Notification/Notification';
import "./ModalCode.css";

function ModalCode({ onClose, title, msg, onSubmit, placeholder }) {
    const [inputValue, setInputValue] = useState("");

    const [notification, setNotification] = useState({ show: false, message: "" });

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue) {
            setNotification({ show: true, message: "Todos los campos deben estar completos." });
            return;
        }
        try {
            await onSubmit(inputValue);  // La función onSubmit maneja lo que sucede con el valor
            onClose();  // Cerrar modal después de enviar
        } catch (error) {
            console.error("Error en el ModalCode:", error);
            setNotification({ show: true, message: error.message || "Error desconocido" });
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
                        value={inputValue}
                        id="codeInput"  
                        className="ModalCode-textarea" 
                        placeholder={placeholder || msg} 
                        rows="4" 
                        cols="50" 
                        onChange={(e) => setInputValue(e.target.value)}
                    ></textarea>
                    <div className="ModalCheck-buttons">
                        <button type="submit" className="ModalCheck-submit-button" id='ModalCheck-button-Si' onClick={handleSubmit} >
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
