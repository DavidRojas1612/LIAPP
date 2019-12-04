import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { firebaseStore } from '../../../../../config';
import { GET_POSTS } from '../Home';
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

function NewPost({ history }) {
  const [file, setFile] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();

  const [addTodo, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_TODO, {
    onCompleted: () => history.push('/home'),
    refetchQueries: postResult => {
      const { state } = postResult.data.createLostItem;
      dispatch(filterActions.setCurrentFilter(state));
      return [{ query: GET_POSTS, variables: { state } }];
    },
    awaitRefetchQueries: true
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
        alert(error);
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
      {mutationError && <h1>{mutationError}</h1>}
    </div>
  );
}

export default NewPost;
