import React from "react";
import { Link } from "react-router-dom";
import { Repository } from "../model";

interface RepositoryListProps {
  repositories: Repository[];
  query: string;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  query,
}) => {
  if (!repositories) {
    return <div>No repositories found.</div>;
  }

  return (
    <ul
      style={{
        width: "378px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2px",
      }}
    >
      {query === ""
        ? repositories?.map((repo) => (
            <li key={repo.id}>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              - {repo.stargazerCount} stars - Last updated:{" "}
              {new Date(repo.updatedAt).toLocaleDateString()}
            </li>
          ))
        : repositories?.map((repo) => (
            <li
              style={{
                border: "1px solid #FFFFFF",
                listStyle: "none",
                width: "100%",
                padding: "4px",
              }}
              key={repo.id}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                {repo.owner ? (
                  <Link to={`/repositories/${repo.owner.login}/${repo.name}`}>
                    {repo.name}
                  </Link>
                ) : (
                  <span>{repo.name}</span>
                )}
                <span>
                  updated: {new Date(repo.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>stars: {repo.stargazerCount}</div>
                <div>
                  <a target="_blank" href={repo.url} rel="noopener noreferrer">
                    view
                  </a>
                </div>
              </div>
            </li>
          ))}
    </ul>
  );
};

export default RepositoryList;
