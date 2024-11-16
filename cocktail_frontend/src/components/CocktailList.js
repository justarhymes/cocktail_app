import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { DetailCategory } from './shared/StyledComponents';

import PrevIcon from "../images/Prev-Icon.svg";
import NextIcon from "../images/Next-Icon.svg";

const CocktailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 40px;
  width: 900px;
  max-width: 90%;
  margin: 0 auto;
  gap: 24px;
`;

const CocktailListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 24px;
    line-height: 24px;
    margin: 0;
  }
`

const CocktailListResults = styled.strong`
  font-size: 20px;
  line-height: 24px;
`;

const Cocktail = styled(Link)`
  color: #fff;
  display: flex;
  width: 100%;
  gap: 16px;
  padding: 16px;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 8px;

  img {
    width: 137px;
    height: auto;
  }

  h3 {
    color: #fff;
    font-size: 24px;
    line-height: 24px;
    margin: 0 0 16px;
  }

  @media (min-width: 801px) {
    width: calc(50% - 46px);
  }
`;

const CocktailPagination = styled.div`
  width: 100%;;
  display: flex;
`;

const CocktailPaginationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  img {
    width: 24px;
    height: 24px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CocktailList = ({ 
  cocktails, 
  searchPhrase,
  currentPage,
  totalCount,
  totalPages,
  onPageChange, 
}) => {

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <CocktailContainer>
      <CocktailListHeader>
        <h2>{searchPhrase ? `Search: ${searchPhrase}` : "All Drinks"}</h2>
        {searchPhrase && totalCount > 0 && 
          <CocktailListResults>{totalCount} Result{totalCount > 1 ? "s" : ""}</CocktailListResults>
        }
      </CocktailListHeader>
      {cocktails.length > 0 ? (
        cocktails.map((cocktail) => (
          <Cocktail key={cocktail.id} to={`/share/${cocktail.slug || cocktail.id}`}>
            <img src={cocktail.image} alt={cocktail.name} />
            <div>
              <h3>{cocktail.name}</h3>
              <DetailCategory>{cocktail.category}</DetailCategory>
            </div>
          </Cocktail>
        ))
      ) : (
        <p>No cocktails found.</p>
      )}
      <CocktailPagination>
        <CocktailPaginationButton onClick={handlePrev} disabled={currentPage === 1}>
          <img src={PrevIcon} alt="Previous Page" />
        </CocktailPaginationButton>
        <CocktailPaginationButton onClick={handleNext} disabled={currentPage === totalPages}>
          <img src={NextIcon} alt="Next Page" />
        </CocktailPaginationButton>
      </CocktailPagination>
    </CocktailContainer>
  );
};

export default CocktailList;