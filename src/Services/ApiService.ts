import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
        console.log('API Response Object:', response);
        console.log('Data from API:', response.data); // Access the data property of the response object
        return response.data; // You can return the data for further processing if needed
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error for further handling, if necessary
    }
  };

  fetchData()