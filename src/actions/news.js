import { FETCH_NEWS } from './actionTypes';

const url = "https://newsapi.org/v2/everything?domains=cnn.com,nytimes.com&apiKey=cc4128d9911c4568bab94d7e1d59e2d6";

export const fetchNewsAC = news => ({
  type: FETCH_NEWS,
  news
})

export const fetchNews = () => {
  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(json => dispatch(fetchNewsAC(json.articles)))
      .catch(err => console.log(err));
  };
};
