import { ADD_HISTORY } from '../actions/actionTypes';

const initHistory = [];

export default function(state = initHistory, action) {
  switch (action.type) {
    case ADD_HISTORY:
      const tempState = [...state];
      tempState.unshift(action.article);
      return tempState;
    default:
      return state;
  }
}