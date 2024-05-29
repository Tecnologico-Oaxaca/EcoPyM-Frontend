import React,  { useState } from 'react'
import { searchProductById } from '../../services/apiSaleService';
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
    const [selectedProducts, setSelectedProducts] = useState([]);



    


    //AQUI BUSCA A ELEMENTO A TRAVES DEL BUSCADOS
    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await searchProductById(searchTerm);
            if (result.status === 200 && result.data) {
                // Buscar si el producto ya está en la lista
                const index = selectedProducts.findIndex(product => product.id === result.data.id);
    
                if (index !== -1) {
                    // Producto encontrado, incrementar cantidad
                    const newProducts = [...selectedProducts];
                    newProducts[index] = {
                        ...newProducts[index],
                        quantity: newProducts[index].quantity + 1,
                        total: (newProducts[index].quantity + 1) * newProducts[index].price
                    };
                    setSelectedProducts(newProducts);
                } else {
                    // Producto no encontrado, agregar nuevo
                    const newProduct = {
                        id: result.data.id,
                        name: result.data.name,
                        imageSrc: result.data.image,
                        category: result.data.clasification.name,
                        price: parseFloat(result.data.price_sale),
                        quantity: 1,
                        total: parseFloat(result.data.price_sale)
                    };
                    setSelectedProducts(prevProducts => [...prevProducts, newProduct]);
                }
                setSearchTerm('');
            } else {
                console.log('Producto no encontrado o error en los datos', result.message);
            }
        } catch (error) {
            console.error('Error al buscar producto:', error);
        }
    };
    

    //ELIMINA EL ELEMENTO DE LA TABLA
    const handleDeleteClick = (productId) => {
        // Lógica para eliminar el producto seleccionado
        const filteredProducts = selectedProducts.filter(product => product.id !== productId);
        setSelectedProducts(filteredProducts);
        // Si el producto eliminado está actualmente seleccionado, limpiar la selección
        if (selectedProduct && selectedProduct.id === productId) {
            setSelectedProduct(null);
            setSelectedRow(null); // Opcional, si deseas también limpiar la selección visual en la tabla
        }
    };



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRowClick = (index) => {
        setSelectedRow(index);
        setSelectedProduct(selectedProducts[index]);
    };

    
    const handleRestar = () => {
        if (selectedProduct && selectedProduct.quantity > 1) {
            const newProducts = selectedProducts.map(product => {
                if (product.id === selectedProduct.id) {
                    return {
                        ...product,
                        quantity: product.quantity - 1,
                        total: (product.quantity - 1) * product.price
                    };
                }
                return product;
            });
            setSelectedProducts(newProducts);
    
            // Opcionalmente actualiza el selectedProduct para reflejar el cambio directamente en los controles de la UI
            setSelectedProduct({
                ...selectedProduct,
                quantity: selectedProduct.quantity - 1,
                total: (selectedProduct.quantity - 1) * selectedProduct.price
            });
        }
    };
    

    const handleSumar = () => {
        if (selectedProduct) {
            const newProducts = selectedProducts.map(product => {
                if (product.id === selectedProduct.id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                        total: (product.quantity + 1) * product.price
                    };
                }
                return product;
            });
            setSelectedProducts(newProducts);
            
            // Opcionalmente actualiza el selectedProduct para reflejar el cambio directamente en los controles de la UI
            setSelectedProduct({
                ...selectedProduct,
                quantity: selectedProduct.quantity + 1,
                total: (selectedProduct.quantity + 1) * selectedProduct.price
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
                                    {selectedProducts.map((product, index) => (
                                        <tr
                                            key={product.id}
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
                                <button className="sale-products-delete" onClick={() => handleDeleteClick(selectedProduct.id)}>
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
