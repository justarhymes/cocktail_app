import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Header from './components/Header';
import CocktailList from './components/CocktailList';
import CocktailDetail from './components/CocktailDetail';
import { searchCocktails } from './services/api';
import LoadingOverlay from "./components/LoadingOverlay";

import bg from "./images/bg.jpg"

const Container = styled.div`
  font-family: 'Varela Round', sans-serif;
`;

const BGImage= styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background-image: url("${bg}");
  background-repeat: no-repeat;
  opacity: 0.2;
`;

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resultsPerPage = 10;

  // Fetch cocktails based on search and pagination
  const fetchCocktails = (query, page) => {
    setLoading(true);
    const offset = (page - 1) * resultsPerPage;

    searchCocktails(query, offset, resultsPerPage).then((response) => {
      setCocktails(response.data.drinks || []); // Current page results
      setTotalPages(Math.ceil(response.data.totalCount / resultsPerPage)); // Total pages
      setTotalCount(response.data.totalCount)
      setLoading(false);
    });
  };

  const handleSearch = (query) => {
    setSearchPhrase(query);
    setCurrentPage(1); 
    fetchCocktails(query, 1); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCocktails(searchPhrase, page); // Fetch results for the new page
  };

  useEffect(() => {
    fetchCocktails("", 1); 
  }, []);

  const AppWrapper = () => {
    const navigate = useNavigate();

    const redirectToList = () => {
      navigate("/"); // Redirect the user to the list page
    };

    return (
      <Container>
        <Header handleSearch={handleSearch} redirectToList={redirectToList} />
        <Routes>
          <Route
            path="/"
            element={
              <CocktailList 
                cocktails={cocktails}
                searchPhrase={searchPhrase}
                currentPage={currentPage}
                totalCount={totalCount}
                totalPages={totalPages}
                onPageChange={handlePageChange} 
              />
            }
          />
          <Route
            path="/share/:slug"
            element={<CocktailDetail />}
          />
        </Routes>
        <BGImage />
      </Container>
    );
  };

  return (
    <Router future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      {loading && <LoadingOverlay text="Searching" />}
      <AppWrapper />
    </Router>
  );
}

export default App;