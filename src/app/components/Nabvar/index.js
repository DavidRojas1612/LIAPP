import React from 'react';
import { string } from 'prop-types';

import { ReactComponent as Filter } from '~assets/filter.svg';

import styles from './styles.module.scss';

function Navbar({ title }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <Filter className={styles.filter} />
    </div>
  );
}

Navbar.propTypes = {
  title: string
};

export default Navbar;
