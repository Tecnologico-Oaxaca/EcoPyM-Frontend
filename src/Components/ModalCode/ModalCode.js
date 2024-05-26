import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./ModalCode.css"

function ModalCode({ onClose }) {

    const navigate = useNavigate();


    const onYes = () => {
        navigate('/Code');
    };

    

  return (
    <div className='ModalCode-overlay'>
        <div className='ModalCode-container'>
            <div className='ModalCheck-container-form'>
                <p className='ModalCode-employee-info'>Escribe el código que se te proporciono</p> 
                <textarea
                    id="codeInput"  // Un identificador único para el textarea
                    className="ModalCode-textarea"  // Clase para estilizar el textarea
                    placeholder="Ingresa el codigo"  // Texto de ayuda
                    rows="4"  // Número de filas (altura del textarea)
                    cols="50"  // Número de columnas (anchura del textarea)
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
