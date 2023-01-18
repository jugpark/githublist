import { useEffect, useState } from "react";
import Presenter from "./presenter";
import { authentication } from "../../authentication/authentication";
import { octokit } from "../../authentication/authentication";

const Container = (props) => {
    const [searchObj, setSearchObj] = useState({
        // owner: null,
        // repo: null,
        owner: "octokit",
        repo: "rest.js",
        per_page: 20,
    });
    const [repoList, setRepoList] = useState([])
    const [registeredRepo, setRegisterdRepo] = useState(JSON.parse(localStorage.getItem("registeredRepo")));

    console.log(registeredRepo)

    //레포지토리 목록
    const repositoryFetch = async () => {
        const combinedArray = [];
        for (let i = 0; i < registeredRepo.length; i++) {
            await octokit.paginate(octokit.rest.issues.listForRepo, searchObj)
                .then((res) => {
                    const result = res || [];
                    if (result.length > 0) {
                        result.forEach((issue) => {
                            combinedArray.push({
                                title: issue.title,
                                repoName: registeredRepo[i].repo
                            })
                        })
                        console.log(combinedArray)
                        setRepoList(combinedArray)
                    } else {
                        console.log("존재하지 않는 레포지토리 입니다.")
                    }
                }).catch((error) => {
                    console.log(error.response.data.message)
                })
        }
    }

    //검색된 레포지토리가 있는지 확인
    const repositoryCheck = async () => {
        await octokit.paginate(octokit.rest.issues.listForRepo, searchObj)
            .then((res) => {
                const result = res || [];
                if (result.length > 0) {
                    console.log(result)
                } else {
                    console.log("존재하지 않는 레포지토리 입니다.")
                }
            }).catch((error) => {
                console.log(error.response.data.message)
            })
    }

    return (
        <Presenter
            searchObj={searchObj}
            setSearchObj={setSearchObj}
            registeredRepo={registeredRepo}
            setRegisterdRepo={setRegisterdRepo}
            repoList={repoList}
            repositoryFetch={repositoryFetch}
            repositoryCheck={repositoryCheck}
        />
    );
};
export default Container;
