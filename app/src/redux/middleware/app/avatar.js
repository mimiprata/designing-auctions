import axios from "axios";
import {API} from "../../../constans";
import {FETCH_AVATAR_FOR_USER} from "../../actions/avatar";
import {apiError, apiSuccess} from "../../actions/api";

export const avatarMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);

    switch (action.type) {
        case FETCH_AVATAR_FOR_USER:
            const {user} = action.payload;
            axios.get(API.AVATAR(user)).then((response) => {
                dispatch(apiSuccess(response.data,FETCH_AVATAR_FOR_USER));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_AVATAR_FOR_USER));
            });
            break;
        default:
            return null;
    }
}