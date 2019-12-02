import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { apiSetup } from '../config/api';
import store from '../redux/store';

import Routes from './components/Routes';

import '../scss/application.scss';

function App() {
  useEffect(() => {
    apiSetup(store.dispatch);
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

App.defaultProps = {
  loading: false
};

export default App;
