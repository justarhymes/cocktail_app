import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const searchCocktails = (query, offset = 0, limit = 10) => {
  return axios.get(`${API_BASE_URL}/search`, {
    params: {
      query,
      index: offset,
      limit,
    },
  });
};

export const getCocktailDetails = (id) => {
  return axios.get(`${API_BASE_URL}/detail`, {
    params: { id }
  });
};