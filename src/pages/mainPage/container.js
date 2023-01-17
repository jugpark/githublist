import { useEffect, useState } from "react";
import Presenter from "./presenter";
import { authentication } from "../../authentication/authentication";
import { octokit } from "../../authentication/authentication";

const Container = (props) => {
    const [searchObj, setSearchObj] = useState({
        owner: null,
        repo: null,
    });
    const [searchedRepo, setSearchedRepo] = useState([])
    const [registeredRepo, setRegisterdRepo] = useState([]);

    // owner: "octocat",
    // repo: "Spoon-Knife",

    console.log(searchObj)
    console.log(searchedRepo)

    const repositoryFetch = async () => {
        await octokit.request(`GET /repos/${searchObj.owner}/${searchObj.repo}/issues`).then((res) => {
            setSearchedRepo(res.data)
            console.log(res.data)
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
