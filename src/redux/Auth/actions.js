import { completeTypes, createTypes } from 'redux-recompose';

import authService from '../../services/AuthServices';

/* ------------- Auth actions ------------- */
export const actions = createTypes(completeTypes(['LOGIN'], ['SET_VALUES', 'IS_AUTHED']), '@@AUTH');

const actionCreators = {
  login: () => async dispatch => {
    try {
      const response = await authService.login();
      if (response) {
        const { displayName, email, photoURL, refreshToken, uid } = response.user;

        dispatch({
          type: actions.IS_AUTHED,
          target: 'isAuthed'
        });
        dispatch({
          type: actions.SET_VALUES,
          target: 'user',
          payload: { displayName, email, photoURL, refreshToken, uid }
        });
      }
    } catch (error) {
      dispatch({
        type: actions.LOGIN_FAILURE,
        target: 'user',
        payload: error
      });
    }
  }

  // ,
  // logOut: () => dispatch => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       dispatch(
  //         isAuthed({
  //           authed: false,
  //           user: null
  //         })
  //       );
  //     })
  //     .catch(err => console.log('error al cerrar sesión', err));
  // }
};

export default actionCreators;
