import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import EffectorProvider from "./app/providers/EffectorProvider.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./shared/api/graphql.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <EffectorProvider>
        <App />
      </EffectorProvider>
    </ApolloProvider>
  </React.StrictMode>
);
