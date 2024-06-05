import axios from 'axios';

const showProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/productsIsActive'); // Corrige la URL
    if (response.status !== 200) {
      throw new Error("No se pudo conectar con la API");
    }
    const data = response.data;
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  
  }
};

export { 
  showProducts 
};
