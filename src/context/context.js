import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [error, setError] = useState({ show: false, msg: "" });

  const toogleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  // request loading
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchGithubUser = async (user) => {
    toogleError();
    setLoading(true);
    await axios
      .get(`${rootUrl}/users/${user}`)
      .then((response) => {
            setGithubUser(response.data);    
        })
      .catch(() => {
         setLoading(false)
          toogleError(true, "there is no user with that username")}
          );
      
      await axios
        .get(`${rootUrl}/users/${user}/repos?per_page=100`)
        .then((response) => setRepos(response.data));
      await axios
        .get(`${rootUrl}/users/${user}/followers`)
        .then((response) =>{

            setFollowers(response.data);
        } )
  
    checkRequests();
    setLoading(false);
  };

  const checkRequests = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then((response) => {
        const remaning = response.data.rate.remaining;
        setRequests(remaning);
        if (remaning === 0) {
          toogleError(true, "Sorry you have exceeded your hourly limit!");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        followers,
        repos,
        requests,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
