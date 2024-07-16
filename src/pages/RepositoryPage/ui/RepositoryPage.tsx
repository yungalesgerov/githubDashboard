import { FC } from "react";
import RepositoryDetails from "./RepositoryDetails";

import { useFetchRepo } from "../../../features/RepositoryPage/useFetchRepo";

const RepositoryPage: FC = () => {
  const { data, loading } = useFetchRepo();
  return (
    <div>
      {loading ? <p>Loading...</p> : <RepositoryDetails repository={data} />}
    </div>
  );
};

export default RepositoryPage;
