import React,  { useState } from 'react'
import './Sales.css';
import { MdOutlineSegment } from "react-icons/md";
import { FaSearch } from 'react-icons/fa';
import { IoTrashOutline } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa";
import EcoVentas from "../../img/Eco-Ventas.png";



function Sales() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);





    const products = [
        { id: 1, name: 'Jabon Ariel 1Kg', imageSrc: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750036600500L.jpg?odnHeight=580&odnWidth=580&odnBg=FFFFFF", category: "ABASUR", price: 60.89, quantity: 1, total: 60.89, discount: 5.00 },
        { id: 2, name: 'Yogurt Griego 90g', imageSrc: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750036600500L.jpg?odnHeight=580&odnWidth=580&odnBg=FFFFFF", category: "FERRETERIA", price: 70.89, quantity: 2, total: 120.89, discount: 10.00 },
        { id: 3, name: 'Aceite 123 1Lt', imageSrc: "", category: "", price: 60.89, quantity: 1, total: 60.89 },
        { id: 4, name: 'Nutella Grande 500g', imageSrc: "", category: "", price: 40.89, quantity: 1, total: 40.89 },
        { id: 5, name: 'Papas Fritas Barcel', imageSrc: "", category: "", price: 20.89, quantity: 2, total: 40.89, discount: 2.00 },
        { id: 6, name: 'Arizona', imageSrc: "", category: "", price: 20.89, quantity: 1, total: 60.89 },
        { id: 7, name: 'Salsa Valentina 1lt', imageSrc: "", category: "", price: 30.89, quantity: 1, total: 30.89 },
        { id: 8, name: 'NutriLeche 2.4lt', imageSrc: "", category: "", price: 40.89, quantity: 1, total: 40.89 },
        { id: 9, name: 'Chips Jalapeño', imageSrc: "", category: "", price: 18.89, quantity: 2, total: 36.89, discount: 1.50 },
        { id: 10, name: 'Cono de Huevos 30pz', imageSrc: "", category: "", price: 60.89, quantity: 1, total: 60.89 }
    ];
    


    //AQUI BUSCA A ELEMENTO A TRAVES DEL BUSCADOS
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Buscar:', searchTerm);
    };

    //ELIMINA EL ELEMENTO DE LA TABLA
    const handleDeleteClick = () => {
        // Lógica para eliminar el producto seleccionado
        console.log('Eliminar producto:', selectedProduct);
    };



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRowClick = (index) => {
        setSelectedRow(index);
        setSelectedProduct(products[index]);
    };

    
    const handleRestar = () => {
        if (selectedProduct && selectedProduct.quantity > 1) {
            setSelectedProduct({
                ...selectedProduct,
                quantity: selectedProduct.quantity - 1
            });
        }
    };

    const handleSumar = () => {
        if (selectedProduct) {
            setSelectedProduct({
                ...selectedProduct,
                quantity: selectedProduct.quantity + 1
            });
        }
    };

  return (
    <div className='sales-container'>
        <div className='sales-container-section1'>
            <div className="stock-cabecera">
                <MdOutlineSegment className="stock-icono-classname-lines" />
                <div className="stock-title">
                    <h2 className="stock-header">Ventas</h2>
                </div>
                <div className="sales-search-container">
                    <form onSubmit={handleSearchSubmit} className="sales-search-form">
                    <div className="sales-search-input-container">
                        <FaSearch className="sales-search-icon"/>
                        <input 
                            type="text" 
                            className="sales-search-input" 
                            placeholder="Busca tu producto" 
                            value={searchTerm}
                            onChange={handleSearchChange} 
                        />
                    </div>
                    </form>
                    <div className="sales-buscar">
                        <button className="sales-search-button" >Buscar</button>
                    </div>
                </div>

                <div className='sales-table-fondo'>
                    <div className="sales-table-header">
                        <div className='sales-table-nombre'>Nombre</div>
                        <div className='sales-table-precio'>Precio</div>
                        <div className='sales-table-cantidad'>Cantidad</div>
                        <div className='sales-table-total'>Total</div>
                    </div>
                    <div className="sales-table-container">
                        <table className="sales-table">
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr
                                            key={index}
                                            className={index === selectedRow ? 'selected' : ''}
                                            onClick={() => handleRowClick(index)}
                                        >
                                            <td>{product.name}</td>
                                            <td>${product.price.toFixed(2)}</td>
                                            <td>{product.quantity}</td>
                                            <td>${product.total.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            
                        </table>
                    </div>
                </div>



            </div>

        </div>





        <div className='sales-container-section2'>


            <div className='sales-container-producto-select'>
                {!selectedProduct ?(
                    <div className="sales-welcome-message">
                        <img src={EcoVentas} alt="Bienvenido" className="sales-welcome-image" />
                        <p>Bienvenido a una nueva venta con EcoPym</p>
                    </div>
                ):(
                    <>

                <div className='sale-producto-img-info'>
                    <div>
                        <img className="sale-products-img" src={selectedProduct ? selectedProduct.imageSrc : ''} alt="Producto seleccionado" />
                    </div>
                    <div className="sale-products-name">
                        {selectedProduct ? selectedProduct.name : 'Seleccione un producto'}
                        <div className="sale-products-price">
                            {selectedProduct ? `$${selectedProduct.price.toFixed(2)}` : ''}
                        </div>
                        <div className="sale-product-category">
                            {selectedProduct ? selectedProduct.category : ''}
                        </div>
                        <div className='sale-products-delete-container'>
                            {selectedProduct && (
                                <button className="sale-products-delete" onClick={handleDeleteClick}>
                                    <IoTrashOutline />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className='sales-quantity-controls-container '>
                    {selectedProduct && (
                        <div className="sales-quantity-controls">
                            <div className="sales-quantity-buttons">
                                <button className="sales-quantity-button" onClick={handleRestar}>-</button>
                                <div className="sales-quantity-display">{selectedProduct.quantity}</div>
                                <button className="sales-quantity-button" onClick={handleSumar}>+</button>
                            </div>
                        </div>
                    )}
                </div>




                </>
                )}
                        
                        





                </div>




                <div className='sales-container-producto-info'>
                    <div className="sales-summary">
                        <div className="sales-summary-item">
                            <span>Descuento</span>
                            <span>N/A</span>
                        </div>
                        <div className="sales-summary-item">
                            <span>Subtotal</span>
                            <span>$380.90</span>
                        </div>
                        <div className="sales-summary-item  iva-item">
                            <span>IVA</span>
                            <span>$12.78</span>
                        </div>
                        <div className="sales-summary-total">
                            <span>Total</span>
                            <span>$390.66</span>
                        </div>
                    </div>
                    <div className="payment-method">
                        <span>Payment Method</span>
                        <div className="payment-method-icons">
                            <button className="payment-method-button">
                            <BsCashCoin />

                            </button>
                            <button className="payment-method-button">
                            <FaMoneyCheck />
                            </button>
                            <button className="payment-method-button">
                            <FaCcMastercard />

                            </button>
                        </div>
                    </div>
                    <button className="pay-button">COBRAR</button>
                </div>

            



        </div>
      
    </div>
  )
}

export default Sales
