import { FETCH_NEWS } from '../actions/actionTypes';

const initNews = [];

export default function(state = initNews, action) {
  switch (action.type) {
    case FETCH_NEWS:
      return action.news;
    default:
      return state;
  }
}