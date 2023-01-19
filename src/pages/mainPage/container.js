import { useState } from "react";
import Presenter from "./presenter";
import { octokit } from "../../authentication/authentication";

const Container = (props) => {
    const [searchObj, setSearchObj] = useState({
        owner: null,
        repo: null,
    });
    const [validObj, setValidObj] = useState({})
    const [repoList, setRepoList] = useState([])
    const [registeredRepo, setRegisterdRepo] = useState(JSON.parse(localStorage.getItem("registeredRepo")) || []);

    console.log(registeredRepo)

    //레포지토리 목록
    const repositoryFetch = async () => {
        const combinedArray = [];
        for (let i = 0; i < registeredRepo.length; i++) {
            await octokit.paginate(octokit.rest.issues.listForRepo, registeredRepo[i])
                .then((res) => {
                    const result = res || [];
                    if (result.length > 0) {
                        result.forEach((issue) => {
                            combinedArray.push({
                                title: issue.title,
                                repoName: registeredRepo[i].repo,
                                createdDate: issue.created_at,
                                url: issue.html_url
                            })
                        })
                    }
                }).catch((error) => {
                    alert(error.response.data.message)
                })
        }
        setRepoList(combinedArray)
    }

    //검색된 레포지토리가 있는지 확인
    const repositoryCheck = async () => {
        if(searchObj.owner && searchObj.repo) {
            await octokit.paginate(octokit.rest.issues.listForRepo, searchObj)
            .then((res) => {
                const result = res || [];
                if (result.length > 0) {
                    setValidObj(searchObj)
                    alert("Exist!")
                } else {
                    alert("존재하지 않는 레포지토리 입니다.")
                }
            }).catch((error) => {
                setValidObj({})
                alert(error.response.data.message)
            })
        } else {
            alert("Owner and RepoName is required field.")
        }
    }

    return (
        <Presenter
            //obj
            validObj={validObj}
            searchObj={searchObj}
            setSearchObj={setSearchObj}
            registeredRepo={registeredRepo}
            setRegisterdRepo={setRegisterdRepo}
            repoList={repoList}
            setRepoList={setRepoList}

            //function
            repositoryFetch={repositoryFetch}
            repositoryCheck={repositoryCheck}
        />
    );
};
export default Container;
