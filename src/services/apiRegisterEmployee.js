import axios from 'axios'; 

const createRegisterEmployes = async (registerEmployesData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/registerEmployee', registerEmployesData);
    return response.data; 
  } catch (error) {
    if (error.response && error.response.status === 422) {
      throw error.response.data.errors; 
    } else {
      throw new Error('Error de conexión o servidor'); 
    }
  }
};
export { createRegisterEmployes };