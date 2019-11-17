/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './app';
import './config/i18n';
import './scss/application.scss';
import { register } from './serviceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:8080/'
});

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Render once
render(App);

register();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });
}
