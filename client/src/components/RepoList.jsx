import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List </h4>
    There are {props.repos.length} repos.
    <div>
      { props.repos.map((repo, index) => 
        <RepoListItem key={index} repo={repo} />)
      }
    </div>
  </div>
)

export default RepoList;