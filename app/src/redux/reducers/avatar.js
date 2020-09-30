import {
    FETCH_AVATAR_FOR_USER_FULFILLED,
    FETCH_AVATAR_FOR_USER_REJECTED
} from "../actions/avatar";
const initialState = {
    avatar:''
};

export const avatarReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AVATAR_FOR_USER_FULFILLED: {
            const avatar = action.payload;
            return {
                ...state,
                ...{avatar}
            };
        }
        case FETCH_AVATAR_FOR_USER_REJECTED:
            return {
                ...state,
                avatar: null
            };
        default:
            return state;
    }

};