/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';

import store from './redux/store';
import App from './app';
import './config/i18n';
import { init } from './config';
import './scss/application.scss';
import { register } from './serviceWorker';

init();
const client = new ApolloClient({
  uri: 'http://localhost:8080/'
  // uri: 'https://liapsito-back.herokuapp.com/'
  // uri: 'https://liapp-back.herokuapp.com/'
});

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
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
