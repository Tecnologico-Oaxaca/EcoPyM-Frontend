import axios from 'axios';

const createUsers = async (usersdata) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users', usersdata);
      return response.data; 
    } catch (error) {
      if (error.response && error.response.status === 422) {
        throw error.response.data.errors; 
      } else {
        throw new Error('Error de conexión o servidor'); 
      }
    }
  };

  const verifyCode = async (codeData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/code', codeData);
      return response.data; 
    } catch (error) {
      if (error.response && error.response.status === 422) {
        throw error.response.data.errors; 
      } else {
        throw new Error('Error de conexión o servidor'); 
      }
    }
  };
  const updateUser = async (userId, updateData) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/users/${userId}`, updateData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw error.response.data.errors;
      } else {
        throw new Error('Error en la validacion de los datos');
      }
    }
  };
  

  export { 
    createUsers,
    verifyCode,
    updateUser,
  };
  