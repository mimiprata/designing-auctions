import axios from 'axios';
import {API} from "../../../constans";
import {
    ADD_DUTCH_AUCTION, ADD_ENGLISH_AUCTION,
    ADD_SEALED_BID_AUCTION,
    FETCH_ALL_DUTCH_AUCTIONS,
    FETCH_ALL_ENGLISH_AUCTIONS,
    FETCH_ALL_SEALED_BID_AUCTIONS
} from "../../actions/auction";
import {apiError, apiSuccess} from "../../actions/api";
import {setLoaderActiveAuctions} from "../../actions/ui";
import {BID_ENGLISH_AUCTION} from "../../actions/detailsAuction";

export const auctionMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);
    let username, auctionDetails;
    switch (action.type) {
            case FETCH_ALL_DUTCH_AUCTIONS:
                 //{username} =action.payload;
            username=action.payload.username;
                dispatch(setLoaderActiveAuctions(true));
            axios.get(API.DUTCH_ACTIVE_AUCTIONS(username)).then((response) => {
                let auctions = [];
                const requests = response.data.map( (auction) => {
                   return axios.get(API.TOKEN_DETAILS(username,auction.assetId)).then((tokenDetails)=>{
                       console.log(tokenDetails);
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
                    dispatch(apiSuccess(auctions, FETCH_ALL_DUTCH_AUCTIONS));
                    dispatch(setLoaderActiveAuctions(false));
                })
            }).catch((error) => {
                dispatch(setLoaderActiveAuctions(false));
                dispatch(apiError(error.response.data.message,FETCH_ALL_DUTCH_AUCTIONS));
            });
            break;
        case FETCH_ALL_ENGLISH_AUCTIONS:
            username=action.payload.username;
            dispatch(setLoaderActiveAuctions(true));
            axios.get(API.ENGLISH_ACTIVE_AUCTIONS(username)).then((response) => {
                let auctions = [];
               const requests = response.data.map( (auction) => {
                    //return axios.get(API.TOKEN_DETAILS(username,auction.assetId)).then((tokenDetails)=>{
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
                    dispatch(apiSuccess(auctions, FETCH_ALL_ENGLISH_AUCTIONS));
                    dispatch(setLoaderActiveAuctions(false));
                })
            }).catch((error) => {
                dispatch(setLoaderActiveAuctions(false));
                dispatch(apiError(error.response.data.message,FETCH_ALL_ENGLISH_AUCTIONS));
            });
            break;
        case FETCH_ALL_SEALED_BID_AUCTIONS:
            username=action.payload.username;
            dispatch(setLoaderActiveAuctions(true));
            axios.get(API.SEALED_BID_ACTIVE_AUCTIONS(username)).then((response) => {
                let auctions = [];
            const requests = response.data.map( (auction) => {
                return axios.get(API.TOKEN_DETAILS(username, auction.assetId)).then((tokenDetails) => {
                    let newObject = {
                        ...auction,
                        ...tokenDetails.data
                    };
                    auctions.push(newObject);

                })
                    .catch((error) => {
                        console.log(error);
                        dispatch(setLoaderActiveAuctions(false));
                    });
            });
                Promise.all(requests).then(() => {
                    dispatch(apiSuccess(auctions, FETCH_ALL_SEALED_BID_AUCTIONS));
                    dispatch(setLoaderActiveAuctions(false));
                });
            }).catch((error) => {
                dispatch(setLoaderActiveAuctions(false));
                dispatch(apiError(error.response.data.message,FETCH_ALL_SEALED_BID_AUCTIONS));
            });
            break;
        case ADD_SEALED_BID_AUCTION:
            username=action.payload.username;
            auctionDetails = action.payload.auctionDetails;
            dispatch(setLoaderActiveAuctions(true));
            axios.post(API.APPROVE_CONTRACT, {
                username: username,
                tokenId: auctionDetails.tokenId,
                type: 'SEALED_BID_ENGINE'
            }).then((response) => {
                console.log(response);
                console.log(username,auctionDetails)
                axios.post(API.CREATE_SEALED_BID_AUCTION(username),JSON.stringify(auctionDetails))
                    .then((response1)=>{
                        console.log(response1);
                        dispatch(apiSuccess(response1.data,ADD_SEALED_BID_AUCTION));
                        dispatch(setLoaderActiveAuctions(false));
                    })
                    .catch((error)=>{
                        dispatch(apiError(' Transaction gas is too low. There is not enough gas to cover minimal cost of the transaction. Try increasing supplied gas.',ADD_SEALED_BID_AUCTION));
                        dispatch(setLoaderActiveAuctions(false));
                    })
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,ADD_SEALED_BID_AUCTION));
                dispatch(setLoaderActiveAuctions(false));
            });
            break;
        case ADD_DUTCH_AUCTION:
            username=action.payload.username;
            auctionDetails = action.payload.auctionDetails;
            dispatch(setLoaderActiveAuctions(true));
            axios.post(API.APPROVE_CONTRACT, {
                username: username,
                tokenId: auctionDetails.tokenId,
                type: 'DUTCH_ENGINE'
            }).then((response) => {
                console.log(response);
                console.log(username,auctionDetails);
                axios.post(API.CREATE_DUTCH_AUCTION(username),JSON.stringify(auctionDetails))
                    .then((response1)=>{
                        console.log(response1);
                        dispatch(apiSuccess(response1.data,ADD_DUTCH_AUCTION));
                        dispatch(setLoaderActiveAuctions(false));
                    })
                    .catch((error)=>{
                        dispatch(apiError(' Transaction gas is too low. There is not enough gas to cover minimal cost of the transaction. Try increasing supplied gas.',ADD_DUTCH_AUCTION));
                        dispatch(setLoaderActiveAuctions(false));
                    })
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,ADD_DUTCH_AUCTION));
                dispatch(setLoaderActiveAuctions(false));
            });
            break;
        case ADD_ENGLISH_AUCTION:
            username=action.payload.username;
            auctionDetails = action.payload.auctionDetails;
            dispatch(setLoaderActiveAuctions(true));
            axios.post(API.APPROVE_CONTRACT, {
                username: username,
                tokenId: auctionDetails.tokenId,
                type: 'ENGLISH_ENGINE'
            }).then((response) => {
                console.log(response);
                console.log(username,auctionDetails);
                axios.post(API.CREATE_ENGLISH_AUCTION(username),JSON.stringify(auctionDetails))
                    .then((response1)=>{
                        console.log(response1);
                        dispatch(apiSuccess(response1.data,ADD_ENGLISH_AUCTION));
                        dispatch(setLoaderActiveAuctions(false));
                    })
                    .catch((error)=>{
                        dispatch(apiError(' Transaction gas is too low. There is not enough gas to cover minimal cost of the transaction. Try increasing supplied gas.',ADD_ENGLISH_AUCTION));
                        dispatch(setLoaderActiveAuctions(false));
                    })
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,ADD_ENGLISH_AUCTION));
                dispatch(setLoaderActiveAuctions(false));
            });
            break;
        default :
            return null;

    }
};

