import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '~components/Nabvar';
import Toolbar from '~components/Toolbar';

import { APP_ROUTES as Routes } from '../../../constants/routes';

import Search from './screens/Search';

function Dashboard() {
  const isAuthed = useSelector(state => state.auth.isAuthed);
  return (
    <>
      <Navbar title="LIAPP" />
      <Switch>
        {/* {Object.values(Routes).map(({ path, component: Component }) => (
          <Route key={path} exact path={path} component={Component} />
        ))} */}
        <Route exact path={Routes.SEARCH.path} component={Routes.SEARCH.component} />
        <Route exact path={Routes.HOME.path} component={Routes.HOME.component} />
        <Route component={<Redirect to={Routes.HOME.path} />} />
      </Switch>
      <Toolbar />
    </>
  );
}

export default Dashboard;
