import React, { Fragment, useState } from "react";
import styled from "styled-components";

const Presenter = (props) => {
    return (
        <>
            <Backgroud>
                <Search {...props}></Search>
                <List {...props}></List>
            </Backgroud>
        </>
    );
};

export default Presenter;

const Backgroud = styled.div`
    background-color: white;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const SearchSection = styled.div`
    display: flex;
    background-color: white;
    width: 100%;
    height: 80px;
    justify-content: space-between;
    box-sizing: border-box;
    position: fixed;
    margin-botton: 20px;
    padding: 0px 20px 0px 20px;
`;

const InputSection = styled.div`
    display: flex;
`;

const SearchBox = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    display: flex;
    height: 20px;
    align-items: center;
    padding-left: 10px;
`;

const Input = styled.input`
    width: 200px;
    flex: 1;
    background-color: white;
    border: 1px solid black;
    padding-left: 10px;
`;

const SearchButton = styled.button`
    width: 100px;
    height: auto;
`;

const SelectionBox = styled.div`
    border: 1px solid #D0D4D9;
    width: 400px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-left: 50px;
`;

const FullBox = styled.div`
    ${({ display }) => {
        return display ? `display: flex;` : `display: none;`
    }} 
    justify-content: center;
    height: 250px;
    position: relative;
`;

const TittleBox = styled.div`
    border-bottom: 1px solid rgb(208, 212, 217);
    height: 50px;
    display: flex;
    align-items: center;
    padding: 10px;
    color: rgb(208, 212, 217);
    justify-content: space-between;
    cursor: pointer;
`;

const HalfBox = styled.div`
    width: 50%;
    overflow: auto;
    padding: 5px;
    &::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none;
    }
    ${({ middleLine }) => {
        return middleLine ? `border-right: 1px solid #D0D4D9` : null;
    }}
`;

const SelectBox = styled.div`
    border: 1px solid #A6CDFF;
    color: #A6CDFF;
    margin-bottom: 5px;
    border-radius: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 10px;
    justify-content: space-between;
    cursor: pointer;
`;

const SelectedBox = styled.div`
    border: 1px solid #D0D4D9;
    background-color: #EFEFEF;
    color: black;
    margin-bottom: 5px;
    border-radius: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 10px;
    justify-content: space-between;
    cursor: pointer;
`;

const Table = styled.div`
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    
`;

const TableBody = styled.div`

`;

const TableRow = styled.div`
    border: 1px solid #D0D4D9;
`;

const Search = (props) => {

    const { searchObj, setSearchObj, repositoryFetch, registeredRepo, setRegisterdRepo, } = props
    const [displayFlag, setDisplayFlag] = useState(false)

    return (
        <SearchSection>
            <InputSection>
                <SearchBox>
                    <Label>user</Label>
                    <Input
                        value={searchObj.owner}
                        onChange={(e) => {
                            setSearchObj({ ...searchObj, owner: e.target.value })
                        }}
                    />
                </SearchBox>
                <SearchBox>
                    <Label>repo</Label>
                    <Input
                        value={searchObj.repo}
                        onChange={(e) => {
                            setSearchObj({ ...searchObj, repo: e.target.value })
                        }}
                    />
                </SearchBox>
                <SelectionBox>
                    <TittleBox>
                        Selected Repository List<span onClick={() => { setDisplayFlag(!displayFlag) }} style={{ color: "#D1D1D1" }}>{`>`}</span></TittleBox>
                    <FullBox display={displayFlag}>
                        <HalfBox middleLine={true}>
                            <SelectBox
                                onClick={() => {
                                    const coppiedRegisteredRepo = [...registeredRepo]
                                    coppiedRegisteredRepo.push(searchObj)
                                    console.log(coppiedRegisteredRepo)
                                    let result = [...new Set(coppiedRegisteredRepo)]
                                    console.log(result)
                                    if (result.length < 5) {
                                        setRegisterdRepo(result)
                                        localStorage.setItem("registeredRepo", JSON.stringify(result));
                                    }
                                    else {
                                        alert("등록할 수 있는 레포지토리의 최대개수는 4개 까지입니다.")
                                        return;
                                    }
                                }}>{searchObj.owner} / {searchObj.repo}{<span style={{ color: "#A6CDFF" }}>{`>`}</span>}</SelectBox>
                        </HalfBox>
                        <HalfBox>
                            {registeredRepo?.map((e) => {
                                return (
                                    <SelectedBox
                                        onClick={() => {
                                            const coppiedRegisteredRepo = [...registeredRepo]
                                            const filtered = coppiedRegisteredRepo.filter((value) => { return value !== e })
                                            let result = [...new Set(filtered)]
                                            setRegisterdRepo(result)
                                            localStorage.setItem("registeredRepo", JSON.stringify(result));
                                        }}> {e.owner} / {e.repo}{<span style={{ color: "#FF0000" }}>{`X`}</span>}
                                    </SelectedBox>
                                )
                            })}
                        </HalfBox>
                    </FullBox>
                </SelectionBox>
            </InputSection>
            <SearchButton
                onClick={() => { repositoryFetch() }}
            >조회</SearchButton>
        </SearchSection>
    )
};

const List = (props) => {
    const { repoList } = props
    return (
        <Table>
        <Header>1</Header>
        <TableBody>
            {repoList.map((row) => {
                return (
                <TableRow>{row.title}</TableRow>
            )})}
        </TableBody>
        </Table>
    )
}