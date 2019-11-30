import { ReactComponent as User } from '~assets/user.svg';
import { ReactComponent as House } from '~assets/house.svg';
import { ReactComponent as Focus } from '~assets/focus.svg';
import { ReactComponent as Search } from '~assets/magnifying-glass.svg';

export const TOOLBAR_ICONS = {
  home: {
    icon: House,
    path: '/'
  },
  search: {
    icon: Search,
    path: '/search'
  },
  newPost: {
    icon: Focus,
    path: '/new-post'
  },
  filter: {
    icon: User,
    path: '/profile'
  }
};
