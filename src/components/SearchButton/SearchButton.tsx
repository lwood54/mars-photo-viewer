import React from "react";
import styled from "styled-components";

const SearchSC = styled.button`
  height: 35px;
  width: 150px;
  cursor: pointer;
  position: relative;
  background-color: white;
  border-radius: 3px;
  outline: none;
  &:hover {
    border: 3px solid black;
  }
  &:active {
    color: white;
    background-color: #696b6b;
    border: none;
    outline: none;
  }
`;

interface Props {
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}

function SearchButton({ handleClick }: Props) {
  return (
    <SearchSC data-testid="search-button" onClick={handleClick}>
      search
    </SearchSC>
  );
}

export default SearchButton;
