import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import cn from 'classnames';

// import { firebaseStore } from '../../../../../config';

import Card from '~components/Card';

import styles from './styles.module.scss';

// const ADD_TODO = gql`
//   mutation lostItem($lostItem: LostItemInput!) {
//     createLostItem(lostItem: $lostItem) {
//       description
//       state
//       userInfoStateLost
//       id
//     }
//   }
// `;

const GET_ITEMS = gql`
  {
    lostItems {
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
  const { loading, error, data } = useQuery(GET_ITEMS);
  const [file, setFile] = useState('');

  return (
    <div className={styles.app}>
      {loading && <h3>loading...</h3>}
      {error && <h3>error</h3>}
      {data && (
        <div className={styles.itemsContainer}>
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
        </div>
      )}
    </div>
  );
}

export default Home;

// const handleSend = async () => {
//   const storageRef = firebaseStore().ref();
//   try {
//     const uploadImage = await storageRef.child(`images/${file.name}`).put(file);
//     const imgUrl = await uploadImage.ref.getDownloadURL();
//     addTodo({
//       variables: {
//         lostItem: {
//           description: 'Reloj Rolex encontrado en el baño de damas',
//           state: 'finded',
//           userInfoStateLost: 'fabio_montoya82142@elpoli.edu.co',
//           userInfoStateDelivered: null,
//           images: [imgUrl]
//         }
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleChange = e => {
//   const fileR = e[0];
//   setFile(fileR);
// };

// <input type="file" accept="image/*" onChange={e => handleChange(e.target.files)} />
// {/* <button type="button" onClick={handleSend}> */}
// {' '}
// Enviar puto
// </button>
