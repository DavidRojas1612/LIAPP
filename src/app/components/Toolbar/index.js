import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { TOOLBAR_ICONS } from './constants';

function Toolbar() {
  return (
    <div className={styles.container}>
      {Object.values(TOOLBAR_ICONS).map(({ path, icon: Component }) => (
        <div key={path} className={styles.itemContainer}>
          <Link to={path} className={styles.link}>
            <Component className={styles.icon} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Toolbar;
