import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

loadDevMessages();
loadErrorMessages();
const getTokenFromCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

const authLink = setContext(async (_, { headers }) => {
  const token = getTokenFromCookie('__session');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// TODO: Websocket Link

const uploadLink = createUploadLink({
  uri: 'http://localhost:3000/graphql',
  headers: {
    'apollo-require-preflight': 'true',
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// TODO: splitLink for websocket and http

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(uploadLink)),
  cache,
});

export default client;
