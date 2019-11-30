import React from 'react';
import { string } from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

function Card({ image, description, userInfoStateLost, userInfoStateDelivered, state }) {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={image} alt="foto item" />
        </div>
        <div className={styles.content}>
          <p>{description}</p>
        </div>
      </div>
      <footer className={styles.footerItem}>
        <div>
          {userInfoStateLost && <h6>{userInfoStateLost.replace(/@[^@]+$/, '')}</h6>}
          {userInfoStateDelivered && <h6>{userInfoStateDelivered.replace(/@[^@]+$/, '')}</h6>}
        </div>
        <span
          className={cn({
            [styles.finded]: state === 'finded',
            [styles.lost]: state === 'lost',
            [styles.delivered]: state === 'delivered',
            [styles.remitted]: state === 'remitted'
          })}
        />
      </footer>
    </article>
  );
}

Card.propTypes = {
  description: string,
  image: string,
  state: string,
  userInfoStateDelivered: string,
  userInfoStateLost: string
};

export default Card;
