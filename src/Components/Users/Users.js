import React, { useState} from 'react'
import './Users.css'
import { FaPlus } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';



function Users() {

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(12);

    const users = [
        {
          id: 1,
          name: "Rosa Juliana Martinez Rios",
          role: "Cajero",
          phone: "954 139 4423",
          imageSrc: "" 
        },
        {
          id: 2,
          name: "Froylan Christofer Martinez Carlos",
          role: "Almacen",
          phone: "954 139 4423",
          imageSrc: ""
        },
        {
            id: 3,
            name: "Luis Eduardo Martinez Rios",
            role: "Gerente",
            phone: "954 107 0924",
            imageSrc: ""
        },
        {
            id: 4,
            name: "Luis Eduardo Martinez Rios",
            role: "Gerente",
            phone: "954 107 0924",
            imageSrc: ""
        },
        {
            id: 5,
            name: "Luis Eduardo Martinez Rios",
            role: "Gerente",
            phone: "954 107 0924",
            imageSrc: ""
        },
        {
            id: 6,
            name: "Luis Eduardo Martinez Rios",
            role: "Gerente",
            phone: "954 107 0924",
            imageSrc: ""
        },
        {
            id: 7,
            name: "Luis Eduardo Martinez Rios",
            role: "Gerente",
            phone: "954 107 0924",
            imageSrc: ""
        }
    ];


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Buscar:', searchTerm);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const indexOfLastProduct = currentPage * usersPerPage;
    const indexOfFirstProduct = indexOfLastProduct - usersPerPage;
    const currentUsers = users.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='users-container-data'>
        <div className="users-container">
            <div className="users-cabecera">
                <div className="users-title">
                    <h2 className="users-header">Usuarios Existentes</h2>
                    <div className="users-agregar">
                        <FaPlus className='users-button-añadir'/><button className="users-button-plus">Agregar</button>
                    </div>
                    
                </div>
            </div>

            <div className="users-search-container">
                <form onSubmit={handleSearchSubmit} className="users-search-form">
                    <div className="users-input-icon-container">
                        <input type="text" className="stock-search-input" placeholder="Busca tu usuario" value={searchTerm}
                            onChange={handleSearchChange} />
                        <button type="submit" className="stock-search-button"><FaSearch /></button>
                    </div>
                </form>
            </div>


            <div className="users-body">
                {currentUsers.map((user, index) => (
                <div key={user.id} className="users-body-container">
                    <div class="image-container">
                        <img className="users-container-img" src={user.imageSrc} alt="Foto del Personal" />
                    </div>
                    <div className="users-body-container-info">
                        <p className="user-body-name">{user.name}</p>
                        <p className="user-body-rol">{user.role}</p>
                        <p className="user-body-tel">Tel: {user.phone}</p>
                        <div className="user-button-container">
                            <button className="users-button-edit">Editar</button>
                            <button className="users-button-delete">Eliminar</button>
                        </div>
                    </div>
                </div>
                 ))}
            </div>

            <div className="user-pagination-container">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="stock-pagination-nav-button">
                    &lt;
                </button>
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                    <li key={i + 1}>
                        <button
                            className={`stock-pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => paginate(i + 1)}
                        >
                            {i + 1}
                        </button>
                    </li>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(users.length / usersPerPage)} className="stock-pagination-nav-button">
                    &gt;
                </button>
            </div>
        </div>
    </div>
  )
}

export default Users
