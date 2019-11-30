import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '~screens/Dashboard';
import Login from '~screens/Login';

import { history } from '../../../redux/store';
// import Suspense from '../Suspense';
import { ROOT_ROUTES as Routes } from '../../../constants/routes';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import styles from './styles.scss';
// const Home = lazy(() => import('../../screens/Dashboard'));
// const Login = lazy(() => import('../../screens/Login'));

function AppRoutes() {
  const isAuthed = useSelector(state => state.auth.isAuthed);

  return (
    <ConnectedRouter history={history}>
      <div className={styles.container}>
        <Switch>
          <AuthenticatedRoute isPrivateRoute isAuthed={isAuthed} exact path={Routes.HOME} component={Home} />
          <AuthenticatedRoute isPublicRoute isAuthed={isAuthed} exact path={Routes.LOGIN} component={Login} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default AppRoutes;
