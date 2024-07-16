import React from "react";
import { Provider } from "effector-react";
import { fork } from "effector";
import { rootStore } from "../../shared/model/store";

const scope = fork({ values: [[rootStore, { State: "" }]] });

const EffectorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider value={scope}>{children}</Provider>;
};

export default EffectorProvider;
