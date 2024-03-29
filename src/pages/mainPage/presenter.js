import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "../../common/component/paging";
import returnDateyyyymmdd from "../../common/functions/returnDate.js"
import githubImage from "../../assets/githubImage.png"

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
    background-color: #0E1117;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const SearchSection = styled.div`
    display: flex;
    background-color: #0E1117;
    width: 100%;
    height: 80px;
    justify-content: space-between;
    box-sizing: border-box;
    position: fixed;
    padding: 10px 20px 10px 20px;
    border-bottom: 1px solid rgb(208, 212, 217);
`;

const InputSection = styled.div`
    display: flex;
`;

const SearchBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`

const Label = styled.label`
    display: flex;
    height: 20px;
    align-items: center;
    padding-left: 10px;
    color: #C8D1D9;
    font-size: 18px;
    font-weight: 500;
`;

const Input = styled.input`
    width: 200px;
    flex: 1;
    background-color: #21262C;
    border: 1px solid black;
    padding-left: 10px;
    color: #C8D1D9;
    font-size: 17px;
    font-weight: 500;
    border-radius: 10px;
`;

const SearchButton = styled.button`
    width: auto;
    flex: 1;
    color: #C8D1D9;
    font-size: 17px;
    font-weight: 700;
    border: 1px solid;
    border-radius: 10px;
    padding: 0px 10px 0px 10px;
    background-color: transparent;
    cursor: pointer;
`;

const SelectionBox = styled.div`
    width: 700px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-left: 100px;
`;

const FullBox = styled.div`
    ${({ display }) => {
        return display ? `display: flex;` : `display: none;`
    }} 
    justify-content: center;
    height: 200px;
    position: relative;
    background-color: #21262C;
    border: 1px solid #0E1117;
    border-top: 0px;
`;

const TittleBox = styled.div`
    border-bottom: 1px solid rgb(208, 212, 217);
    height: 35px;
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
    padding: 15px 10px 0px 10px;
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
    margin-top: 80px;
    background-color: #0E1117;
    flex: 1;
    overflow-y: hidden;
`;

const TableBody = styled.div`
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none;
    }
`;

const TableRow = styled.div`
    border: 1px solid #D0D4D9;
    height: 100px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    padding-left: 80px;
    cursor: pointer;
    border-radius: 20px;
`;

const RowTitle = styled.div`
    color: #F3F4F6;
    font-size: 22px;
    font-weight: 600;
    height: 50%;
`;

const RowRepoName = styled.div`
    color: #C4C8CE;
    font-size: 19px;
    font-weight: 600;
    height: 50%;
    display: flex;
    align-items: center;
`;

const Search = (props) => {

    const { validObj, searchObj, setSearchObj, repositoryCheck, repositoryFetch, registeredRepo, setRegisterdRepo, } = props
    const [displayFlag, setDisplayFlag] = useState(false)

    return (
        <SearchSection>
            <InputSection>
                <img src={githubImage} alt="" style={{ height: 50, width: 50, marginTop: 5 }} />
                <SearchBox>
                    <Label><span style={{ color: "#E95141" }}>*</span><span style={{ marginLeft: 5 }}>User</span></Label>
                    <Input
                        value={searchObj.owner}
                        onChange={(e) => {
                            setSearchObj({ ...searchObj, owner: e.target.value })
                        }}
                    />
                </SearchBox>
                <SearchBox>
                    <Label><span style={{ color: "#E95141" }}>*</span><span style={{ marginLeft: 5 }}>Repo</span></Label>
                    <Input
                        value={searchObj.repo}
                        onChange={(e) => {
                            setSearchObj({ ...searchObj, repo: e.target.value })
                        }}
                    />
                </SearchBox>
                <SearchBox>
                    <Label />
                    <SearchButton
                        onClick={() => { repositoryCheck() }}
                    >RepoSearch</SearchButton>
                </SearchBox>
            </InputSection>
            <div style={{ display: "flex" }}>
                <SelectionBox>
                    <TittleBox onClick={() => { setDisplayFlag(!displayFlag) }}>
                        Selected Repository List<span style={{ color: "#D1D1D1" }}>{!displayFlag ? `▼` : `▲ `}</span></TittleBox>
                    <FullBox display={displayFlag}>
                        <HalfBox middleLine={true}>
                            {validObj.owner && validObj.repo ? <SelectBox
                                onClick={() => {
                                    const coppiedRegisteredRepo = [...registeredRepo]
                                    coppiedRegisteredRepo.push(validObj)
                                    let result = [...new Set(coppiedRegisteredRepo)]
                                    if (result.length < 5) {
                                        setRegisterdRepo(result)
                                        localStorage.setItem("registeredRepo", JSON.stringify(result));
                                    }
                                    else {
                                        alert("Max registered repository amount is 4.")
                                        return;
                                    }
                                }}>{validObj.owner} / {validObj.repo}{<span style={{ color: "#A6CDFF" }}>{`>`}</span>}</SelectBox> : ""}
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
                <SearchButton style={{ margin: "25px 30px 0px 20px" }}
                    onClick={() => { repositoryFetch() }}
                >IssueSearch</SearchButton>
            </div>
        </SearchSection>
    )
};

const List = (props) => {
    const { repoList } = props
    const [pagingList, setPagingList] = useState(repoList)

    return (
        <Table>
            <TableBody>
                {pagingList?.map((row) => {
                    return (
                        <div
                            style={{ padding: 20 }}
                            onClick={() => {
                                let openapprove = window.confirm("Are you sure to move in?")
                                if (openapprove) {
                                    window.open(row.url)
                                } else
                                    return;
                            }}
                        >
                            <TableRow>
                                <RowRepoName><span>{row.repoName}</span><span style={{ marginLeft: 30 }}>{`Issue Created at : ${returnDateyyyymmdd(row.createdDate)}`}</span></RowRepoName>
                                <RowTitle>{row.title}</RowTitle>
                            </TableRow>
                        </div>
                    )
                })}
            </TableBody>
            <Pagination
                repoList={repoList}
                setPagingList={setPagingList}
                pagingSize={10}
                pageCount={5}
            />
        </Table>
    )
}