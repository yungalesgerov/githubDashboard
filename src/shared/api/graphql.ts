

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const githubToken = import.meta.env.VITE_GITHUB_PAT;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `Bearer ${githubToken}`,
    },
    fetchOptions: {
      mode: 'cors',
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
