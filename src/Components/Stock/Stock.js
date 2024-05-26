import React, { useState, useRef } from 'react';
import { IoCameraOutline } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdOutlineSegment } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import { PiUserThin } from "react-icons/pi";



import "./Stock.css"

function POS() {
    const [searchTerm, setSearchTerm] = useState('');
    const [hoverIndex, setHoverIndex] = useState(null);
    const scrollRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);


    // Areglo para poner la API DE CATEGORIAS
    const categories = [
        { name: "Pescado", image: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750105535626L.jpg?odnHeight=580&odnWidth=580&odnBg=FFFFFF", alt: "Pescado" },
        { name: "Verduras", image: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750036600500L.jpg?odnHeight=580&odnWidth=580&odnBg=FFFFFF", alt: "Verduras" },
        { name: "Frutas", image: "fruits", alt: "Frutas" },
        { name: "Congelados", image: "frozen", alt: "Congelados" },
        { name: "Pan", image: "pan", alt: "Pan" },
        { name: "Semillas", image: "seeds", alt: "Semillas" },
        { name: "Higiene", image: "hygiene", alt: "Higiene" }
    ];

    //ARRELO PARA PONER LA API DE PRODUCTOS (DESCUENTO SI ES QUE TIENE, IMG, ALT TEXT, CANTIDAD, PRECIO, DEPARTAMENTO, NOMBRE)
    const products = [
        { id: 1, discount: '52% Off', imageSrc: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750105535626L.jpg?odnHeight=580&odnWidth=580&odnBg=FFFFFF", altText: 'Yoghurt', count: '15', price: '$45', supplier: 'Abasur', productName: 'Yoghurt Griego 10g' },
        { id: 2, discount: '52% Off', imageSrc: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750036600500L.jpg?odnHeight=580&odnWidth=580&odnBg=FFFFFF", altText: 'CornFlakes', count: '23', price: '$35', supplier: 'Abasur', productName: 'Cereal CornFlakes 900g' },
        { id: 3, discount: '52% Off', imageSrc: "tomato", altText: 'Tomato', count: '43', price: '$20', supplier: 'Central de Abastos', productName: 'Tomate 1kg' },
        { id: 4, discount: '52% Off', imageSrc: "bimbo", altText: 'Pan Bimbo', count: '56', price: '$38', supplier: 'Abasur', productName: 'Pan Bimbo 377g' },
        { id: 5, discount: '52% Off', imageSrc: "IceCream", altText: 'Helado Sabor Chocolate', count: '3', price: '$60', supplier: 'Helados', productName: 'Helado Sabor Chocolate 900g' },
        { id: 6, discount: '52% Off', imageSrc: "MicelarG", altText: 'HAgua Micelar Garnier', count: '12', price: '$110', supplier: 'Mini Abastos', productName: 'Helado Sabor Chocolate 900g' },
        { id: 7, discount: '52% Off', imageSrc: "ArrozVerde", altText: 'Arroz Verde', count: '57', price: '$39', supplier: 'Abasur', productName: 'Arroz Verde 900g' },
        { id: 8, discount: '52% Off', imageSrc: "Johnsons", altText: 'Jabon de Baño', count: '21', price: '$70', supplier: 'Mini Abastos', productName: 'Jabon de Baño Johnsons' },
    ];


    //PONER LA API QUE CONSULTA MI TOP 3 DE PRODUCTOS MAS VENDIDOS
    const topSales = [
        { id: 1, imageSrc: "ArrozVerde", altText: 'Producto numero 1', name: 'Arroz Verde 900g', index: '18.09%' },
        { id: 2, imageSrc: "bimbo", altText: 'Producto numero 2', name: 'Pan Bimbo 377g', index: '15.59%' },
        { id: 3, imageSrc: "tomato", altText: 'Producto numero 3', name: 'Tomate 1Kg', index: '10.90%' },
        { id: 4, imageSrc: "IceCream", altText: 'Producto numero 2', name: 'Helado sabor Chocolate', index: '1.75%' },
        { id: 5, imageSrc: "connflakes", altText: 'Producto numero 3', name: 'Cereal CornFlakes 900g', index: '1.90%' }
    ];

    //PONER API QUE CONSULTA MI TOP 3 DE PRODUCTOS MENOS VENDIDOS
    const lowSales = [
        { id: 1, imageSrc: "Johnsons", altText: 'Producto numero 1', name: 'Jabón de Baño Johnsons', index: '0.42%' },
        { id: 2, imageSrc: "IceCream", altText: 'Producto numero 2', name: 'Helado sabor Chocolate', index: '1.75%' },
        { id: 3, imageSrc: "connflakes", altText: 'Producto numero 3', name: 'Cereal CornFlakes 900g', index: '1.90%' },
        { id: 4, imageSrc: "IceCream", altText: 'Producto numero 2', name: 'Helado sabor Chocolate', index: '1.75%' },
        { id: 5, imageSrc: "connflakes", altText: 'Producto numero 3', name: 'Cereal CornFlakes 900g', index: '1.90%' }
    ];


    //AQUI OBTENGO EL VALOR AL MOMENTO DE BUSCAR
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Buscar:', searchTerm);
    };


    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };



    //Paginacion
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="stock-products-container">
            <div className="stock-container">
                <div className="stock-cabecera">
                <MdOutlineSegment className="stock-icono-classname-lines" />
                    <div className="stock-title">
                        <h2 className="stock-header">Productos Existentes</h2>
                        <div className="stock-añadir">
                            <FaPlus className='stock-button-añadir' />
                            <button className="stock-button-plus">Añadir</button>
                        </div>
                    </div>

                    <div className="stock-body-container">
                    <button className="stock-scroll-button left" onClick={scrollLeft}><MdOutlineNavigateBefore/></button>
                    <div className="stock-body" ref={scrollRef}>
                        {categories.map((category, index) => (
                        <div className="stock-body-categories" key={index}>
                            <img className="stock-category-img" src={category.image} alt={category.alt} />
                            <span className="stock-category-name">{category.name}</span>
                        </div>
                        ))}
                    </div>
                    <button className="stock-scroll-button right" onClick={scrollRight}><MdOutlineNavigateNext /></button>
                    </div>
                </div>

                <div className="stock-search-container">
                    <form onSubmit={handleSearchSubmit} className="stock-search-form">
                        <input type="text" className="stock-search-input" placeholder="Busca tu producto" value={searchTerm}
                            onChange={handleSearchChange} />
                        <button type="submit" className="stock-search-button"><FaSearch /></button>
                    </form>
                </div>
                <div className='stock-container-card-products'>
                    <div className="stock-tbody-container">
                        {currentProducts.map((product, index) => (
                            <div className="stock-container-products" key={product.id}>
                                <div className="stock-tbody-header">
                                    <p className="stock-header">{product.discount}</p>
                                    <IoCameraOutline className="stock-icono-classname-camera" />
                                </div>
                                <div className="stock-info-container">
                                    <img className="stock-products-img" src={product.imageSrc} alt={product.altText} />
                                    <div
                                        className="stock-icono-classname-plus"
                                        onMouseEnter={() => setHoverIndex(index)}
                                        onMouseLeave={() => setHoverIndex(null)}
                                    >
                                        {hoverIndex === index ? (
                                            <>
                                                <FaMinus className="stock-icon-minus" />
                                                <span className="stock-number">{product.count}</span>
                                                <FaPlus className="stock-icon-plus" />
                                            </>
                                        ) : (
                                            <FaPlus className="stock-icon-plus" />
                                        )}
                                    </div>
                                    <div className="stock-inferior-container">
                                        <p className="stock-Cost">{product.price}</p>
                                        <p className="stock-proveedor">{product.supplier}</p>
                                        <p className="stock-name-product">{product.productName}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="stock-pagination-container">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="stock-pagination-nav-button">
                        &lt;
                    </button>
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
                        <li key={i + 1}>
                            <button
                                className={`stock-pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => paginate(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(products.length / productsPerPage)} className="stock-pagination-nav-button">
                        &gt;
                    </button>
                </div>

            </div>



            <div className="stock-container-top">
                <div className="stock-container-user">
                    <p className='stock-user'>Rosa</p>
                    <PiUserThin className='stock-icono-classname' />
                </div>

                <div className="stock-container-top3">
                    <p className='stock-top3'>Lo más vendido</p>
                    {topSales.map(product => (
                        <div className="stock-top3-container" key={product.id}>
                            <img className='stock-top3-img' alt={product.altText} src={product.imageSrc}></img>
                            <p className='stock-top3-text'>{product.name}</p>
                            <p className='stock-top3-indice'>{product.index}</p>
                        </div>
                    ))}
                </div>

                <div className="stock-container-top3">
                    <p className='stock-top3'>Lo menos vendido</p>
                    {lowSales.map(product => (
                        <div className="stock-top3-container" key={product.id}>
                            <img className='stock-top3-img' alt={product.altText} src={product.imageSrc}></img>
                            <p className='stock-top3-text'>{product.name}</p>
                            <p className='stock-top3-indice'>{product.index}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default POS;
