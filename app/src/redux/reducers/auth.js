import {
    FETCH_LOGGED_IN_USER_FULFILLED,
    FETCH_LOGGED_IN_USER_PENDING,
    FETCH_LOGGED_IN_USER_REJECTED,SIGNOUT_REQUEST
} from "../actions/auth";
import { REHYDRATE } from 'redux-persist';
const initialState = {
    loggedInUser: null,
    error: ''
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SIGNOUT_REQUEST: {

            return {
                ...state,
                loggedInUser: null,
                error: ''
            };
        }
        case REHYDRATE:
                if (action.payload) {
                    return { ...state, ...action.payload.authData };
                }
            return state;
        case FETCH_LOGGED_IN_USER_PENDING: {
            return {
                ...state,
                loggedInUser: null,
                error:''
            };
        }
        case FETCH_LOGGED_IN_USER_FULFILLED: {
            console.log(action.payload);
            const loggedInUser = action.payload;
            const error = null;
            return {
                ...state,
                ...{loggedInUser},
                ...{error}
            };
        }
        case FETCH_LOGGED_IN_USER_REJECTED:
            console.log(action.payload);
            return {
                ...state,
                loggedInUser: null,
                error: action.payload
            };

        default:
            return state;
    }

};