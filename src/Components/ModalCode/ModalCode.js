import React, { useState }from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import "./ModalCode.css"

function ModalCode({ onClose }) {

    const [code, setCode] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const navigate = useNavigate();

    //Se va a cambiar por la consulta a la api
    const Codigos = ["1234", "5678", "91011"];


    //Aqui Obtienes el codigo
    const onYes = () => {

        if (Codigos.includes(code)) {
            //ESTO SE EJECUTA SI EL CODIGO SI EXISTE
            console.log("Código:", code);
            navigate('/Code');
        } else {
            //ESTO PASA SI EL CODIGO NO EXISTE
            console.log("Código:", code);
            setNotificationMessage("Tu código no existe");
            setShowNotification(true);
        }
    };


  return (
    <div className='ModalCode-overlay'>
        <Notification message={notificationMessage} show={showNotification} onClose={() => setShowNotification(false)} />
        <div className='ModalCode-container'>
            <div className='ModalCheck-container-form'>
                <p className='ModalCode-employee-info'>Escribe el código que se te proporciono</p> 
                <textarea
                    id="codeInput"  
                    className="ModalCode-textarea" 
                    placeholder="Ingresa el codigo" 
                    rows="4" 
                    cols="50" 
                    onChange={(e) => setCode(e.target.value)}
                ></textarea>
                <div className="ModalCheck-buttons">
                    <button type="submit" className="ModalCheck-submit-button" id='ModalCheck-button-Si' onClick={onYes} >
                        <FaCheck className="ModalCheck-arrow-Icon"/> Aceptar
                    </button> 
                    <button type="submit" className="ModalCheck-submit-button" id='ModalCheck-button-No' onClick={onClose} >
                        <FaTimes className="ModalCheck-arrow-Icon"/>Cancelar
                    </button>   
                </div>                         
            </div>
        </div>
    </div>
  )
}

export default ModalCode
