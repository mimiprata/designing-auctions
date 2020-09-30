import axios from "axios";
import {API} from "../../../constans";
import {setLoaderBid} from "../../actions/ui";
import {FETCH_LOGGED_IN_USER, FETCH_USER_FROM_ADDRESS} from "../../actions/auth";
import {apiError, apiSuccess} from "../../actions/api";

export const loginMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);

    switch (action.type) {
        case FETCH_LOGGED_IN_USER:
            const {username, password} = action.payload;
            axios.post(API.LOGIN, {
                username: username,
                password: password
            }).then((response) => {
                dispatch(apiSuccess(response.data,FETCH_LOGGED_IN_USER));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_LOGGED_IN_USER));
            });
            break;

        default:
            return null;
    }
}