import axios from 'axios';
import {API} from "../../../constans";
import {
    FETCH_MY_DUTCH_AUCTIONS,
    FETCH_MY_ENGLISH_AUCTIONS,
    FETCH_MY_PAST_DUTCH_AUCTIONS,
    FETCH_MY_PENDING_ENGLISH_AUCTIONS,
    FETCH_MY_PENDING_SEALED_BID_AUCTIONS,
    FETCH_MY_SEALED_BID_AUCTIONS
} from "../../actions/myAuctions";
import {apiError, apiSuccess} from "../../actions/api";
import { setLoaderMyAuctions} from "../../actions/ui";


export const myAuctionsMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);
    let username;
    switch (action.type) {
        case FETCH_MY_DUTCH_AUCTIONS:
            //{username} =action.payload;
            username=action.payload.username;
            dispatch(setLoaderMyAuctions(true));
            axios.get(API.MY_DUTCH_AUCTIONS(username)).then((response) => {
                let auctions = [];
                const requests = response.data.map( (auction) => {
                    console.log(auction);
                    return axios.get(API.TOKEN_DETAILS(username,auction.assetId)).then((tokenDetails)=>{
                        let newObject = {
                            ...auction,
                            ...tokenDetails.data
                        };
                        auctions.push(newObject);

                    })
                });
                Promise.all(requests).then(() => {
                    console.log(auctions);
                    dispatch(apiSuccess(auctions, FETCH_MY_DUTCH_AUCTIONS));
                    dispatch(setLoaderMyAuctions(false));
                })
            }).catch((error) => {
                dispatch(setLoaderMyAuctions(false));
                dispatch(apiError(error.response.data.message,FETCH_MY_DUTCH_AUCTIONS));
            });
            break;
        case FETCH_MY_ENGLISH_AUCTIONS:
            username=action.payload.username;
            dispatch(setLoaderMyAuctions(true));
            axios.get(API.MY_ENGLISH_AUCTIONS(username)).then((response) => {
                let auctions = [];
                const requests = response.data.map( (auction) => {
                   // return axios.get(API.TOKEN_DETAILS(username,auction.assetId)).then((tokenDetails)=>{
                    return axios.get(API.APARTMENT_DETAILS(username,auction.assetId)).then((tokenDetails)=>{
                        let newObject = {
                            ...auction,
                            ...tokenDetails.data
                        };
                        auctions.push(newObject);
                    })
                        .catch((error)=>{
                            console.log(error);
                        })

                });
                Promise.all(requests).then(() => {
                    dispatch(apiSuccess(auctions, FETCH_MY_ENGLISH_AUCTIONS));
                    dispatch(setLoaderMyAuctions(false));
                })
            }).catch((error) => {
                dispatch(setLoaderMyAuctions(false));
                dispatch(apiError(error.response.data.message,FETCH_MY_ENGLISH_AUCTIONS));
            });
            break;
        case FETCH_MY_SEALED_BID_AUCTIONS:
            username=action.payload.username;
            dispatch(setLoaderMyAuctions(true));
            axios.get(API.MY_SEALED_BID_AUCTIONS(username)).then((response) => {
                let auctions = [];
                const requests = response.data.map( (auction) => {
                    return axios.get(API.TOKEN_DETAILS(username,auction.assetId)).then((tokenDetails)=>{
                        let newObject = {
                            ...auction,
                            ...tokenDetails.data
                        };
                        auctions.push(newObject);
                    })
                        .catch((error)=>{
                            console.log(error);
                        })
                });
                Promise.all(requests).then(() => {
                    dispatch(apiSuccess(auctions, FETCH_MY_SEALED_BID_AUCTIONS));
                    dispatch(setLoaderMyAuctions(false));
                })
            }).catch((error) => {
                dispatch(setLoaderMyAuctions(false));
                dispatch(apiError(error.response.data.message,FETCH_MY_SEALED_BID_AUCTIONS));
            });
            break;
        case FETCH_MY_PENDING_SEALED_BID_AUCTIONS:
            username=action.payload.username;
            dispatch(setLoaderMyAuctions(true));
            axios.get(API.MY_PENDING_SEALED_BID_AUCTIONS(username)).then((response) => {
                let auctions = [];
                const requests = response.data.map( (auction) => {
                    return axios.get(API.TOKEN_DETAILS(username,auction.assetId)).then((tokenDetails)=>{
                        let newObject = {
                            ...auction,
                            ...tokenDetails.data
                        };
                        auctions.push(newObject);
                    })
                        .catch((error)=>{
                            console.log(error);
                        })
                });
                Promise.all(requests).then(() => {
                    dispatch(apiSuccess(auctions, FETCH_MY_PENDING_SEALED_BID_AUCTIONS));
                    dispatch(setLoaderMyAuctions(false));
                })
            }).catch((error) => {
                dispatch(setLoaderMyAuctions(false));
                dispatch(apiError(error.response.data.message,FETCH_MY_PENDING_SEALED_BID_AUCTIONS));
            });
            break;
        case FETCH_MY_PAST_DUTCH_AUCTIONS:
            //{username} =action.payload;
            username=action.payload.username;
            dispatch(setLoaderMyAuctions(true));
            axios.get(API.MY_PAST_DUTCH_AUCTIONS(username)).then((response) => {
                let auctions = [];
                const requests = response.data.map( (auction) => {
                    console.log(auction);
                    return axios.get(API.TOKEN_DETAILS(username,auction.assetId)).then((tokenDetails)=>{
                        let newObject = {
                            ...auction,
                            ...tokenDetails.data
                        };
                        auctions.push(newObject);

                    })
                });
                Promise.all(requests).then(() => {
                    console.log(auctions);
                    dispatch(apiSuccess(auctions, FETCH_MY_PAST_DUTCH_AUCTIONS));
                    dispatch(setLoaderMyAuctions(false));
                })
            }).catch((error) => {
                dispatch(setLoaderMyAuctions(false));
                dispatch(apiError(error.response.data.message,FETCH_MY_PAST_DUTCH_AUCTIONS));
            });
            break;
        case FETCH_MY_PENDING_ENGLISH_AUCTIONS:
            username=action.payload.username;
            dispatch(setLoaderMyAuctions(true));
            axios.get(API.MY_PENDING_ENGLISH_AUCTIONS(username)).then((response) => {
                let auctions = [];
                const requests = response.data.map( (auction) => {
                    return axios.get(API.APARTMENT_DETAILS(username,auction.assetId)).then((tokenDetails)=>{
                        let newObject = {
                            ...auction,
                            ...tokenDetails.data
                        };
                        auctions.push(newObject);
                    })
                        .catch((error)=>{
                            console.log(error);
                        })
                });
                Promise.all(requests).then(() => {
                    dispatch(apiSuccess(auctions, FETCH_MY_PENDING_ENGLISH_AUCTIONS));
                    dispatch(setLoaderMyAuctions(false));
                })
            }).catch((error) => {
                dispatch(setLoaderMyAuctions(false));
                dispatch(apiError(error.response.data.message,FETCH_MY_PENDING_ENGLISH_AUCTIONS));
            });
            break;
        default :
            return null;

    }
};
