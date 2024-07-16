import React from "react";
import { Repository } from "../../MainPage/model";

interface RepositoryDetailsProps {
  repository: Repository | undefined;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({
  repository,
}) => {
  return (
    <div className="repository-details">
      {repository ? (
        <>
          <div className="left-column">
            <img
              className="avatar"
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
            />
            <p className="owner-name">
              <a href={repository.owner.url}>{repository.owner.login}</a>
            </p>
          </div>
          <div className="right-column">
            <div className="header">
              <h2>{repository.name}</h2>
              <p className="stars">Stars: {repository.stargazerCount}</p>
            </div>
            <p className="updated">
              Last updated:{" "}
              {repository.updatedAt
                ? new Date(repository.updatedAt).toLocaleDateString()
                : ""}
            </p>
            <div className="languages">
              <p>Languages:</p>
              <ul>
                {repository.languages.nodes.map((lang, index) => (
                  <li key={index}>{lang.name}</li>
                ))}
              </ul>
            </div>
            <p className="description">{repository.description}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RepositoryDetails;
