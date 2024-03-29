import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PaginationSection = styled.div`
    ${({ display }) => {
        return display ? `display: flex` : `display: none`
    }};
    border-top: 1px solid rgb(208, 212, 217);
    height: 80px;
    justify-content: center;
    margin-bottom: 20px;
`;

const Button = styled.button`
    ${({ display }) => {
        return display ? `display: flex` : `display: none`
    }};
    background-color: transparent;
    color: rgb(208, 212, 217);
    border: 0;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    padding: 10px;
    align-items: center;
    ${({ current }) => {
        return current ? `border-bottom: 1px solid rgb(208, 212, 217)` : null;
    }}
`;

const Pagination = ({ repoList, pagingSize, setPagingList, pageCount }) => {
    const [pagingArrayList, setPadingArrayList] = useState([]);
    const [pagingObj, setPagingObj] = useState({
        start: 0
    });
    const [currentPage, setCurrentPage] = useState(0)

    const listSplit = () => {
        const splitedArray = [];

        for (let i = 0; i < repoList.length; i += pagingSize) {
            splitedArray.push(repoList.slice(i, i + pagingSize));
        }
        setPadingArrayList(splitedArray)
        setPagingObj({ ...pagingObj, maxPage: splitedArray.length })
        setPagingList(splitedArray[0])
    }

    useEffect(() => {
        listSplit();
    }, [repoList])

    useEffect(() => {
        if (currentPage !== null) {
            setPagingList(pagingArrayList[currentPage])
        }
        if (currentPage % pageCount === 0) {
            setPagingObj({ ...pagingObj, start: currentPage })
        }
    }, [currentPage])

    return (
        <PaginationSection display={pagingArrayList.length > 0 ? true : false}>
            <Button display={pagingObj.start !== 0 ? true : false} onClick={() => { setCurrentPage(pagingObj.start - pageCount) }}>{`<`}</Button>
            {Array(pageCount).fill().map((value, index) => {
                return (
                    <Button current={currentPage === pagingObj.start + index ? true : false} display={pagingObj.start + index + 1 <= pagingObj.maxPage ? true : false} onClick={() => { setCurrentPage(pagingObj.start + index) }}>{pagingObj.start + index + 1}</Button>
                )
            })}
            <Button display={pagingObj.start + 1 < pagingObj.maxPage ? true : false} onClick={() => { setCurrentPage(pagingObj.start + pageCount) }}>{`>`}</Button>
        </PaginationSection>
    );
};

export default Pagination;