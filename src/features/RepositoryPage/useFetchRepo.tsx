import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSelectedRepositoryFx,
  Repository,
} from "../../pages/MainPage/model";

export const useFetchRepo = () => {
  const [data, setData] = useState<Repository | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { owner, name } = useParams<{ owner: string; name: string }>();

  useEffect(() => {
    const preLoad = async () => {
      setLoading(true);
      if (owner && name) {
        const selectedRepository = await fetchSelectedRepositoryFx({
          owner,
          name,
        });
        setData(selectedRepository);
      }
    };
    preLoad();
    setLoading(false);
  }, [owner, name, data]);
  return {
    data,
    loading,
  };
};
