import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { firebaseStore } from '../../../../../config';

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
  const [file, setFile] = useState('');

  const handleSend = async () => {
    const storageRef = firebaseStore().ref();
    try {
      const uploadImage = await storageRef.child(`images/${file.name}`).put(file);
      const imgUrl = await uploadImage.ref.getDownloadURL();
      addTodo({
        variables: {
          lostItem: {
            description: 'Reloj Rolex encontrado en el baño de damas',
            state: 'finded',
            userInfoStateLost: 'fabio_montoya82142@elpoli.edu.co',
            userInfoStateDelivered: null,
            images: [imgUrl]
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = e => {
    const fileR = e[0];
    console.log('base', fileR);
    setFile(fileR);
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
