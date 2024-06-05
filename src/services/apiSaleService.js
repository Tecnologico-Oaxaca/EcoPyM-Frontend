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
        throw error;
    }
};


const activateProduct = async (id, updatedData) => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/products/${id}`, updatedData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    handleSearchChange,
    searchProductById,
    activateProduct
};
