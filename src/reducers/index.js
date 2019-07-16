import { combineReducers } from "redux";
import news from './news';
import history from './history';

export default combineReducers({ news, history });