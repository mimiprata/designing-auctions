import axios from 'axios';
import {API} from "../../../constans";
import {
    BID_DUTCH_AUCTION,
    BID_ENGLISH_AUCTION,
    BID_SEALED_BID_AUCTION,
    CANCEL_DUTCH_AUCTION,
    CANCEL_ENGLISH_AUCTION,
    CANCEL_SEALED_BID_AUCTION,
    END_ENGLISH_AUCTION,
    END_REVEAL_PERIOD,
    FETCH_DUTCH_AUCTION,
    FETCH_ENGLISH_AUCTION,
    FETCH_ENGLISH_BID_FOR_CURRENT_USER, FETCH_HISTORY_BIDS,
    FETCH_SEALED_BID_AUCTION,
    FETCH_SEALED_BID_FOR_CURRENT_USER, FINALIZE_ENGLISH_AUCTION,
    FINALIZE_SEALED_BID_AUCTIOND,
    HAS_FINALIZED_ENGLISH,
    HAS_FINALIZED_SEALED_BID,
    HAS_REVEALED,
    REVEAL_SEALED_BID_AUCTION,
    setRefreshDetailsAuction,
    START_REVEAL_PERIOD,
    FETCH_USER_FROM_ADDRESS, FETCH_HISTORY_BIDS_SEALED, FETCH_SEALED_BID_VALUE_FOR_CURRENT_USER, VERIFY_SEALED_BID_OFFER
} from "../../actions/detailsAuction";
import {apiError, apiSuccess} from "../../actions/api";
import { setLoaderBid} from "../../actions/ui";


export const detailsAuctionMiddleware  = ({ dispatch }) => (next) => (action) => {
    next(action);
    let username, auctionId, value, details, gasPrice, gas, hash;

    switch (action.type) {
        case FETCH_ENGLISH_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            axios.get(API.ENGLISH_AUCTION(username, auctionId)).then((auction) => {
                //axios.get(API.TOKEN_DETAILS(username,auction.data.assetId)).then((tokenDetails)=>{
                axios.get(API.APARTMENT_DETAILS(username,auction.data.assetId)).then((tokenDetails)=>{
                    let newObject = {
                        ...auction.data,
                        ...tokenDetails.data
                    };

                    dispatch(apiSuccess(newObject,FETCH_ENGLISH_AUCTION));
                    dispatch(setLoaderBid(false));
                })
                    .catch((error)=>{
                        console.log(error);
                    });

            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_ENGLISH_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;
        case FETCH_DUTCH_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            axios.get(API.DUTCH_AUCTION(username, auctionId)).then((auction) => {
                axios.get(API.TOKEN_DETAILS(username,auction.data.assetId)).then((tokenDetails)=>{
                    let newObject = {
                        ...auction.data,
                        ...tokenDetails.data
                    };

                    dispatch(apiSuccess(newObject,FETCH_DUTCH_AUCTION));
                    dispatch(setLoaderBid(false));
                })
                    .catch((error)=>{
                        console.log(error);
                    });


            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_DUTCH_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;
        case FETCH_SEALED_BID_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            axios.get(API.SEALED_BID_AUCTION(username, auctionId)).then((auction) => {

                axios.get(API.TOKEN_DETAILS(username,auction.data.assetId)).then((tokenDetails)=>{
                    let newObject = {
                        ...auction.data,
                        ...tokenDetails.data
                    };

                    dispatch(apiSuccess(newObject,FETCH_SEALED_BID_AUCTION));
                    dispatch(setLoaderBid(false));
                })
                    .catch((error)=>{
                        console.log(error);
                    });

            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_SEALED_BID_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;
        case BID_ENGLISH_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            value = action.payload.value;
            gasPrice = action.payload.gasPrice;
            gas = action.payload.gas;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false))
            axios.post(API.BID_ENGLISH_AUCTION, {
                username: username,
                auctionId: auctionId,
                value: value,
                gasPrice: gasPrice,
                gas: gas
            }).then((response) => {
                dispatch(apiSuccess(response.data,BID_ENGLISH_AUCTION));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError('Ooops! Check your bid value or your gasParameters',BID_ENGLISH_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;

        case FETCH_ENGLISH_BID_FOR_CURRENT_USER:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            axios.get(API.ENGLISH_BID_FOR_CURRENT_USER(username, auctionId)).
            then((response) => {
                dispatch(apiSuccess(response.data,FETCH_ENGLISH_BID_FOR_CURRENT_USER));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_ENGLISH_BID_FOR_CURRENT_USER));
            });
            break;

        case CANCEL_SEALED_BID_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false))
            axios.post(API.CANCEL_SEALED_BID_AUCTION, {
                username: username,
                auctionId: auctionId
            }).then((response) => {
                dispatch(apiSuccess(response.data,CANCEL_SEALED_BID_AUCTION));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError("Ooops! Check your gasParameters",CANCEL_SEALED_BID_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;
        case BID_SEALED_BID_AUCTION:
           details = action.payload.details;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false));
            axios.post(API.BID_SEALED_BID_AUCTION, JSON.stringify(details)).then((response) => {
                dispatch(apiSuccess(response.data,BID_SEALED_BID_AUCTION));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError(' Ooops! Check your bid value or your gasParameters',BID_SEALED_BID_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;
        case FETCH_SEALED_BID_FOR_CURRENT_USER:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            axios.get(API.SEALED_BID_FOR_CURRENT_USER(auctionId, username)).
            then((response) => {
                dispatch(apiSuccess(response.data,FETCH_SEALED_BID_FOR_CURRENT_USER));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_SEALED_BID_FOR_CURRENT_USER));
            });
            break;
        case FETCH_SEALED_BID_VALUE_FOR_CURRENT_USER:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            axios.get(API.SEALED_BID_VALUE_FOR_CURRENT_USER(auctionId, username)).
            then((response) => {
                dispatch(apiSuccess(response.data,FETCH_SEALED_BID_VALUE_FOR_CURRENT_USER));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_SEALED_BID_VALUE_FOR_CURRENT_USER));
            });
            break;
        case START_REVEAL_PERIOD:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false))
            axios.post(API.START_REVEALING_PERIOD,{
                username: username,
                auctionId: auctionId
            }).
            then((response) => {
                dispatch(apiSuccess(response.data,START_REVEAL_PERIOD));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,START_REVEAL_PERIOD));
                dispatch(setLoaderBid(false));
            });
            break;
        case END_REVEAL_PERIOD:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false))
            axios.post(API.END_REVEALING_PERIOD,{
                username: username,
                auctionId: auctionId
            }).
            then((response) => {
                dispatch(apiSuccess(response.data,END_REVEAL_PERIOD));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,END_REVEAL_PERIOD));
                dispatch(setLoaderBid(false));
            });
            break;
        case FINALIZE_SEALED_BID_AUCTIOND:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false))
            axios.post(API.FINALIZE_SEALED_BID_AUCTION,{
                username: username,
                auctionId: auctionId
            }).
            then((response) => {
                dispatch(apiSuccess(response.data,FINALIZE_SEALED_BID_AUCTIOND));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FINALIZE_SEALED_BID_AUCTIOND));
                dispatch(setLoaderBid(false));
            });
            break;
        case REVEAL_SEALED_BID_AUCTION:
            details = action.payload.details;
            dispatch(setRefreshDetailsAuction(false))
            dispatch(setLoaderBid(true));
            axios.post(API.REVEAL_SEALED_BID_AUCTION,JSON.stringify(details)).
            then((response) => {
                dispatch(apiSuccess(response.data,REVEAL_SEALED_BID_AUCTION));
                dispatch(setRefreshDetailsAuction(true))
                dispatch(setLoaderBid(false));
            }).catch((error) => {
                console.log(error, error.response);
                dispatch(apiError(error.response.data,REVEAL_SEALED_BID_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;

        case HAS_REVEALED:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            axios.get(API.HAS_REVEALED(username, auctionId)).
            then((response) => {
                dispatch(apiSuccess(response.data,HAS_REVEALED));
                dispatch(setLoaderBid(false));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,HAS_REVEALED));
                dispatch(setLoaderBid(false));
            });
            break;
        case HAS_FINALIZED_SEALED_BID:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            axios.get(API.HAS_FINALIZED_SEALED_BID(username, auctionId)).
            then((response) => {
                dispatch(apiSuccess(response.data,HAS_FINALIZED_SEALED_BID));
                dispatch(setLoaderBid(false));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,HAS_FINALIZED_SEALED_BID));
                dispatch(setLoaderBid(false));
            });
            break;
        case FETCH_HISTORY_BIDS_SEALED:
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            axios.get(API.HISTORY_SEALED_BIDS(auctionId)).then((response) => {
                dispatch(apiSuccess(response.data,FETCH_HISTORY_BIDS_SEALED));
                dispatch(setLoaderBid(false));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_HISTORY_BIDS_SEALED));
                dispatch(setLoaderBid(false));
            });
            break;


        case VERIFY_SEALED_BID_OFFER:
            username = action.payload.username;
            hash = action.payload.hash;
            dispatch(setLoaderBid(true));
            console.log(hash);
            axios.post(API.VERIFY_SEALED_BID_OFFER, {
            username: username,
                    leaf: hash}
            ).then((response) => {
                dispatch(apiSuccess(response.data,VERIFY_SEALED_BID_OFFER));
                dispatch(setLoaderBid(false));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,VERIFY_SEALED_BID_OFFER));
                dispatch(setLoaderBid(false));
            });
            break;


        case BID_DUTCH_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            value = action.payload.value;
            gasPrice = action.payload.gasPrice;
            gas = action.payload.gas;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false));
            axios.post(API.BID_DUTCH_AUCTION, {
                username: username,
                auctionId: auctionId,
                value: value,
                gasPrice: gasPrice,
                gas: gas
            }).then((response) => {
                console.log(response);
                dispatch(apiSuccess(response.data,BID_DUTCH_AUCTION));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError('Ooops! Check your bid value or your gasParameters',BID_DUTCH_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;
        case CANCEL_DUTCH_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false))
            axios.post(API.CANCEL_DUTCH_AUCTION, {
                username: username,
                auctionId: auctionId
            }).then((response) => {
                dispatch(apiSuccess(response.data,CANCEL_DUTCH_AUCTION));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError("Ooops! Check your gasParameters",CANCEL_DUTCH_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;
        case CANCEL_ENGLISH_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false));
            axios.post(API.CANCEL_ENGLISH_AUCTION, {
                username: username,
                auctionId: auctionId
            }).then((response) => {
                dispatch(apiSuccess(response.data,CANCEL_ENGLISH_AUCTION));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError("Ooops! Check your gasParameters",CANCEL_ENGLISH_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;
        case END_ENGLISH_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false));
            axios.post(API.END_ENGLISH_AUCTION, {
                username: username,
                auctionId: auctionId
            }).then((response) => {
                dispatch(apiSuccess(response.data,END_ENGLISH_AUCTION));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,END_ENGLISH_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;

        case HAS_FINALIZED_ENGLISH:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            axios.get(API.HAS_FINALIZED_ENGLISH(username, auctionId)).
            then((response) => {
                dispatch(apiSuccess(response.data,HAS_FINALIZED_ENGLISH));
                dispatch(setLoaderBid(false));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,HAS_FINALIZED_ENGLISH));
                dispatch(setLoaderBid(false));
            });
            break;
        case FINALIZE_ENGLISH_AUCTION:
            username = action.payload.username;
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            dispatch(setRefreshDetailsAuction(false));
            axios.post(API.FINALIZE_ENGLISH_AUCTION, {
                username: username,
                auctionId: auctionId
            }).then((response) => {
                dispatch(apiSuccess(response.data,FINALIZE_ENGLISH_AUCTION));
                dispatch(setLoaderBid(false));
                dispatch(setRefreshDetailsAuction(true))
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FINALIZE_ENGLISH_AUCTION));
                dispatch(setLoaderBid(false));
            });
            break;
        case FETCH_HISTORY_BIDS:
            auctionId = action.payload.auctionId;
            dispatch(setLoaderBid(true));
            axios.get(API.HISTORY_ENGLISH_BIDS(auctionId)).then((response) => {
                dispatch(apiSuccess(response.data,FETCH_HISTORY_BIDS));
                dispatch(setLoaderBid(false));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_HISTORY_BIDS));
                dispatch(setLoaderBid(false));
            });
            break;
        case FETCH_USER_FROM_ADDRESS:
            const {account_address} = action.payload;
            axios.get(API.USER_FROM_ADDRESS(account_address)).then((response) => {
                dispatch(apiSuccess(response.data,FETCH_USER_FROM_ADDRESS));
            }).catch((error) => {
                dispatch(apiError(error.response.data.message,FETCH_USER_FROM_ADDRESS));
            });
            break;
    }
};

