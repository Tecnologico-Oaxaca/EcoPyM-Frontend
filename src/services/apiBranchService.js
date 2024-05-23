import axios from 'axios'; 

const createBranch = async (branchdata) => {
  try {
    const response = await axios.post('http://localhost:8000/api/branches', branchdata);
    return response.data; 
  } catch (error) {
    if (error.response && error.response.status === 422) {
      throw error.response.data.errors; 
    } else {
      throw new Error('Error de conexión o servidor'); 
    }
  }
};
export { createBranch };
