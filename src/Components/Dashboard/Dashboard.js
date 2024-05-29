import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineSegment } from "react-icons/md";
import "./Dashboard.css"
import { PiUserThin } from "react-icons/pi";


function Dashboard() {

  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='dashboard-container-total'>    
    <div className='dashboard-container'>
      <MdOutlineSegment className="stock-icono-classname-lines" />
      <div className='dashboard-container-header'>

        <div className='dashboard-question'>
          <h2>¿Como va el negocio?</h2>
        </div>

        <div className='dashboard-calendar'>
        <button onClick={() => setIsOpen(!isOpen)}>Selecciona una fecha</button>
        {isOpen && (
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                selected={startDate}
                onChange={update => {
                  setDateRange(update);
                }}
                inline
                todayButton="Hoy"
                dayClassName={date =>
                  startDate && endDate && date >= startDate && date <= endDate ? "highlight-range" : undefined
                }
              />
            )}
        </div>
        <div className="dasbooard-container-user">
            <p className='stock-user'>Rosa</p>
            <PiUserThin className='stock-icono-classname' />
        </div>


        <div className='dashboard-container-seccion1'>
          <div className='dashboard-container-ingreso'>

          </div>
          <div className='dashboard-container-perdidos'>

          </div>
          <div className='dashboard-container-rendimiento'>

          </div>

        </div>

      </div>



    </div>
    </div>
  )
}

export default Dashboard
