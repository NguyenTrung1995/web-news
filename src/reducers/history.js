import { ADD_HISTORY } from '../actions/actionTypes';

const initHistory = [];

export default function(state = initHistory, action) {
  switch (action.type) {
    case ADD_HISTORY:
      return [...state, action.article].reverse();
    default:
      return state;
  }
}