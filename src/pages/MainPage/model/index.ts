import { createEffect, createEvent, createStore, sample } from 'effector';
import { gql } from '@apollo/client';
import client from '../../../shared/api/graphql';

interface Edge {
  node: {
    id: string;
    name: string;
    stargazerCount: number;
    updatedAt: string;
    url: string;
  };
  cursor: string;
}

export interface Repository {
  id: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  owner: {
    avatarUrl: string;
    login: string;
    url: string;
  };
  languages: {
    nodes: { name: string }[];
  };
  description: string;
}

export const fetchSelectedRepositoryFx = createEffect(async ({ owner, name }: { owner: string; name: string }) => {
  const { data } = await client.query({
    query: gql`
      query GetRepository($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          id
          name
          stargazerCount
          updatedAt
          url
          owner {
            avatarUrl
            login
          }
          languages(first: 10) {
            nodes {
              name
            }
          }
          description
        }
      }
    `,
    variables: { owner, name },
  });

  return data.repository;
});

export const fetchUserRepositoriesFx = createEffect(async () => {
  const { data } = await client.query({
    query: gql`
      query {
        viewer {
          repositories(first: 10) {
            nodes {
              id
              name
              stargazerCount
              updatedAt
              url
            }
          }
        }
      }
    `,
  });

  return data.viewer.repositories.nodes;
});

export const fetchRepositoriesFx = createEffect(async ({ query, page }: { query: string, page: number }) => {
  console.log("Fetching repositories with page:", page); 
  const { data } = await client.query({
    query: gql`
      query SearchRepositories($query: String!, $first: Int!, $after: String) {
        search(query: $query, type: REPOSITORY, first: $first, after: $after) {
          repositoryCount
          edges {
            node {
              ... on Repository {
                id
                name
                stargazerCount
                updatedAt
                url
                owner {
                  avatarUrl
                  login
                }
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
    variables: { query, first: 10, after: page > 1 ? $afterCursor.getState() : null }
  });

  return {
    repositories: data.search.edges.map((edge: Edge) => edge.node),
    endCursor: data.search.pageInfo.endCursor,
    hasNextPage: data.search.pageInfo.hasNextPage,
  };
});

export const setSearchQuery = createEvent<string>();
export const setAfterCursor = createEvent<string | null>();
export const setPage = createEvent<number>();
export const setRepositories = createEvent<Repository[]>();  

export const $searchQuery = createStore('').on(setSearchQuery, (_, query) => query);
export const $afterCursor = createStore<string | null>(null).on(setAfterCursor, (_, afterCursor) => afterCursor);
export const $page = createStore(1).on(setPage, (_, page) => {
  return page;
});
export const $selectedRepository = createStore<Repository | null>(null)
  .on(fetchSelectedRepositoryFx.doneData, (_, repository) => {
    return repository;
  });
export const $userRepositories = createStore<Repository[]>([]).on(fetchUserRepositoriesFx.doneData, (_, repositories) => repositories);
export const $repositories = createStore<Repository[]>([]).on(fetchRepositoriesFx.doneData, (_, { repositories }) => repositories)
  .on(setRepositories, (_, repositories) => repositories); 
export const $endCursor = createStore<string | null>(null).on(fetchRepositoriesFx.doneData, (_, { endCursor }) => endCursor);

$searchQuery.watch(query => {
  if (query === '') {
    fetchUserRepositoriesFx();
  } else {
    fetchRepositoriesFx({ query, page: $page.getState() });  
  }
});

$page.watch(page => {
  fetchRepositoriesFx({ query: $searchQuery.getState(), page });
});

fetchRepositoriesFx.doneData.watch(({ endCursor }) => {
  setAfterCursor(endCursor);
});

sample({
  clock: setPage,
  source: $searchQuery,
  fn: (query, page) => ({ query, page }),
  target: fetchRepositoriesFx,
});

sample({
  clock: setSearchQuery,
  fn: query => ({ query, page: $page.getState() }), 
  target: fetchRepositoriesFx,
});
