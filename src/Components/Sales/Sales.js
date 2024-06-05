import React, { useState } from 'react';
import { searchProductById, activateProduct } from '../../services/apiSaleService';
import ModalCode from '../ModalCode/ModalCode';
import './Sales.css';
import { MdOutlineSegment } from "react-icons/md";
import { FaSearch } from 'react-icons/fa';
import { IoTrashOutline } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa";
import EcoVentas from "../../img/Eco-Ventas.png";
import Notification from '../Notification/Notification';

function Sales() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: "" });


    const [currentProduct] = useState(null); 

    

    const handleDeleteClick = (productId) => {
        const filteredProducts = selectedProducts.filter(product => product.id !== productId);
        setSelectedProducts(filteredProducts);
        if (selectedProduct && selectedProduct.id === productId) {
            setSelectedProduct(null);
            setSelectedRow(null);
        }
    };

    const closeModal = () => {
        setShowModal(false);
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
            setSelectedProduct({
                ...selectedProduct,
                quantity: selectedProduct.quantity + 1,
                total: (selectedProduct.quantity + 1) * selectedProduct.price
            });
        }
    };
    const addProductToList = (product) => {
    const index = selectedProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
        const newProducts = [...selectedProducts];
        newProducts[index] = {
            ...newProducts[index],
            quantity: newProducts[index].quantity + 1,
            total: (newProducts[index].quantity + 1) * newProducts[index].price
        };
        setSelectedProducts(newProducts);
    } else {
        const newProduct = {
            id: product.id,
            name: product.name,
            imageSrc: product.image,
            category: product.clasification.name,
            price: parseFloat(product.price_sale),
            quantity: 1,
            total: parseFloat(product.price_sale)
        };
        setSelectedProducts(prevProducts => [...prevProducts, newProduct]);
    }
    setSearchTerm("");
};

const handlePriceSubmit = async (price) => {
    if (!searchTerm) {
        setNotification({ show: true, message: "ID del producto no está disponible." });
        return;
    }
    const updatedData = {
        price_sale: parseFloat(price)
    };
    try {
        const response = await activateProduct(searchTerm, updatedData);
        if (response.status === 200) {
            setNotification({ show: true, message: response.message });
            
            // Intentar buscar el producto y añadirlo a la lista si es necesario
            const result = await searchProductById(searchTerm);
            if (result.status === 200 && result.data) {
                const product = result.data;
                if (product.is_active) {
                    addProductToList(product);
                    setShowModal(false); // Cerrar el modal solo si todo es exitoso
                } else {
                    setShowModal(true); // Mantener el modal abierto si el producto no está activo
                }
            } else {
                setNotification({ show: true, message: result.message });
            }
        } else {
            setNotification({ show: true, message: response.message });
            setShowModal(true); // Mantener el modal abierto en caso de error
        }
    } catch (error) {
        const priceSaleError = error.response?.data?.error?.price_sale?.[0] ?? 'Error al actualizar el producto';
        setNotification({ show: true, message: priceSaleError });
    }
};



const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
        const result = await searchProductById(searchTerm);
        if (result.status === 200 && result.data) {
            const product = result.data;
            if (product.is_active) {
                addProductToList(product);
            } else {
                setShowModal(true);
            }
        } else {
            setNotification({ show: true, message: result.message });
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message ?? 'Error al conectar con el servicio';
        setNotification({ show: true, message: errorMessage });
    }
};


    const calculateSubtotal = () => {
        return selectedProducts.reduce((acc, product) => acc + product.total, 0);
    };

    const subtotal = calculateSubtotal();
    const iva = subtotal * 0; 
    const total = subtotal + iva;

    return (
        <div className='sales-container'>
            <div className='sales-container-section1'>
            {notification.show && 
                    <Notification 
                    message={notification.message} 
                    show={notification.show} 
                    onClose={() => setNotification({ show: false, message: "" })}
                    />
                }
                <div className="stock-cabecera">
                    <MdOutlineSegment className="stock-icono-classname-lines" />
                    <div className="stock-title">
                        <h2 className="stock-header">Ventas</h2>
                    </div>
                    <div className="sales-search-container">
                        <form onSubmit={handleSearchSubmit} className="sales-search-form">
                            <div className="sales-search-input-container">
                                <FaSearch className="sales-search-icon" />
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
                            <button className="sales-search-button">Buscar</button>
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
                    {!selectedProduct ? (
                        <div className="sales-welcome-message">
                            <img src={EcoVentas} alt="Bienvenido" className="sales-welcome-image" />
                            <p>Bienvenido a una nueva venta con EcoPym</p>
                        </div>
                    ) : (
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
                            <div className='sales-quantity-controls-container'>
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
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="sales-summary-item iva-item">
                            <span>IVA</span>
                            <span>${iva.toFixed(2)}</span>
                        </div>
                        <div className="sales-summary-total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
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

            {showModal && (
                <ModalCode 
                onClose={closeModal}
                onSubmit={handlePriceSubmit}
                title="Actualizar Precio"
                msg={`Ingresa el nuevo precio para el producto ${currentProduct?.name}`}
                placeholder="Escribe el precio"
                /> 
            )}
        </div>
    );
}

export default Sales;
