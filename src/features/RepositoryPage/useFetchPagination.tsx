import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchRepositoriesFx,
  fetchSelectedRepositoryFx,
  Repository,
} from "../../pages/MainPage/model";
interface UseFetchRepoProps {
  query: string;
  currentPage: number;
}
export const useFetchPagination = ({
  query,
  currentPage,
}: UseFetchRepoProps) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const preLoad = async () => {
      setLoading(true);
      if (query && currentPage) {
        const selectedRepository = await fetchRepositoriesFx({
          query,
          page: currentPage,
        });
        setData(selectedRepository);
      }
    };
    preLoad();
    setLoading(false);
  }, [query, currentPage]);
  return {
    data,
    loading,
  };
};
