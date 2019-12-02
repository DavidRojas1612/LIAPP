import React from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../../screens/Dashboard';
import Login from '../../screens/Login';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function AppRoutes() {
  const isAuthed = useSelector(state => state.auth.isAuthed);

  return (
    <Switch>
      <PublicRoute authed exact path="/" component={Login} />
      <PrivateRoute authed exact component={Home} />
    </Switch>
  );
}

export default AppRoutes;
