import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const Title = styled.h1`
  display: none;
  margin: 0;
  font-weight: 400;
  font-size: 24px;
  height: 70px;
  line-height: 70px;
  position: absolute;
  left: 32px;

  @media (min-width: 610px) {
    display: block;
  }
`;

const MainNav = styled.header`
  position: relative;
  height: 70px;
  padding: 0 32px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.2)
`;

const Header = ({handleSearch, redirectToList }) => {

  return (
    <MainNav>
      <Title>BarCraft</Title>
      <SearchBar onSearch={handleSearch} redirectToList={redirectToList} />
    </MainNav>
  )
}

export default Header;