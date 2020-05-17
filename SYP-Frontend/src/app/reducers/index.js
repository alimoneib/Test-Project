import counterReducer from './counter';
import isLoggedInReducer from './isLoggedIn';
import { combineReducers } from 'redux';

const combinedReducers = combineReducers({
    counterReducer, 
    isLoggedInReducer
});

export default combinedReducers;