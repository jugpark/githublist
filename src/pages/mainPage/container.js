import { useEffect, useState } from "react";
import Presenter from "./presenter";
import { authentication } from "../../authentication/authentication";
import { octokit } from "../../authentication/authentication";

const Container = (props) => {
    const [searchObj, setSearchObj] = useState({
        owner: "octocat",
        repo: "Spoon-Knife",
    });

    const repositoryFetch = async () => {
        await octokit.request(`GET /repos/${searchObj.owner}/${searchObj.repo}/issues`).then((res) => {
            console.log(res)
        })
    }

    useEffect(() => {
        authentication();
    }, [])

    return (
        <Presenter
            searchObj={searchObj}
            setSearchObj={setSearchObj}
        />
    );
};
export default Container;
