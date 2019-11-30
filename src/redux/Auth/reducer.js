import { completeReducer, createReducer, onSpreadValue, completeState, onToggle } from 'redux-recompose';

import { actions } from './actions';

const initialState = {
  user: null,
  isAuthed: false,
  token: null
};

const state = completeState(initialState, ['user', 'isAuthed']);

const reducerDescription = {
  primaryActions: [actions.LOGIN],
  override: {
    [actions.SET_VALUES]: onSpreadValue(),
    [actions.IS_AUTHED]: onToggle()
  }
};

const reducer = createReducer(state, completeReducer(reducerDescription));

export { reducer };
