import React,{ useState }  from 'react'
import "./ModalPay.css"
import { FcCurrencyExchange } from "react-icons/fc";


function ModalPay({ closeModalCobro, total }) {
    const [value, setValue] = useState("");
    const receivedValue = parseFloat(value) || 0;
    const totalToPay = parseFloat(total);
    const change = receivedValue - totalToPay;


    const handleChange = (e) => {
        setValue(e.target.value);
      };
    return (
        <>
          <div className="ModalPay-overlay" onClick={closeModalCobro}></div>
          <div className='ModalPayContainer'>
            <p className='ModalPay-title'>Venta realizada con éxito</p>
            <FcCurrencyExchange className='ModalPay-icono' />
            <div className="sales-summary">
                
                <div className="sales-summary-item">
                    <span>Total a pagar: </span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="sales-summary-item iva-item">
                    <span>Recibí</span>
                    <input className='ModalPay-recibo '
                        type="text"
                        value={value}
                        onChange={handleChange}
                    />
                </div>
                <div className="sales-summary-total">
                    <span>Cambio </span>
                    <span>${change.toFixed(2)}</span>
                </div>
            </div>
              
                                    
                        
            <div className='ModalPay-button'>
                <button className='products-button-aceptar' onClick={closeModalCobro}>Cobrar</button>
            </div>     
          </div>
        </>
    );
}

export default ModalPay
