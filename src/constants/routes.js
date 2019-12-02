import Search from '../app/screens/Dashboard/screens/Search';
import Home from '../app/screens/Dashboard/screens/Home';
import Profile from '../app/screens/Dashboard/screens/Profile';
import NewPost from '../app/screens/Dashboard/screens/NewPost';

export const ROOT_ROUTES = {
  HOME: '/home',
  LOGIN: '/',
  RECOVER_PASSWORD: '/forgot_password'
};

export const APP_ROUTES = {
  HOME: {
    component: Home,
    path: '/home'
  },
  SEARCH: {
    component: Search,
    path: '/search'
  },
  NEWPOST: {
    component: NewPost,
    path: '/new-post'
  },
  PROFILE: {
    component: Profile,
    path: '/profile'
  }
};
