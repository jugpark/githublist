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
    });
    const [searchedRepo, setSearchedRepo] = useState([])
    const [registeredRepo, setRegisterdRepo] = useState(JSON.parse(localStorage.getItem("registeredRepo")));

    console.log(registeredRepo)

    //검색된 레포지토리가 있는지 확인
    const repositoryFetch = async () => {
        // await octokit.request(`GET /repos/${searchObj.owner}/${searchObj.repo}/issues`).then((res) => {
        //     setSearchedRepo(res.data)
        //     console.log(res.data)
        // }).catch((error) => {
        //     console.log(error.response.data.message)
        // })
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
            repositoryFetch={repositoryFetch}
        />
    );
};
export default Container;
