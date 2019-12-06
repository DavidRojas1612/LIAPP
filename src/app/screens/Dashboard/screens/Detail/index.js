import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import cn from 'classnames';
import gql from 'graphql-tag';

import Card from '../../../../components/Card';

import styles from './styles.module.scss';

const GET_POST = gql`
  query getPost($id: ID) {
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
  const client = useApolloClient();
  const [expand, setExpand] = useState(false);
  const containerRef = useRef();
  const boxRef = useRef();

  // const { data, loading } = useQuery(GET_POST, {
  //   variables: { id }
  // });

  // console.log(data);
  const dataItem = useMemo(() => client.cache.data.data[`LostItem:${id}`], [id, client.cache]);
  // const data = client.cache.data.data[`LostItem:${id}`];

  // const dataItem = useMemo(() => (data ? data.lostItems[0] : null), [data]);

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
  }, [dataItem]);

  return (
    <div className={styles.container} ref={containerRef}>
      {location.state.initStyles && dataItem && (
        <div className={cn(styles.animated, styles.box)} ref={boxRef}>
          <Card
            id={dataItem.id}
            image={dataItem.images.json[0]}
            description={dataItem.description}
            state={dataItem.state}
            userInfoStateLost={dataItem.userInfoStateLost}
            userInfoStateDelivered={dataItem.userInfoStateDelivered}
            expand={expand}
          />
        </div>
      )}
    </div>
  );
}

export default DetailPost;
