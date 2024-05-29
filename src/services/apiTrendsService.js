import axios from 'axios';

// Función para obtener las tendencias que no están en la tabla de productos
const getCompararTendencias = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/trends/comparar');
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            throw error.response.data.errors;
        } else {
            throw new Error('Error de conexión o servidor');
        }
    }
};

export {
    getCompararTendencias,
};
