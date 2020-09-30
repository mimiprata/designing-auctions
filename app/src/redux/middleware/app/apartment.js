import axios from 'axios';
import {API} from "../../../constans";

import {apiError, apiSuccess} from "../../actions/api";
import { setLoaderApartmentDetails} from "../../actions/ui";
import {FETCH_MY_APARTMENTS, FETCH_APARTMENT_DETAILS} from "../../actions/apartments";


export const apartmentMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);
    let username, tokenId;
    switch (action.type) {
        case FETCH_APARTMENT_DETAILS:
            username = action.payload.username;
            tokenId = action.payload.tokenId;
            dispatch(setLoaderApartmentDetails(true));
            axios.get(API.APARTMENT_DETAILS(username,tokenId)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_APARTMENT_DETAILS));
                dispatch(setLoaderApartmentDetails(false));
            }).catch((error) => {
                dispatch(setLoaderApartmentDetails(false));
                dispatch(apiError(error.response.data.message, FETCH_APARTMENT_DETAILS));
            });
            break;
        case FETCH_MY_APARTMENTS:
            username = action.payload.username;
            dispatch(setLoaderApartmentDetails(true));
            axios.get(API.MY_APARTMENTS(username)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_MY_APARTMENTS));
                dispatch(setLoaderApartmentDetails(false));
            }).catch((error) => {
                dispatch(setLoaderApartmentDetails(false));
                dispatch(apiError(error.response.data.message, FETCH_MY_APARTMENTS));
            });
            break;
        default :
            return null;
    }
}