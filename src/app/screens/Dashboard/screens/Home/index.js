import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import styles from './styles.module.scss';

const ADD_TODO = gql`
  mutation lostItem($lostItem: LostItemInput!) {
    createLostItem(lostItem: $lostItem) {
      description
      state
      userInfoStateLost
      id
    }
  }
`;

function Home() {
  const [addTodo, { data }] = useMutation(ADD_TODO);
  const [file, setFile] = useState();

  const handleSend = () => {
    addTodo({
      variables: {
        lostItem: {
          description: 'Reloj Rolex encontrado en el baño de damas',
          state: 'finded',
          userInfoStateLost: 'fabio_montoya82142@elpoli.edu.co',
          userInfoStateDelivered: null,
          images: [file]
        }
      }
    });
  };

  const handleChange = e => {
    const file = e[0];
    setFile({
      size: file.size,
      type: file.type
    });
  };
  return (
    <div className={styles.app}>
      <input type="file" accept="image/*" onChange={e => handleChange(e.target.files)} />
      <button type="button" onClick={handleSend}>
        {' '}
        Enviar puto
      </button>
    </div>
  );
}

export default Home;
