const showRoles = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/roles');
      if (!response.ok) {
        throw new Error("No se pudo conectar con la API");
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;  
    }
  };

  export { showRoles };