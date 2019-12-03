import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';

import Card from '../../../../components/Card';
import Portal from '../../../../components/Portal';
import Filter from '../../../../components/Filter';

import styles from './styles.module.scss';

const GET_ITEMS = gql`
  query items($state: String) {
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

function Home() {
  const filterIsOpen = useSelector(state => state.filter.isOpen);
  const currentFilter = useSelector(state => state.filter.current);

  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: { state: currentFilter },
    fetchPolicy: 'network-only'
  });

  return (
    <div className={styles.itemsContainer}>
      {loading && <h3>loading...</h3>}
      {error && <h3>error</h3>}
      {data && !loading && (
        <>
          {data.lostItems.map(item => (
            <Card
              key={item.id}
              image={item.images[0]}
              description={item.description}
              state={item.state}
              userInfoStateLost={item.userInfoStateLost}
              userInfoStateDelivered={item.userInfoStateDelivered}
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
