import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Presenter = (props) => {
    return (
        <>
            <Backgroud>
                <Search {...props}></Search>
            </Backgroud>
        </>
    );
};

export default Presenter;

const Search = (props) => {
    const { searchObj, setSearchObj, repositoryFetch } = props
    return (
        <SearchSection>
            <InputSection>
                <SearchBox>
                    <Label>user</Label>
                    <Input
                        onChange={(e) => {
                            setSearchObj({ ...searchObj, owner: e.target.value })
                        }}
                    />
                </SearchBox>
                <SearchBox>
                    <Label>repo</Label>
                    <Input
                        onChange={(e) => {
                            setSearchObj({ ...searchObj, repo: e.target.value })
                        }}
                    />
                </SearchBox>
            </InputSection>
            <SearchButton
                onClick={() => { repositoryFetch() }}
            >조회</SearchButton>
        </SearchSection>
    )
}

const Backgroud = styled.div`
    background-color: white;
    height: 100vh;
    width: 100%;
`;

const SearchSection = styled.div`
    display: flex;
    background-color: white;
    height: 65px;
    justify-content: space-between;
    box-sizing: border-box;
    position: relative;
    margin-top: 20px;
    padding: 0px 20px 0px 20px;
`;

const InputSection = styled.div`
    display: flex;
`;

const SearchBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Label = styled.label`
    display: flex;
    justify-content: center;
    height: 30px;
    align-items: center;
`;

const Input = styled.input`
    width: 200px;
    height: 70px;
    background-color: rebeccapurple;
`;

const SearchButton = styled.button`
    width: 100px;
    height: auto;
`;