import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';

import Card from '../../../../components/Card';
import Portal from '../../../../components/Portal';
import Filter from '../../../../components/Filter';

import styles from './styles.module.scss';

export const GET_POSTS = gql`
  query getPosts($state: String) {
    lostItems(state: $state) {
      description
      state
      userInfoStateLost
      userInfoStateDelivered
      images
      id
    }
  }
`;

function Home({ history }) {
  const filterIsOpen = useSelector(state => state.filter.isOpen);
  const currentFilter = useSelector(state => state.filter.current);

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { state: currentFilter }
  });

  const handleCardClick = (id, cardRef) => {
    const bounds = cardRef.current.getBoundingClientRect();
    const width = cardRef.current.offsetWidth;
    const height = cardRef.current.offsetHeight;

    const detailInitialPosition = {
      top: bounds.top,
      bottom: window.innerHeight - bounds.bottom,
      left: bounds.left,
      width
    };

    const initStyles = {
      '--case-detail-initial-top': `${detailInitialPosition.top}px`,
      '--case-detail-initial-bottom': `${detailInitialPosition.bottom}px`,
      '--case-detail-initial-left': `${detailInitialPosition.left}px`,
      '--case-detail-initial-width': `${detailInitialPosition.width}px`
    };

    history.push(`/detail/${id}`, { initStyles });

    console.log('height', height);
  };

  return (
    <div className={styles.itemsContainer}>
      {loading && <h3>loading...</h3>}
      {error && <h3>error</h3>}
      {data && !loading && (
        <>
          {data.lostItems.map(item => (
            <Card
              key={item.id}
              id={item.id}
              image={item.images[0]}
              description={item.description}
              state={item.state}
              userInfoStateLost={item.userInfoStateLost}
              userInfoStateDelivered={item.userInfoStateDelivered}
              onClick={handleCardClick}
            />
          ))}
        </>
      )}
      {filterIsOpen && (
        <Portal>
          <Filter />
        </Portal>
      )}
    </div>
  );
}

export default Home;
