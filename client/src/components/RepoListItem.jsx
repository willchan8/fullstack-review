import React from 'react';

const RepoListItem = (props) => (
  <div>
    <h2>{props.repo.username}</h2>
    <img src={props.repo.avatar_url} />
    <div>{props.repo.repo_name}</div>
    <div>{props.repo.repo_url}</div>
    <div>{props.repo.forks}</div>
  </div>
)

export default RepoListItem;