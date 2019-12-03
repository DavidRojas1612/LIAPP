import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import gql from 'graphql-tag';

import { firebaseStore } from '../../../../../config';
import filterActions from '../../../../../redux/Filter/actions';

import NewPostForm from './components/NewPostForm';
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

function NewPost() {
  const [file, setFile] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch(filterActions.setCurrentFilter('finded'));
    dispatch(push({ pathname: '/home', search: '' }));
  };

  const [addTodo, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_TODO, {
    onCompleted: handleComplete
  });

  const handleChange = e => {
    const fileR = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(fileR);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(fileR);
  };

  const handleSubmit = async post => {
    const storageRef = firebaseStore().ref();
    if (post.state) {
      try {
        const uploadImage = await storageRef.child(`images/${file.name}`).put(file);
        const imgUrl = await uploadImage.ref.getDownloadURL();
        addTodo({
          variables: {
            lostItem: {
              description: post.description,
              state: post.state,
              userInfoStateLost: post.state === 'finded' ? 'fabio_montoya82142@elpoli.edu.co' : null,
              userInfoStateDelivered: post.state === 'delivered' ? 'fabio_montoya82142@elpoli.edu.co' : null,
              images: [imgUrl]
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className={styles.containerPreview}>
        {imagePreview && <img src={imagePreview} className={styles.imagePreview} alt="preview image" />}
      </div>
      <NewPostForm onSubmit={handleSubmit} disabled={mutationLoading} />
      <div className={styles.uploadContainer}>
        <label htmlFor="file" className={styles.uploadLabel}>
          Subir Imagen{' '}
        </label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          className={styles.uploadFile}
          onChange={e => handleChange(e.target.files)}
        />
      </div>
    </div>
  );
}

export default NewPost;
