import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios globally
jest.mock('axios');

// Provide default mock implementations
axios.get.mockImplementation(() => Promise.resolve({ data: {} }));
axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

// Correct import path for the API service
jest.mock('./services/api', () => ({
  searchCocktails: jest.fn(() =>
    Promise.resolve({
      data: {
        drinks: [{ id: '1', name: 'Margarita' }],
        totalCount: 20,
      },
    })
  ),
  getCocktailDetails: jest.fn(),
}));
