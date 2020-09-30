import axios from 'axios';
import {API} from "../../../constans";

import {apiError, apiSuccess} from "../../actions/api";

import {setLoaderStatistics} from "../../actions/ui";
import {
    FETCH_DUTCH_ADD_RECEIPTS,
    FETCH_DUTCH_BID_RECEIPTS,
    FETCH_ENGLISH_ADD_RECEIPTS,
    FETCH_ENGLISH_BID_RECEIPTS, FETCH_SEALED_BID_ADD_RECEIPTS, FETCH_SEALED_BID_BID_RECEIPTS
} from "../../actions/statistics";

export const statisticsMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);
    let username;
    switch (action.type) {
        case FETCH_DUTCH_ADD_RECEIPTS:
            username = action.payload.username;
            dispatch(setLoaderStatistics(true));
            axios.get(API.ADD_DUTCH_RECEIPTS(username)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_DUTCH_ADD_RECEIPTS));
                dispatch(setLoaderStatistics(false));
            }).catch((error) => {
                dispatch(setLoaderStatistics(false));
                dispatch(apiError(error.response.data.message, FETCH_DUTCH_ADD_RECEIPTS));
            });
            break;
        case FETCH_DUTCH_BID_RECEIPTS:
            username = action.payload.username;
            dispatch(setLoaderStatistics(true));
            axios.get(API.BIDS_DUTCH_RECEIPTS(username)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_DUTCH_BID_RECEIPTS));
                dispatch(setLoaderStatistics(false));
            }).catch((error) => {
                dispatch(setLoaderStatistics(false));
                dispatch(apiError(error.response.data.message, FETCH_DUTCH_BID_RECEIPTS));
            });
            break;

        case FETCH_ENGLISH_ADD_RECEIPTS:
            username = action.payload.username;
            dispatch(setLoaderStatistics(true));
            axios.get(API.ADD_ENGLISH_RECEIPTS(username)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_ENGLISH_ADD_RECEIPTS));
                dispatch(setLoaderStatistics(false));
            }).catch((error) => {
                dispatch(setLoaderStatistics(false));
                dispatch(apiError(error.response.data.message, FETCH_ENGLISH_ADD_RECEIPTS));
            });
            break;
        case FETCH_ENGLISH_BID_RECEIPTS:
            username = action.payload.username;
            dispatch(setLoaderStatistics(true));
            axios.get(API.BIDS_ENGLISH_RECEIPTS(username)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_ENGLISH_BID_RECEIPTS));
                dispatch(setLoaderStatistics(false));
            }).catch((error) => {
                dispatch(setLoaderStatistics(false));
                dispatch(apiError(error.response.data.message, FETCH_ENGLISH_BID_RECEIPTS));
            });
            break;
            case FETCH_SEALED_BID_ADD_RECEIPTS:
            username = action.payload.username;
            dispatch(setLoaderStatistics(true));
            axios.get(API.ADD_SEALED_BID_RECEIPTS(username)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_SEALED_BID_ADD_RECEIPTS));
                dispatch(setLoaderStatistics(false));
            }).catch((error) => {
                dispatch(setLoaderStatistics(false));
                dispatch(apiError(error.response.data.message, FETCH_SEALED_BID_ADD_RECEIPTS));
            });
            break;
        case FETCH_SEALED_BID_BID_RECEIPTS:
            username = action.payload.username;
            dispatch(setLoaderStatistics(true));
            axios.get(API.BIDS_SEALED_BID_RECEIPTS(username)).then((response) => {
                dispatch(apiSuccess(response.data, FETCH_SEALED_BID_BID_RECEIPTS));
                dispatch(setLoaderStatistics(false));
            }).catch((error) => {
                dispatch(setLoaderStatistics(false));
                dispatch(apiError(error.response.data.message, FETCH_SEALED_BID_BID_RECEIPTS));
            });
            break;


    }
}
