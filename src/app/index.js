import React, { useEffect } from 'react';

import { apiSetup } from '../config/api';
import store from '../redux/store';

import Routes from './components/Routes';

import '../scss/application.scss';

function App() {
  useEffect(() => {
    apiSetup(store.dispatch);
  }, []);

  return <Routes />;
}

App.defaultProps = {
  loading: false
};

export default App;
