import React, { useState,useEffect } from 'react';
import { showRoles } from '../../services/apiRolesService';
import { showWorkShift } from '../../services/apiWorkShiftService';
import { createRegisterEmployes } from '../../services/apiRegisterEmployee';

import "./Employee.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import { TfiMoney } from "react-icons/tfi";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardControlKey } from "react-icons/md";
import Notification from '../Notification/Notification';
import CalendarDays from '../CalendarDays/CalendarDays';
import { FaRegCopy } from "react-icons/fa6";
import { FaWhatsapp } from 'react-icons/fa';
import gmailIcon from "../../img/gmail.png";
import ModalCheck from '../ModalCheck/ModalCheck';


function Employee() {

    const location = useLocation();
    const branchId = location.state?.branchId;

    const [Employeename, setEmployeeName] = useState("");
    const [EmployeeRol, setEmployeeRol] = useState("");
    const [EmployeeSalary, setEmployeeSalary] = useState("");
    const [EmployeeShift, setEmployeeShift] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [codeGenerated, setCodeGenerated] = useState(false);
    const [employeeCode, setEmployeeCode] = useState("");
    const [Rol, setRol] = useState([]);
    const [Shift, setShift] = useState([]);
    const [notification, setNotification] = useState({ show: false, message: "" });
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    //
    useEffect(() => {
        showRoles()
          .then(sectorsData => {
            setRol(sectorsData);
          })
          .catch(error => {
            setNotification({ show: true, message: "No se pudo conectar con la API" });
          });
      }, []);

      useEffect(() => {
        showWorkShift()
          .then(workShiftData => {
            setShift(workShiftData);
          })
          .catch(error => {
            setNotification({ show: true, message: "No se pudo conectar con la API" });
          });
      }, []);

      function handleDaySelection(daysIds) {
        const daysWithTrue = daysIds.map(dayId => ({
            day_id: dayId,       
            is_work_day: true
        }));
        setSelectedDays(daysWithTrue);
    }

    const EmployeehandleClick = async (e) => {
        e.preventDefault();

        if (!Employeename || !EmployeeRol || !EmployeeSalary || !EmployeeShift) {
            setNotification({ show: true, message: "Completa tus datos, por favor." });
        }
        else{
            const prefix = "EMP";
            const randomNumbers = Math.floor(Math.random() * 90000) + 1000;
            const code = prefix + randomNumbers;

            try {
                const employesData = {
                  name: Employeename,
                  role_id: EmployeeRol,
                  salary: EmployeeSalary,
                  work_shift_id: EmployeeShift,
                  password: code,
                  branch_id: branchId,
                  days: selectedDays
                };
                await createRegisterEmployes(employesData);
                setEmployeeCode(code); 
                setCodeGenerated(true);
              } catch (error) {
                if (error instanceof Error) {
                  setNotification({ show: true, message: error.message });
                } else {
                  Object.values(error).flat().forEach(msg => {
                    setNotification({ show: true, message: msg }); 
                  });
                }
              }

            //AQUI RECOLECTO LOS VALORES DE LOS INPUTS
            console.log("Nombre del Empleado:", Employeename);
            console.log("Rol del propietario:", EmployeeRol);
            console.log("Salario:", EmployeeSalary);
            console.log("Turno:", EmployeeShift);
            console.log("Días Seleccionados:", selectedDays);
            console.log("Codigo:", code);
            <ModalCheck/>
        }
    };

    const handleCopyCode = () => {
        if (codeGenerated && employeeCode) {
            navigator.clipboard.writeText(employeeCode)
                .then(() => {
                    setNotification({ show: false, message: "" });
                    setNotification({ show: true, message: "Codigo copiado al portapapeles." });
                })
                .catch(err => {
                    console.error('Error al copiar el código:', err);
                });
        }
    };

    const GoToMenu = () => {
        navigate('/registro/Propietario');
    };

    const ModalhandleClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const handleYes = () => {
        setEmployeeName("");      
        setEmployeeRol("");       
        setEmployeeSalary("");   
        setEmployeeShift("");     
        setSelectedDays([]);     
        setCodeGenerated(false);  
        setEmployeeCode("");
        
        setShowModal(false);
    };
    
    const handleNo = () => {
        setShowModal(false);
        navigate('');
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
            <div className="employee-container-header">
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
                        <div className="employee-inputGroup">
                            <label htmlFor="ownerRol">Rol:</label>
                            <div className="owner-input-container">
                                <MdKeyboardControlKey className="owner-input-Icon" />
                                <select className="employee-custom-select"
                                value={EmployeeRol}
                                id="ownerRol"
                                onChange={(e) => setEmployeeRol(e.target.value)}
                                required
                                >
                                    <option value="">SELECCIONE UN ROL</option>
                                    {Rol.map((Rol) => (
                                        <option key={Rol.id} value={Rol.id}>{Rol.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    
                        <div className="employee-inputGroup">
                            <label htmlFor="ownerSalary">Salario:</label>
                            <div className="owner-input-container">
                                <TfiMoney className="owner-input-Icon" />
                                <input
                                value={EmployeeSalary}
                                type="text"
                                id="ownerSalary"
                                placeholder="200"
                                onChange={(e) => setEmployeeSalary(e.target.value)}
                                required
                                />
                            </div>
                        </div>
                        <div className="employee-inputGroup">
                            <label htmlFor="OwnerShift">Turno:</label>
                            <div className="owner-input-container">
                                <MdKeyboardControlKey className="owner-input-Icon" />
                                <select className="employee-custom-select"
                                value={EmployeeShift}
                                id="OwnerShift"
                                onChange={(e) => setEmployeeShift(e.target.value)}
                                required
                                >
                                    <option value="">SELECCIONE UN TURNO</option>
                                    {Shift.map((Shift) => (
                                        <option key={Shift.id} value={Shift.id}>{Shift.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    <div className="App">
                        <p className='employee-info-days'>Días que trabajá tu empleado</p>
                        <CalendarDays onDaySelection={handleDaySelection} />
                    </div>
                    <div className="owner-buttons">
                        {!codeGenerated && (
                        <button className="employee-submit-button"  id='employee-button-generar' onClick={EmployeehandleClick}>
                            Generar Código
                        </button>
                        )}
                        {codeGenerated && (
                        <>                     
                            <button type="submit" className="owner-submit-button employee-submit-button-large" id='owner-button-cancelar' onClick={GoToMenu}>
                                Cancelar <FaChevronCircleRight className="owner-arrow-Icon"/>
                            </button>
                            <button type="submit" className="owner-submit-button employee-submit-button-large" id='owner-button-siguiente' onClick={(e) => ModalhandleClick(e)}>
                                Siguiente <FaChevronCircleRight className="owner-arrow-Icon"/>
                            </button>
                        </> 
                        )}
                    </div>              
                </form>
            </div>
        </div>
        <div className='employee-container-code-section2'>
            <div className="employee-container-code">
                <p className='employee-info-days'>Comparte el codigo con tu empleado</p>
                <div className='employee-container-center'>  
                    {codeGenerated && <p className='employee-generated-code'>{employeeCode}</p>}
                </div>
                <div className='employee-icon-sharing'>
                    <FaRegCopy className='employee-icons' onClick={handleCopyCode}/>
                    <FaWhatsapp className='employee-icons employee-icon-whatsapp' />
                    <img src={gmailIcon} alt='Icono de Gmail' style={{ width: '1.5em', height: '1.5em', cursor:'pointer'}}></img>
                </div>
            </div>
        </div> 
        {showModal && <ModalCheck onYes={handleYes} onNo={handleNo} />}
    </div>   
  )
}

export default Employee
