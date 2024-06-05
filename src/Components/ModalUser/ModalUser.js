import React, { useState } from 'react'
import Notification from '../Notification/Notification';
import byEcoPym from "../../img/by-ecopym.png";
import "./ModalUser.css";
import CalendarDays from '../CalendarDays/CalendarDays';
import { FaRegCopy } from "react-icons/fa6";
import { FaWhatsapp } from 'react-icons/fa';
import gmailIcon from "../../img/gmail.png";
import { FaChevronCircleRight } from "react-icons/fa";
import { createRegisterEmployes } from '../../services/apiRegisterEmployee';



function ModalUser({ closeModal }) {
    const [NombreUsu, setNombreUsu] = useState("");
    const [RolUsu, setRolUsu] = useState("");
    const [SalarioUsu, setSalarioUsu] = useState("");
    const [TurnoUsu, setTurnoUsu] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [codeGenerated, setCodeGenerated] = useState(false);
    const [employeeCode, setEmployeeCode] = useState("");



    const [notification, setNotification] = useState({ show: false, message: "" });

    const closeNotification = () => {
        setNotification({ ...notification, show: false });
    };

    const roles = [
        { id: 1, name: 'Cajero' },
        { id: 2, name: 'Almacen' },
        { id: 3, name: 'Ventas' },
        { id: 4, name: 'Compras' }
    ];
    const turno = [
        { id: 1, name: 'Mañana' },
        { id: 2, name: 'Tarde' },
        { id: 3, name: 'Noche' }
    ];

    function handleDaySelection(daysIds) {
        const daysWithTrue = daysIds.map(dayId => ({
            day_id: dayId,
            is_work_day: true
        }));
        setSelectedDays(daysWithTrue);
    }

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

    const EmployeehandleClick = async (e) => {
        e.preventDefault();

        if (!NombreUsu || !RolUsu || !SalarioUsu || !TurnoUsu) {
            setNotification({ show: true, message: "Completa tus datos, por favor." });
        }
        else{
            const prefix = "EMP";
            const randomNumbers = Math.floor(Math.random() * 90000) + 1000;
            const code = prefix + randomNumbers;
            setEmployeeCode(code);  // Guarda el código generado en el estado
            setCodeGenerated(true);

            try {
                const employesData = {
                    name: NombreUsu,
                    role_id: RolUsu,
                    salary: SalarioUsu,
                    work_shift_id: TurnoUsu,
                    password: code,
                    branch_id: sessionStorage.getItem('branchId'),
                    days: selectedDays
                  };
                  await createRegisterEmployes(employesData);
                  setEmployeeCode(code); 
                  setCodeGenerated(true);
                  sessionStorage.removeItem('branchId');
                
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
            console.log("Nombre del Empleado:", NombreUsu);
            console.log("Rol del propietario:", RolUsu);
            console.log("Salario:", SalarioUsu);
            console.log("Turno:", TurnoUsu);
            console.log("Días Seleccionados:", selectedDays);
            console.log("Codigo:", code);
        }
    };


    return (
        <div className="modalProducts-backdrop" onClick={closeModal}>
            <Notification message={notification.message} show={notification.show} onClose={closeNotification} />
            <div className="modalusers-content" onClick={e => e.stopPropagation()}>

                <div className='products-header-Ecopym'>
                    <div className='modalProducts-logo'>
                        <img src={byEcoPym} alt="by EcoPym" />
                    </div>
                    <div className='modalProducts-text-Ecopym'>
                        <p>EcoPym</p>
                    </div>
                </div>

                <div className="modalProducts-header">
                    <p className="products-title">Registro de un nuevo empleado</p>
                </div>


                <div className='modalProducts-body'>
                    <div className="products-Content-form">
                        <form className="products-main-form">

                            <div className="users-inputGroups-container">
                                <div className="users-inputGroupMedida">
                                    <div className="users-inputGroupMedida">
                                        <label className='users-label' htmlFor="ProductName">Nombre</label>
                                        <div className="users-input-container">
                                            <input
                                                value={NombreUsu}
                                                type="text"
                                                id="ProductName"
                                                placeholder="Rosa Juliana"
                                                onChange={(e) => setNombreUsu(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="users-inputGroup-select">
                                    <label className='users-label' htmlFor="UnitName">Rol</label>
                                    <div className="users-input-container">
                                        <select className='users-custom-select'
                                            value={RolUsu}
                                            id="ProductsMarca"
                                            onChange={(e) => setRolUsu(e.target.value)}
                                            required
                                        >
                                            <option value="">ROLES</option>
                                            {roles.map((rol) => (
                                                <option key={rol.id} value={rol.id}>{rol.name}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>

                    <div className="users-inputGroup">
                        <label className='users-label' htmlFor="ProductName">Salario</label>
                        <div className="users-input-container">
                            <input
                                value={SalarioUsu}
                                type="text"
                                id="ProductName"
                                placeholder="$200"
                                onChange={(e) => setSalarioUsu(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="users-inputGroup">
                        <label className='users-label' htmlFor="ProductName">Turno</label>
                        <div className="company-input-container">
                            <select className='users-custom-select'
                                value={TurnoUsu}
                                id="ProductsMarca"
                                onChange={(e) => setTurnoUsu(e.target.value)}
                                required
                            >
                                <option value="">SELECCIONE EL TURNO</option>
                                {turno.map((turno) => (
                                    <option key={turno.id} value={turno.id}>{turno.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="App">
                        <p className='employee-info-days'>Días que trabajá tu empleado</p>
                        <CalendarDays onDaySelection={handleDaySelection} />
                    </div>


                    <div className='users-container-code-section2'>
                        <div className="users-container-code">
                            <p className='users-info-days'>Comparte el codigo con tu empleado</p>
                            <div className='users-container-center'>
                                {codeGenerated && <p className='users-generated-code'>{employeeCode}</p>}                            </div>
                            <div className='users-icon-sharing'>
                                <FaRegCopy className='employee-icons' onClick={handleCopyCode} />
                                <FaWhatsapp className='employee-icons employee-icon-whatsapp' />
                                <img src={gmailIcon} alt='Icono de Gmail' style={{ width: '1.5em', height: '1.5em', cursor: 'pointer', padding: '0% 10%' }}></img>
                            </div>
                        </div>
                    </div>

                    <div className="users-buttons">
                        {!codeGenerated && (
                        <button className="employee-submit-button"  id='employee-button-generar' onClick={EmployeehandleClick}>
                            Generar Código
                        </button>
                        )}
                        {codeGenerated && (
                        <> 
                            <button type="submit" className="owner-submit-button employee-submit-button-large" id='owner-button-siguiente' >
                                Siguiente <FaChevronCircleRight className="owner-arrow-Icon"/>
                            </button>
                        </> 
                        )}
                    </div>  
                </div>




            </div>

        </div>
    )
}

export default ModalUser

