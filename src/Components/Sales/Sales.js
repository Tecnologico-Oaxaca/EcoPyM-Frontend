import React,  { useState } from 'react'
import './Sales.css';
import { FaPlus } from 'react-icons/fa';
import { MdOutlineSegment } from "react-icons/md";
import { FaSearch } from 'react-icons/fa';



function Sales() {

    const [searchTerm, setSearchTerm] = useState('');



    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Buscar:', searchTerm);
    };


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
                        <input type="text" className="sales-search-input" placeholder="Busca tu producto" value={searchTerm}
                            onChange={handleSearchChange} />
                        <button type="submit" className="stock-search-button"><FaSearch /></button>
                    </form>
                    <div className="stock-añadir">
                        <FaPlus className='stock-button-añadir' />
                        <button className="stock-button-plus" >Buscar</button>
                    </div>

                </div>




            </div>

        </div>





        <div className='sales-container-section2'>

        </div>
      
    </div>
  )
}

export default Sales
