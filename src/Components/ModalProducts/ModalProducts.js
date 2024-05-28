import React, { useState} from 'react'
import './ModalProducts.css';
import { FaCamera } from "react-icons/fa";
import byEcoPym from "../../img/by-ecopym.png";
import { TfiMoney } from "react-icons/tfi";
import Notification from '../Notification/Notification'; 


function ModalProducts({ closeModal }) {

    const [ProductCode, setProductCode] = useState("");
    const [ProductName, setProductName] = useState("");
    const [ProductCantidad, setProductCantidad] = useState("");
    const [ProductUnit, setProductUnit] = useState("");
    const [ProductAdquisicion, setProductAdquisicion] = useState("");
    const [ProductVenta, setProductVenta] = useState("");
    const [ProductMarca, setProductMarca] = useState("");
    const [ProductDepartamento, setProductDepartamento] = useState("");
    const [ProductExistencia, setProductExistencia] = useState("");
    const [ProductProveedor, setProductProveedor] = useState("");

    const [withCode, setWithCode] = useState(true);
    const [generatedCodes, setGeneratedCodes] = useState(new Set());
    const [bulk, setBulk] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: "" });



    const marcas =[
        { id: 1, name: 'La Costeña' },
        { id: 2, name: 'Herdez' },
        { id: 3, name: 'McCormick' },
        { id: 4, name: 'Gamesa' },
        { id: 5, name: 'Barilla' }
    ];
    const UnidadDeMedida =[
        { id: 1, name: 'Litro' },
        { id: 2, name: 'Gramo' },
        { id: 3, name: 'Kilogramo' },
        { id: 4, name: 'Mililitro' },
        { id: 5, name: 'Pieza' }
    ];
    const Departamento =[
        { id: 1, name: 'Abarrotes' },
        { id: 2, name: 'Farmacia' },
        { id: 3, name: 'Ferreteria' },
        { id: 4, name: 'Regalos' },
        { id: 5, name: 'Verduleria' }
    ];
    const Proveedor =[
        { id: 1, name: 'Bimbo' },
        { id: 2, name: 'Lala' },
        { id: 3, name: 'Sabritas' },
        { id: 4, name: 'Coca-Cola' },
        { id: 5, name: 'Abasur' }
    ];


    //AQUI SE AGREGA LA API PARA INSERTAR EL REGISTRO
    const handleSubmit = (event) => {
        event.preventDefault();
        //SI SE SELECCIONA A GRANEL
        const effectiveProductCode = bulk ? generateRandomCode() : ProductCode;
        const effectiveProductMarca = bulk ? null : ProductMarca;
        const effectiveProductDepartamento = bulk ? null : ProductDepartamento;

        if (bulk) {
            if (!ProductName || !ProductCantidad || !ProductUnit || !ProductVenta) {
                setNotification({
                    show: true,
                    message: "Por favor completa la información."
                });
                return;
            }
        } else {
         
            if (!ProductCode|| !ProductName || !ProductCantidad || !ProductUnit  || !ProductVenta || !ProductMarca || !ProductDepartamento) {
            setNotification({
                show: true,
                message: "Por favor completa la información."
            });
            return; 
        }
        }
        
        console.log('Codigo:',effectiveProductCode);
        console.log('Nombre:', ProductName);
        console.log('Cantidad de Medida:',ProductCantidad);
        console.log('Unidad de Medida:',ProductUnit);
        console.log('Precio de Adquisición:',ProductAdquisicion);
        console.log('Precio de venta:',ProductVenta);
        console.log('Marca:',effectiveProductMarca);
        console.log('Departamento:',effectiveProductDepartamento);
        console.log('Existencias:', ProductExistencia);
        console.log('Proveedor:', ProductProveedor);
        console.log('',withCode);
        console.log('',bulk);
        closeModal(); 
    };

    const generateRandomCode = () => {
        let randomNumber;
        let newCode;
        do {
            randomNumber = Math.floor(10000 + Math.random() * 90000); // Genera un número aleatorio de cinco dígitos
            newCode = `AG${randomNumber}`;
        } while (generatedCodes.has(newCode)); // Repetir si el código ya existe
        setGeneratedCodes(prevCodes => new Set(prevCodes).add(newCode)); // Añadir el nuevo código al set
        return newCode;
    };

    

    const handleWithCodeChange = () => {
        setWithCode(!withCode); 
        if (!withCode) setBulk(false); 
    };
    const handleBulkChange = () => {
        setBulk(!bulk); 
        if (!bulk) setWithCode(false); 
    };
    const closeNotification = () => {
        setNotification({ ...notification, show: false });
    };


  return (
    <div className="modalProducts-backdrop" onClick={closeModal}>
        <Notification message={notification.message} show={notification.show} onClose={closeNotification} />
        <div className="modalProducts-content" onClick={e => e.stopPropagation()}> 

            <div className='products-header-Ecopym'>
                <div className='modalProducts-logo'> 
                    <img src={byEcoPym} alt="by EcoPym" />
                </div>
                <div className='modalProducts-text-Ecopym'> 
                    <p>EcoPym</p>
                </div>
            </div>

            <div className="modalProducts-checkboxes">
                <div>
                    <input
                        type="checkbox"
                        id="withCode"
                        checked={withCode}
                        onChange={ handleWithCodeChange }
                    />
                    <label htmlFor="withCode">Con Código</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="bulk"
                        checked={bulk}
                        onChange={ handleBulkChange }
                    />
                    <label htmlFor="bulk">A Granel</label>
                </div>
            </div>




            <div className="modalProducts-header">
                <p className="products-title">Detalles del Producto</p>
            </div>


            <div className={`modalProducts-body ${bulk ? 'bulk-active' : ''}`}>
                <div className="products-Content-form">
                    <form className="products-main-form">
                    <div className="product-inputGroups-container">
                        
                        <div className="produts-inputGroup">

                            <div>
                            {!bulk && (
                                <div className="produts-inputGroup">
                                    <label className='products-label' htmlFor="ProductCode">Codigo de barras</label>
                                    <div className="products-input-container">
                                        <input
                                            value={ProductCode}
                                            type="text"
                                            id="ProductCode"
                                            placeholder="1234567890"
                                            onChange={(e) => setProductCode(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            )}
                            </div> 
                            <label className='products-label' htmlFor="ProductName">Nombre</label>
                            <div className="products-input-container">
                                <input
                                value={ProductName}
                                type="text"
                                id="ProductName"
                                placeholder="Aceite Patrona 1L"
                                onChange={(e) => setProductName(e.target.value)}
                                required
                                />
                            </div>
                        </div>
                        <div className="product-inputGroup">
                        <div className="company-input-container">
                                <div className="products-container-img">
                                <button className="company-button-img">
                                <FaCamera className="company-icon-camara" />
                                </button>
                        </div>
                        </div>
                        </div>
                    </div>

                    <div className="company-inputGroups-container">
                        <div className="products-inputGroupMedida">
                            <div className="produts-inputGroupMedida">
                            <label className='products-label' htmlFor="ProductName">Cantidad de Medida</label>
                            <div className="company-input-container">
                                <input
                                value={ProductCantidad}
                                type="text"
                                id="ProductName"
                                placeholder="350"
                                onChange={(e) => setProductCantidad(e.target.value)}
                                required
                                />
                            </div>
                            </div>
                        </div>
                        <div className="products-inputGroup">
                            <label className='products-label' htmlFor="UnitName">Unidad de Medida</label>
                            <div className="company-input-container">
                                <select className='products-custom-select'
                                value={ProductUnit}
                                id="ProductsMarca"
                                onChange={(e) => setProductUnit(e.target.value)}
                                required
                                >
                                <option value="">UNIDAD DE MEDIDA</option>
                                {UnidadDeMedida.map((unidad) => (
                                    <option key={unidad.id} value={unidad.id}>{unidad.name}</option>
                                ))}
                                </select>
                               
                            </div>
                        </div>
                    </div>


                    <div className="company-inputGroups-container">
                        <div className="products-inputGroupMedida">
                            <div className="produts-inputGroupMedida">
                            <label className='products-label' htmlFor="ProductName">Precio de Adquisición</label>
                            <div className="company-input-container">
                                <TfiMoney className="products-input-Icon" />
                                <input
                                value={ProductAdquisicion}
                                type="text"
                                id="ProductName"
                                placeholder="350"
                                onChange={(e) => setProductAdquisicion(e.target.value)}
                                required
                                />
                            </div>
                            </div>
                        </div>
                        <div className="products-inputGroupMedida">
                            <div className="produts-inputGroupMedida">
                            <label className='products-label' htmlFor="ProductName">Precio de venta</label>
                            <div className="company-input-container">
                                <TfiMoney className="products-input-Icon" />
                                <input
                                value={ProductVenta}
                                type="text"
                                id="ProductName"
                                placeholder="350"
                                onChange={(e) => setProductVenta(e.target.value)}
                                required
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-inputGroupMedida">
                    {!bulk && (
                        <div className="produts-inputGroupMedida">
                        <label className='products-label' htmlFor="ProductName">Marca</label>
                        <div className="company-input-container">
                            <select className='products-custom-select'
                                value={ProductMarca}
                                id="ProductsMarca"
                                onChange={(e) => setProductMarca(e.target.value)}
                                required
                                >
                                <option value="">SELECCIONE LA MARCA</option>
                                {marcas.map((marca) => (
                                    <option key={marca.id} value={marca.id}>{marca.name}</option>
                                ))}
                            </select>
                        </div>
                        </div>
                    )}
                    </div>


                    <div className="products-inputGroupMedida">
                    {!bulk && (
                        <div className="produts-inputGroupMedida">
                        <label className='products-label' htmlFor="ProductName">Departamento</label>
                        <div className="company-input-container">
                            <select className='products-custom-select'
                                value={ProductDepartamento}
                                id="ProductsMarca"
                                onChange={(e) => setProductDepartamento(e.target.value)}
                                required
                                >
                                <option value="">SELECCIONE EL DEPARTAMENTO</option>
                                {Departamento.map((depa) => (
                                    <option key={depa.id} value={depa.id}>{depa.name}</option>
                                ))}
                            </select>
                        </div>
                        </div>
                    )}
                    </div>



                    <div className="company-inputGroups-container">
                        <div className="products-inputGroupMedida">
                            <div className="produts-inputGroupMedida">
                            <label className='products-label' htmlFor="ProductName">Existencias</label>
                            <div className="company-input-container">
                                <input
                                value={ProductExistencia}
                                type="text"
                                id="ProductName"
                                placeholder="350"
                                onChange={(e) => setProductExistencia(e.target.value)}
                                required
                                />
                            </div>
                            </div>
                        </div>
                        <div className="products-inputGroupMedida">
                            <div className="produts-inputGroupMedida">
                                <label className='products-label' htmlFor="ProductProveedor">Proveedor</label>
                                    <div className="company-input-container">
                                    {bulk ? (
                                        <input
                                            value={ProductProveedor}
                                            type="text"
                                            id="ProductProveedor"
                                            placeholder="Ingrese proveedor"
                                            onChange={(e) => setProductProveedor(e.target.value)}
                                            required
                                        />
                                    ) : (
                                        <select className='products-custom-select'
                                            value={ProductProveedor}
                                            id="ProductsMarca"
                                            onChange={(e) => setProductProveedor(e.target.value)}
                                            required
                                        >
                                        <option value="">SELECCIONA EL PROVEEDOR</option>
                                            {Proveedor.map((prov) => (
                                                <option key={prov.id} value={prov.id}>{prov.name}</option>
                                             ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='products-button-container'>
                        <button className='products-button-aceptar' onClick={handleSubmit}>Aceptar

                        </button>

                    </div>
                    </form>
                </div>
                </div>
            </div>
    </div>
  );
}

export default ModalProducts
