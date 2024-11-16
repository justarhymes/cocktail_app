import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const searchCocktails = (query, offset = 0, limit = 10) => {
  const params = new URLSearchParams({
    query,
    index: offset,
    limit,
  }).toString();

  return axios.get(`${API_BASE_URL}/search?${params}`);
}

export const getCocktailDetails = (id) => {
  return axios.get(`${API_BASE_URL}/detail`, {
    params: { id }
  });
};