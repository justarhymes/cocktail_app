import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import * as api from '../services/api';

// Mock the API
jest.mock('../services/api', () => ({
  searchCocktails: jest.fn(),
}));

// Mock data for testing
const mockDrinksPage1 = {
  drinks: [
    { id: 1, name: 'Van Vleet', slug: 'van-vleet', category: 'Ordinary Drink', image: 'https://www.example.com/image1.jpg' },
    { id: 2, name: 'Just a Moonmint', slug: 'just-a-moonmint', category: 'Shake', image: 'https://www.example.com/image2.jpg' },
  ],
  totalCount: 20,
};

const mockDrinksPage2 = {
  drinks: [
    { id: 3, name: 'Blue Lagoon', slug: 'blue-lagoon', category: 'Ordinary Drink', image: 'https://www.example.com/image3.jpg' },
    { id: 4, name: 'Tipperary', slug: 'tipperary', category: 'Cocktail', image: 'https://www.example.com/image4.jpg' },
  ],
  totalCount: 20,
};

// Test suite
describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it('fetches and displays cocktails on initial load', async () => {
    api.searchCocktails.mockResolvedValueOnce({ data: mockDrinksPage1 });

    render(<App />);

    // Wait for the initial API call
    await waitFor(() => expect(api.searchCocktails).toHaveBeenCalledWith('', 0, 10));

    // Verify that the cocktails are rendered
    expect(screen.getByText('Van Vleet')).toBeInTheDocument();
    expect(screen.getByText('Just a Moonmint')).toBeInTheDocument();
  });

  it('updates cocktails when a search is performed', async () => {
    // Mock API responses specific to this test
    api.searchCocktails.mockResolvedValueOnce({ data: mockDrinksPage1 }); // Initial load
    api.searchCocktails.mockResolvedValueOnce({ data: mockDrinksPage1 }); // Search query
  
    render(<App />);
  
    // Interact with the search bar
    const searchInput = screen.getByPlaceholderText('Search all drinks');
    const searchButton = screen.getByText('GO');
  
    // Perform search
    fireEvent.change(searchInput, { target: { value: 'Margarita' } });
    fireEvent.click(searchButton);
  
    // Wait for the API call with the search query
    await waitFor(() => expect(api.searchCocktails).toHaveBeenCalledWith('Margarita', 0, 10));
  
    // Verify the rendered result matches the mock response
    expect(screen.getByText('Van Vleet')).toBeInTheDocument();
  });  

  it('handles pagination correctly', async () => {
    api.searchCocktails.mockResolvedValueOnce({ data: mockDrinksPage1 });
    api.searchCocktails.mockResolvedValueOnce({ data: mockDrinksPage2 });

    render(<App />);

    // Wait for the initial API call
    await waitFor(() => expect(api.searchCocktails).toHaveBeenCalledWith('', 0, 10));

    // Simulate clicking the "Next" button
    const nextButton = screen.getByAltText('Next Page').closest('button');
    fireEvent.click(nextButton);

    // Wait for the API call for the next page
    await waitFor(() => expect(api.searchCocktails).toHaveBeenCalledWith('', 10, 10));

    // Verify the next page results are rendered
    expect(screen.getByText('Blue Lagoon')).toBeInTheDocument();
    expect(screen.getByText('Tipperary')).toBeInTheDocument();
  });
});
