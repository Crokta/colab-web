import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
