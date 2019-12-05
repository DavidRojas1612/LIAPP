import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import cn from 'classnames';

import Card from '../../../../components/Card';

import styles from './styles.module.scss';

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

  const data = useMemo(() => client.cache.data.data[`LostItem:${id}`], [id, client.cache]);

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
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {location.state.initStyles && data && (
        <div className={cn(styles.animated, styles.box)} ref={boxRef}>
          <Card
            id={data.id}
            image={data.images.json[0]}
            description={data.description}
            state={data.state}
            userInfoStateLost={data.userInfoStateLost}
            userInfoStateDelivered={data.userInfoStateDelivered}
            expand={expand}
          />
        </div>
      )}
    </div>
  );
}

export default DetailPost;
