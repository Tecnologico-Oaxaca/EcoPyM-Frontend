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


export {
    handleSearchChange,
    searchProductById
};
