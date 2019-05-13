import React from 'react';

const RepoListItem = (props) => (
  <div>
    <h2>Username: {props.repo.username}</h2>
    <img src={props.repo.avatar_url} />
    <div>Repo Name: <a href={props.repo.repo_url}>{props.repo.repo_name}</a></div>
    <div>Repo URL: {props.repo.repo_url}</div>
    <div>Forks: {props.repo.forks}</div>
  </div>
)

export default RepoListItem;