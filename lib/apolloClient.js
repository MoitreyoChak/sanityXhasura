// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getIdToken } from './getIdToken';

const NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT = 'https://rapid-foxhound-44.hasura.app/v1/graphql';
const httpLink = new HttpLink({ uri: NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT });

// const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT });

const authLink = setContext(async (_, { headers }) => {
    const token = await getIdToken();
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;
