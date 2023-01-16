import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Presenter = (props) => {
    return (
        <>
            <Backgroud>
                <Search></Search>
            </Backgroud>
        </>
    );
};

export default Presenter;

const Search = (props) => {
    return (
        <SearchSection>
            <SearchButton>123</SearchButton>
        </SearchSection>
    )
}

const Backgroud = styled.div`
    background-color: yellowgreen;
    height: 100vh;
    overflow: auto;
    width: 100%;
`
 
const SearchButton = styled.button`
    width: 100px;
    height: 100px;
`
const SearchSection = styled.div`
    width: 100%;
    background-color: white;
    height: 100px;
`