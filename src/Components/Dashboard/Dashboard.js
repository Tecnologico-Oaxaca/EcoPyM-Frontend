import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineSegment } from "react-icons/md";
import "./Dashboard.css"
import { PiUserThin } from "react-icons/pi";
import { Link } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';



function Dashboard() {

  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;
  const [isOpen, setIsOpen] = useState(false);

  const empleados = [
    { id: 1, nombre: "Froylan Martinez", empresa: "Santa Lucia del camino", imgSrc: "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, nombre: "Rosa Martinez", empresa: "Oasis Organic Inc.", imgSrc: "https://images.unsplash.com/photo-1578611097442-e2e8a1e98c6a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, nombre: "David Rodriguez", empresa: "New York Finest Fruits", imgSrc: "https://images.unsplash.com/photo-1562087926-662f8573327b?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const data = {
  labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Crecimiento Anual',
      data: [20000, 45000, 30000, 50000, 20000, 50000, 70000, 67542],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.4,
      pointBackgroundColor: '#fff'
    }
  ]
};

const options = {
  plugins: {
    tooltip: {
      enabled: true,
      position: 'nearest',
      callbacks: {
        label: function(tooltipItem) {
          return `$${tooltipItem.raw.toLocaleString()}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value, index, values) {
          return '$' + value.toLocaleString();
        }
      }
    }
  },
  elements: {
    point: {
      radius: 5,
      hoverRadius: 8
    }
  }
};




const data2 = {
  labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
  datasets: [
    {
      label: 'Mes pasado',
      data: [4000, 3000, 4000, 5000, 4087],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      tension: 0.4,
      pointBackgroundColor: '#fff'
    },
    {
      label: 'Este mes',
      data: [6500, 5500, 7500, 8500, 7506],
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.4,
      pointBackgroundColor: '#fff'
    }
  ]
};

const options2 = {
  plugins: {
    tooltip: {
      enabled: true,
      position: 'nearest'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};


  return (
    <div className='dashboard-container-total'>
      <div className='dashboard-container'>
        <MdOutlineSegment className="stock-icono-classname-lines" />
        <div className='dashboard-container-header'>
          <div className='dashboard-question'>
            <h2>¿Cómo va el negocio?</h2>
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
        </div>
        {/* Sección de cuadros blancos ahora debajo del header */}
        <div className='dashboard-container-seccion1'>
          <div className='dashboard-container-ingreso'>
            <p className='dashbard-container-info'>Ingresos Semanales</p>
            <p className='dashbard-container-data'>$8,357.00</p>
            <Link to="/informe-financiero" className='dashboard-container-vermas'>
              Informe financiero
            </Link>
          </div>
          <div className='dashboard-container-perdidos'>
            <p className='dashbard-container-info'>Productos perdidos</p>
            <p className='dashbard-container-data'> 3%</p>
            <Link to="/informe-financiero" className='dashboard-container-vermas'>
              Informe de perdidas
            </Link>
          </div>
          <div className='dashboard-container-rendimiento'>
            <p className='dashbard-container-info'>Rendimiento</p>

            <div class="semicircle-container">
                <div class="semicircle">
                    <div class="semicircle-fill"></div>
                </div>
                <p class="dashboard-percentage">84%</p>
            </div>

          </div>
        </div>
      </div>




      <div className='dashboard-container-section2'>
        <div className='dashboard-container-personal'>

          <p className='dashbard-container-info'>Empleados Destacados</p>
              <ul className="lista-empleados">
                  {empleados.map(empleado => (
                      <li key={empleado.id} className="empleado">
                          <img src={empleado.imgSrc} alt={empleado.nombre} />
                          <div className="info-empleado">
                              <p className='dashboard-name-employee'>{empleado.nombre}</p>
                              <p>{empleado.empresa}</p>
                          </div>
                          <div className="iconos-acciones">
                              <button className="icono"><i className="fa fa-eye"></i></button>
                              <button className="icono"><i className="fa fa-star"></i></button>
                              <button className="icono"><i className="fa fa-pencil-alt"></i></button>
                              <button className="icono"><i className="fa fa-ellipsis-h"></i></button>
                          </div>
                      </li>
                  ))}
              </ul>
              <Link to="/informe-financiero" className='dashboard-container-vermas'>
              Ver mas empleados
            </Link>

        </div>
        <div className='dashboard-container-grafica1'>
        <Line data={data} options={options} />

        </div>

      </div>



      <div className='dashboard-container-section3'>
  <div className='dashbard-container-grafica2'> 
    <Line data={data2} options={options2} />
  </div>
  <div className='dashbard-container-card1'> 
        <p className='dashbard-container-data'>23</p>
        <p className='dashbard-container-info'>Ventas</p>
  </div>
  <div className='dashbard-container-card1'> 
        <p className='dashbard-container-data'>$2,470</p>
        <p className='dashbard-container-info'>Ganancias Netas</p>
  </div>
  <div className='dashbard-container-card1'> 
        <p className='dashbard-container-data'>$850</p>
        <p className='dashbard-container-info'>Gastos</p>
  </div>
</div>







    </div>
  )
}

export default Dashboard