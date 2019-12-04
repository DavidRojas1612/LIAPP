import React, { useRef } from 'react';
import { string } from 'prop-types';
import cn from 'classnames';

import LazyImage from '../LazyImage';

import styles from './styles.module.scss';
import StatePost from './components/StatePost';

function Card({
  image,
  description,
  userInfoStateLost,
  userInfoStateDelivered,
  id,
  state,
  onClick,
  expand,
  scrollPosition
}) {
  const cardRef = useRef();

  return (
    <article
      className={cn(styles.article, { [styles.expand]: expand })}
      ref={cardRef}
      onClick={onClick && (() => onClick(id, cardRef))}
    >
      <div className={styles.imgContainer}>
        <img src={image} alt="foto item" />
      </div>
      {expand && <StatePost state={state} expand />}
      <div className={styles.content}>
        {expand && <h1>Descripcion:</h1>}
        <p>{description}</p>
      </div>

      <footer className={styles.footerItem}>
        <div className={styles.infoContainer}>
          {expand && <h2 className={styles.titleExpand}>Reportado:</h2>}
          {userInfoStateLost && <h6>{userInfoStateLost.replace(/@[^@]+$/, '')}</h6>}
        </div>
        <div className={styles.infoContainer}>
          {expand && <h2 className={styles.titleExpand}>Reclamado:</h2>}
          {userInfoStateDelivered ? <h6>{userInfoStateDelivered.replace(/@[^@]+$/, '')}</h6> : <h6>None</h6>}
        </div>
        {expand || <StatePost state={state} />}
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
