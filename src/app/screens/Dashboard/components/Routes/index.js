import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { APP_ROUTES } from '../../../../../constants/routes';
import Home from '../../screens/Home';
import NewPost from '../../screens/NewPost';
import Profile from '../../screens/Profile';

function Routes() {
  return (
    <Switch>
      <Route path={APP_ROUTES.HOME.path} exact component={Home} />
      <Route path={APP_ROUTES.NEWPOST.path} exact component={NewPost} />
      <Route path="/profile" exact component={Profile} />
    </Switch>
  );
}

export default Routes;
