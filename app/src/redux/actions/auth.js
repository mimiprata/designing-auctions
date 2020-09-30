import {login, logout} from '../middleware/app/auth';

export const FETCH_LOGGED_IN_USER = 'FETCH_LOGGED_IN_USER';
export const FETCH_LOGGED_IN_USER_FULFILLED = `${FETCH_LOGGED_IN_USER}_FULFILLED`;
export const FETCH_LOGGED_IN_USER_REJECTED = `${FETCH_LOGGED_IN_USER}_REJECTED`;
export const FETCH_LOGGED_IN_USER_PENDING = `${FETCH_LOGGED_IN_USER}_PENDING`;



export const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST';

// ACTION GENERATORS

export const fetchLoggedInUser = (username, password) => ({
    type: FETCH_LOGGED_IN_USER,
    payload: {username, password}
});




