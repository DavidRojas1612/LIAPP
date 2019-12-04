import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import cn from 'classnames';
import gql from 'graphql-tag';

import Card from '../../../../components/Card';

import styles from './styles.module.scss';

export const GET_POSTS = gql`
  query getPosts($id: ID) {
    lostItems(id: $id) {
      description
      state
      userInfoStateLost
      userInfoStateDelivered
      images
      id
    }
  }
`;
function DetailPost({
  location,
  history,
  match: {
    params: { id }
  }
}) {
  const [expand, setExpand] = useState(false);
  const containerRef = useRef();
  const boxRef = useRef();

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { id },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    Object.entries(location.state.initStyles).forEach(style => {
      containerRef.current.style.setProperty(style[0], style[1]);
    });
  }, [location.state.initStyles]);

  useEffect(() => {
    let time;
    if (boxRef.current) {
      time = setTimeout(() => {
        boxRef.current.classList.add(styles.caseStudy);
        setExpand(true);
      }, 100);
    }
    return () => {
      clearTimeout(time);
    };
  }, [data]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* {loading && <h1>Loading...</h1>} */}
      {error && <h2>Error, {error}</h2>}
      {location.state.initStyles && data && (
        <div className={cn(styles.animated, styles.box)} ref={boxRef}>
          <Card
            id={data.lostItems[0].id}
            image={data.lostItems[0].images[0]}
            description={data.lostItems[0].description}
            state={data.lostItems[0].state}
            userInfoStateLost={data.lostItems[0].userInfoStateLost}
            userInfoStateDelivered={data.lostItems[0].userInfoStateDelivered}
            expand={expand}
          />
        </div>
      )}
    </div>
  );
}

export default DetailPost;
