import React from 'react';

const RepoItem = (props) => {
  const repo = props.repo;
  return (
    <div style={{'border': '2px solid #ccc', 'background': '#eee','borderRadius': '8px', 'padding': '4px', 'margin': '4px'}}>
        <h4>
          <a href={repo.userUrl} target='_blank'>{repo.username}</a> /
          <a href={repo.url} target='_blank'>{repo.name}</a>
        </h4>
        <span>Watchers: {repo.watchers}</span><br />
        <span>Forks: {repo.forks}</span><br />
        <span>Created at: {new Date(repo.createdAt).toLocaleString()}</span><br />
        <span>Last Updated at: {new Date(repo.updatedAt).toLocaleString()}</span><br />
    </div>
  )
}
const RepoList = (props) => (
  <div style={{'fontFamily': 'Verdana, sans-serif'}}>
    <h4> Repo List</h4>
    There are {props.repos.length} repos:
    {props.repos.map(repo =>
    <RepoItem key={repo.repoId} repo={repo} />
    )}
  </div>
)

export default RepoList;