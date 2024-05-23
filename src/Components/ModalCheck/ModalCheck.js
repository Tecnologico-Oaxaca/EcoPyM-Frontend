import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import "./ModalCheck.css"

function ModalCheck({ onYes, onNo }) {
  return (
    <div className='ModalCheck-overlay'>
        <div className='ModalCheck-container'>
            <div className='ModalCheck-container-form'>
                <p employee-info>¿Desea registrar otro empleado?</p>  
                <div className="ModalCheck-buttons">
                    <button type="submit" className="ModalCheck-submit-button" id='ModalCheck-button-Si' onClick={onYes} >
                        <FaCheck className="ModalCheck-arrow-Icon"/> Aceptar
                    </button> 
                    <button type="submit" className="ModalCheck-submit-button" id='ModalCheck-button-No' onClick={onNo} >
                        <FaTimes className="ModalCheck-arrow-Icon"/>Cancelar
                    </button>   
                </div>                         
            </div>
        </div>
    </div>
  )
}

export default ModalCheck
