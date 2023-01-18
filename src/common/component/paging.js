import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PaginationSection = styled.div`
    display: flex;
    border-top: 1px solid rgb(208, 212, 217);
    height: 100px;
    justify-content: center;
`;

const Button = styled.button`
    background-color: transparent;
    color: rgb(208, 212, 217);
    border: 1px solid black;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    padding: 10px;
`;

const Pagination = ({ repoList, pagingSize, setPagingList }) => {
    const [pagingArrayList, setPadingArrayList] = useState([]);
    const [pagingCount, setPagingCount] = useState();

    const listSplit = () => {
        const splitedArray = [];

        for (let i = 0; i < repoList.length; i += pagingSize) {
            splitedArray.push(repoList.slice(i, i + pagingSize));
        }
        setPadingArrayList(splitedArray)
        setPagingList(splitedArray[0])
    }

    useEffect(() => {
        listSplit();
    }, [repoList])

    useEffect(() => {
        if(pagingCount !== null) {
            setPagingList(pagingArrayList[pagingCount])
        }
    }, [pagingCount])

    console.log(pagingCount)
    console.log(pagingArrayList)

    return (
        <PaginationSection>
            {pagingArrayList.map((count, index) => {
                return (
                    <Button onClick={() => {setPagingCount(index)}}>{index + 1}</Button>
                )
            })}
        </PaginationSection>
    );
};

export default Pagination;