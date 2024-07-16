import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import SearchBar from "./SearchBar";
import RepositoryList from "./RepositoryList";
import Paginator from "./Paginator";
import {
  $searchQuery,
  $repositories,
  $userRepositories,
  setSearchQuery,
  setAfterCursor,
  $page,
  setPage,
  $afterCursor,
  setRepositories,
  Repository,
} from "../model";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../../shared/hooks/saveToLocalStorage";

const MainPage: React.FC = () => {
  const [
    searchQuery,
    repositories,
    userRepositories,
    currentPage,
    afterCursor,
    setSearchQueryHandler,
    setPageHandler,
    setRepositoriesHandler,
  ] = useUnit([
    $searchQuery,
    $repositories,
    $userRepositories,
    $page,
    $afterCursor,
    setSearchQuery,
    setPage,
    setRepositories,
  ]);

  useEffect(() => {
    const searchQueryfromLocal = loadFromLocalStorage<string>("searchQuery");
    const pageFromLocal = loadFromLocalStorage<number>("currentPage");
    const repositoriesFromLocal =
      loadFromLocalStorage<Repository[]>("repositories");

    if (searchQueryfromLocal) {
      setSearchQueryHandler(searchQueryfromLocal);
    }
    if (pageFromLocal) {
      setPageHandler(pageFromLocal);
    }
    if (repositoriesFromLocal) {
      setRepositoriesHandler(repositoriesFromLocal);
    }
  }, [setSearchQueryHandler, setPageHandler, setRepositoriesHandler]);

  useEffect(() => {
    saveToLocalStorage("searchQuery", searchQuery);
    saveToLocalStorage("currentPage", currentPage);
    saveToLocalStorage("repositories", repositories);
  }, [searchQuery, currentPage, repositories]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setPageHandler(page);

      if (page > 1 && afterCursor !== null) {
        setAfterCursor(null);
      }
    }
  };

  const repositoriesToShow =
    searchQuery === "" ? userRepositories : repositories;

  return (
    <div className="MainPage">
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQueryHandler(e.target.value)}
      />
      <RepositoryList repositories={repositoriesToShow} query={searchQuery} />
      <Paginator currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default MainPage;
