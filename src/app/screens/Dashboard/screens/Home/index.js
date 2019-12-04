import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';

import Card from '../../../../components/Card';
import Portal from '../../../../components/Portal';
import Filter from '../../../../components/Filter';

import styles from './styles.module.scss';

export const GET_POSTS = gql`
  query getPosts($state: String, $offset: Int, $limit: Int) {
    lostItems(state: $state, limit: $limit, offset: $offset) {
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
  const [hasMore, setHasmore] = useState(true);
  const filterIsOpen = useSelector(state => state.filter.isOpen);
  const currentFilter = useSelector(state => state.filter.current);

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      state: currentFilter,
      offset: 0,
      limit: 5
    }
  });

  useEffect(() => {
    if (data && data.lostItems.length === 0) {
      setHasmore(false);
    }
  }, [data]);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    node => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore({
            variables: {
              offset: data ? data.lostItems.length : 0
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }
              return { lostItems: [...prev.lostItems, ...fetchMoreResult.lostItems] };
            }
          });
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, fetchMore, data, hasMore]
  );

  const handleCardClick = (id, cardRef) => {
    const bounds = cardRef.current.getBoundingClientRect();
    const width = cardRef.current.offsetWidth;

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
  };

  return (
    <div className={styles.itemsContainer}>
      {loading && <h3>loading...</h3>}
      {error && <h3>error</h3>}
      {data && !loading && (
        <>
          {data.lostItems.map((item, index) => {
            if (data.lostItems.length === index + 1) {
              return (
                <div ref={lastBookElementRef} key={item.id}>
                  <Card
                    id={item.id}
                    image={item.images[0]}
                    description={item.description}
                    state={item.state}
                    userInfoStateLost={item.userInfoStateLost}
                    userInfoStateDelivered={item.userInfoStateDelivered}
                    onClick={handleCardClick}
                  />
                </div>
              );
            }
            return (
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
            );
          })}
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
