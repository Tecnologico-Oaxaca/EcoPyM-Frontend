import axios from 'axios';

const handleSearchChange = async (event, setSearchTerm, setSearchResults, setShowDropdown) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
        try {
            const response = await axios.get(`http://localhost:8000/api/products?name=${value}`);
            setSearchResults(response.data.data.slice(0, 5));
            setShowDropdown(true);
        } catch (error) {
            console.error('Error al buscar productos:', error);
            setSearchResults([]);
            setShowDropdown(false);
        }
    } else {
        setSearchResults([]);
        setShowDropdown(false);
    }
};

const searchProductById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al buscar producto:', error);
        throw error;
    }
};


const activateProduct = async (id, updatedData) => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/products/${id}`, updatedData);
        console.log('Producto actualizado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error.response.data);
        throw error;
    }
};

export {
    handleSearchChange,
    searchProductById,
    activateProduct
};
