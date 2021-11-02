import { combineReducers } from 'redux';

import loggedReducer from './isLogged';
import userReducer from './user';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    user: userReducer
});

export default allReducers;