import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../../../redux/store';
import Suspense from '../Suspense';
import Routes from '../../../constants/routes';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import styles from './styles.scss';

const Home = lazy(() => import('../../screens/Dashboard'));
const Login = lazy(() => import('../../screens/Login'));

function AppRoutes() {
  const isAuthed = useSelector(state => state.auth.isAuthed);

  return (
    <ConnectedRouter history={history}>
      <div className={styles.container}>
        <Suspense>
          <Switch>
            <AuthenticatedRoute
              isPrivateRoute
              isAuthed={isAuthed}
              exact
              path={Routes.HOME}
              component={Home}
            />
            <AuthenticatedRoute
              isPublicRoute
              isAuthed={isAuthed}
              exact
              path={Routes.LOGIN}
              component={Login}
            />
          </Switch>
        </Suspense>
      </div>
    </ConnectedRouter>
  );
}

export default AppRoutes;
