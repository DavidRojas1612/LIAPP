import Search from '~screens/Dashboard/screens/Search';
import Home from '~screens/Dashboard/screens/Home';
import Profile from '~screens/Dashboard/screens/Profile';
import NewPost from '~screens/Dashboard/screens/NewPost';

export const ROOT_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  RECOVER_PASSWORD: '/forgot_password'
};

export const APP_ROUTES = {
  HOME: {
    component: Home,
    path: '/'
  },
  SEARCH: {
    component: Search,
    path: '/search'
  },
  NEWPOST: {
    component: NewPost,
    path: '/new-post'
  },
  FILTER: {
    component: Profile,
    path: '/profile'
  }
};
