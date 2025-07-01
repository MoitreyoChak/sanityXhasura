// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { auth } from './firebaseClient';

const NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT = 'https://rapid-foxhound-44.hasura.app/v1/graphql';

const httpLink = new HttpLink({
    uri: NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT
});

// Auth link to add JWT token to headers
const authLink = setContext(async (_, { headers }) => {
    try {
        const user = auth.currentUser;
        let token = null;

        if (user) {
            token = await user.getIdToken(true);
        }

        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : "",
            }
        };
    } catch (error) {
        console.error("Error getting auth token:", error);
        return {
            headers: {
                ...headers,
            }
        };
    }
});

// Error link to handle authentication errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }

    if (networkError) {
        console.error(`Network error: ${networkError}`);

        // Handle 401 errors (unauthorized)
        if (networkError.statusCode === 401) {
            // Optionally redirect to login or refresh token
            console.warn("Unauthorized access - user may need to log in again");
        }
    }
});

const client = new ApolloClient({
    link: from([
        errorLink,
        authLink.concat(httpLink)
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all'
        },
        query: {
            errorPolicy: 'all'
        }
    }
});

export default client;