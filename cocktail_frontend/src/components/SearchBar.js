import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from "../images/Search-Icon.svg";

const SearchWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
`;

const Search = styled.div`
  position: relative;
  border: 1px solid #fff;
  border-radius: 8px;
  height: 40px;
  overflow: hidden;
  transition: 0.3s all ease-in-out;

  &:focus-within {
    outline: 1px solid rgba(255,255,255,0.6);
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: 0;
  height: 38px;
  color: #fff;
  font-size: 14px;
  line-height: 21px;
  padding: 0 16px 0 40px;
  transition: 0.3s all ease-in-out;

  &:focus {
    background-color: rgba(255,255,255,0.2);
  }
`;

const SearchIconWrapper = styled.img`
  position: absolute;
  left: 10px;
  height: 20px;
  width: 20px;
  top: 25%;
  z-index: -1;
`;

const SearchButton = styled.button`
  background-color: transparent;
  color: #fff;
  border-width: 0 0 0 1px;
  border-color: #fff;
  border-style: solid;
  height: 40px;
  width: 48px;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s all ease-in-out;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const SearchBar = ({ onSearch, redirectToList }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (redirectToList) {
      redirectToList(); // redirect to list page if on details
    }
    onSearch(query);
  };

  return (
    <SearchWrap>
      <Search>
        <SearchIconWrapper src={SearchIcon} alt="Search" />
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search all drinks"
        />
        <SearchButton onClick={handleSearch}>GO</SearchButton>
      </Search>
    </SearchWrap>
  );
};

export default SearchBar;