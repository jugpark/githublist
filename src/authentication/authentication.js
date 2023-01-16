import { useEffect, useState } from "react";
import { Octokit } from "octokit";

export const octokit = new Octokit({
    auth: process.env.REACT_APP_GIT_TOKEN
});

export const authentication = async () => {
    await octokit.request('GET /user', {}).then((res) => {
        if (res.status == 200) {
            return true;
        }
        else {
            return false;
        }
    }).catch((err) => {
        console.log(err.response.message)
    })
}

