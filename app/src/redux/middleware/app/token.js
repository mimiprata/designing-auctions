import axios from 'axios';
import {API} from "../../../constans";

import {apiError, apiSuccess} from "../../actions/api";
import { setLoaderTokenDetails} from "../../actions/ui";
import {FETCH_MY_BALANCE, FETCH_MY_TOKENS, FETCH_TOKEN_DETAILS} from "../../actions/token";


export const tokenMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);
    let username, tokenId;
    switch (action.type) {
        case FETCH_TOKEN_DETAILS:
            username = action.payload.username;
            tokenId = action.payload.tokenId;
            dispatch(setLoaderTokenDetails(true));
            axios.get(API.TOKEN_DETAILS(username,tokenId)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_TOKEN_DETAILS));
                dispatch(setLoaderTokenDetails(false));
            }).catch((error) => {
                dispatch(setLoaderTokenDetails(false));
                dispatch(apiError(error.response.data.message, FETCH_TOKEN_DETAILS));
            });
            break;
        case FETCH_MY_TOKENS:
            username = action.payload.username;
            dispatch(setLoaderTokenDetails(true));
            axios.get(API.MY_TOKENS(username)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_MY_TOKENS));
                dispatch(setLoaderTokenDetails(false));
            }).catch((error) => {
                dispatch(setLoaderTokenDetails(false));
                dispatch(apiError(error.response.data.message, FETCH_MY_TOKENS));
            });
            break;
        case FETCH_MY_BALANCE:
            username = action.payload.username;
            dispatch(setLoaderTokenDetails(true));
            axios.get(API.MY_BALANCE(username)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_MY_BALANCE));
                dispatch(setLoaderTokenDetails(false));
            }).catch((error) => {
                dispatch(setLoaderTokenDetails(false));
                dispatch(apiError(error.response.data.message, FETCH_MY_BALANCE));
            });
            break;
        default :
            return null;
    }
}