import {
    BID_DUTCH_AUCTION,
    BID_DUTCH_AUCTION_FULFILLED,
    BID_DUTCH_AUCTION_REJECTED,
    BID_ENGLISH_AUCTION_FULFILLED,
    BID_ENGLISH_AUCTION_REJECTED,
    BID_SEALED_BID_AUCTION_FULFILLED,
    BID_SEALED_BID_AUCTION_REJECTED,
    FETCH_DUTCH_AUCTION_FULFILLED,
    FETCH_DUTCH_AUCTION_PENDING,
    FETCH_DUTCH_AUCTION_REJECTED,
    FETCH_ENGLISH_AUCTION_FULFILLED,
    FETCH_ENGLISH_AUCTION_PENDING,
    FETCH_ENGLISH_AUCTION_REJECTED,
    FETCH_ENGLISH_BID_FOR_CURRENT_USER_FULFILLED,
    FETCH_SEALED_BID_AUCTION_FULFILLED,
    FETCH_SEALED_BID_AUCTION_PENDING,
    FETCH_SEALED_BID_AUCTION_REJECTED,
    FETCH_SEALED_BID_FOR_CURRENT_USER_FULFILLED,
    FETCH_SEALED_BID_FOR_CURRENT_USER_REJECTED,
    HAS_FINALIZED_ENGLISH_FULFILLED,
    HAS_FINALIZED_ENGLISH_REJECTED,
    HAS_FINALIZED_SEALED_BID_FULFILLED,
    HAS_FINALIZED_SEALED_BID_REJECTED,
    HAS_REVEALED_FULFILLED,
    HAS_REVEALED_REJECTED,
    REVEAL_SEALED_BID_AUCTION_FULFILLED,
    REVEAL_SEALED_BID_AUCTION_REJECTED,
    SET_REFRESH_DETAILS_AUCTION,
    FETCH_HISTORY_BIDS_FULFILLED,
    FETCH_HISTORY_BIDS_REJECTED,
    FETCH_USER_FROM_ADDRESS_FUULFILLED,
    FETCH_USER_FROM_ADDRESS_REJECTED,
    END_ENGLISH_AUCTION_FULFILLED,
    END_ENGLISH_AUCTION_REJECTED,
    FINALIZE_ENGLISH_AUCTION_FULFILLED,
    FINALIZE_ENGLISH_AUCTION_REJECTED,
    FETCH_HISTORY_BIDS_SEALED_REJECTED,
    FETCH_HISTORY_BIDS_SEALED_FULFILLED,
    FETCH_SEALED_BID_VALUE_FOR_CURRENT_USER_FULFILLED,
    FETCH_SEALED_BID_VALUE_FOR_CURRENT_USER_REJECTED,
    VERIFY_SEALED_BID_OFFER_FUULFILLED,
    VERIFY_SEALED_BID_OFFER_REJECTED,
    START_REVEAL_PERIOD_FULFILLED,
    START_REVEAL_PERIOD_REJECTED,
    END_REVEAL_PERIOD_FULFILLED,
    END_REVEAL_PERIOD_REJECTED,
    FINALIZE_SEALED_BID_AUCTIOND_FULFILLED,
    FINALIZE_SEALED_BID_AUCTIOND_REJECTED,
    CANCEL_ENGLISH_AUCTION,
    CANCEL_ENGLISH_AUCTION_FULFILLED,
    CANCEL_ENGLISH_AUCTION_REJECTED,
    CANCEL_DUTCH_AUCTION_FULFILLED,
    CANCEL_DUTCH_AUCTION_REJECTED,
    CANCEL_SEALED_BID_AUCTION_FULFILLED, CANCEL_SEALED_BID_AUCTION_REJECTED

} from "../actions/detailsAuction";

const initialState = {
    auction:'',
    refreshDetailsAuction: false,
    englishBidForCurrentUser:0,
    sealedBidForCurrentUser:0,
    sealedBidValueForCurrentUser:0,
    responseBid:'',
    responseReveal:'',
    errorResponseReveal:'',
    responseHasRevealed:false,
    responseHasFinalizedSealedBid: false,
    responseHasFinalizedEnglish:false,
    historyEnglishBids:[],
    historySealedBids:[],
    user: null,
    successMessage:'',
    errorMessage:'',
    errorBid:'',
    responseVerify:false,
};


export const detailsAuctionReducer = (state = initialState, action) => {
    switch (action.type) {
       /* case REHYDRATE:
            if (action.payload) {
                return { ...state, ...action.payload.activeAuction };
            }
            return state;*/
        case FETCH_ENGLISH_AUCTION_PENDING: {
            return {
                ...state,
                auction: ''
            };

        }

        case FETCH_ENGLISH_AUCTION_FULFILLED: {
            console.log(action.payload);
            const auction = action.payload;
            return {
                ...state,
                ...{auction}
            };
        }
        case FETCH_ENGLISH_AUCTION_REJECTED:
            return {
                ...state,
                auction: '',
            };
        case FETCH_DUTCH_AUCTION_PENDING: {
            return {
                ...state,
                auction: ''
            };

        }

        case FETCH_DUTCH_AUCTION_FULFILLED: {
            const auction = action.payload;
            return {
                ...state,
                ...{auction}
            };
        }
        case FETCH_DUTCH_AUCTION_REJECTED:
            return {
                ...state,
                auction: '',
            };
        case FETCH_SEALED_BID_AUCTION_PENDING: {
            return {
                ...state,
                auction: ''
            };

        }

        case FETCH_SEALED_BID_AUCTION_FULFILLED: {
            const auction = action.payload;
            return {
                ...state,
                ...{auction}
            };
        }
        case FETCH_SEALED_BID_AUCTION_REJECTED:
            return {
                ...state,
                auction: '',
            };
        case SET_REFRESH_DETAILS_AUCTION:
            const refreshDetailsAuction = action.payload;
            return{
                ...state,
                refreshDetailsAuction:refreshDetailsAuction
            };
        case FETCH_ENGLISH_BID_FOR_CURRENT_USER_FULFILLED:
            const englishBidForCurrentUser = action.payload;
            return{
                ...state,
                ...{englishBidForCurrentUser}
            };
        case FETCH_SEALED_BID_FOR_CURRENT_USER_FULFILLED:
            const sealedBidForCurrentUser = action.payload;
            return{
                ...state,
                ...{sealedBidForCurrentUser}
            };
        case FETCH_SEALED_BID_FOR_CURRENT_USER_REJECTED:
            return{
                ...state,
                sealedBidForCurrentUser: 0
            };
        case FETCH_SEALED_BID_VALUE_FOR_CURRENT_USER_FULFILLED:
            const sealedBidValueForCurrentUser = action.payload;
            return{
                ...state,
                ...{sealedBidValueForCurrentUser}
            };
        case FETCH_SEALED_BID_VALUE_FOR_CURRENT_USER_REJECTED:
            return{
                ...state,
                sealedBidValueForCurrentUser: 0
            };
        case BID_SEALED_BID_AUCTION_FULFILLED:
            const responseBid = action.payload;
            return{
                ...state,
                ...{responseBid}
            };
        case BID_SEALED_BID_AUCTION_REJECTED:
            return{
                ...state,
                errorBid: action.payload
            };
        case BID_DUTCH_AUCTION_FULFILLED:

            return{
                ...state,
                responseBid: action.payload
            };
        case BID_DUTCH_AUCTION_REJECTED:
            console.log(action.payload);

            return{
                ...state,
                responseBid: '',
                errorBid: action.payload,
            };
        case BID_ENGLISH_AUCTION_FULFILLED:

            return{
                ...state,
                responseBid: action.payload
            };
        case BID_ENGLISH_AUCTION_REJECTED:
            const errorBid = action.payload;
            console.log(action.payload);
            return{
                ...state,
                errorBid:action.payload
            };
        case REVEAL_SEALED_BID_AUCTION_FULFILLED:
            const responseReveal = action.payload;
            return{
                ...state,
                ...{responseReveal}
            };
        case REVEAL_SEALED_BID_AUCTION_REJECTED:
            const errorResponseReveal = action.payload;
            console.log(errorResponseReveal);
            console.log(action.payload);
            return{
                ...state,
               ...{errorResponseReveal}
            };
        case HAS_REVEALED_FULFILLED:
            const responseHasRevealed = action.payload;
            return{
                ...state,
               ...{responseHasRevealed}
            };
        case HAS_REVEALED_REJECTED:
            return{
                ...state,
                responseHasRevealed: false
            };
        case HAS_FINALIZED_SEALED_BID_FULFILLED:
            const responseHasFinalizedSealedBid = action.payload;
            return{
                ...state,
                ...{responseHasFinalizedSealedBid}
            };
        case HAS_FINALIZED_SEALED_BID_REJECTED:
            return{
                ...state,
                responseHasFinalizedSealedBid: false
            };
        case FETCH_HISTORY_BIDS_SEALED_FULFILLED:
            const historySealedBids = action.payload;
            return{
                ...state,
                ...{historySealedBids}
            };
        case FETCH_HISTORY_BIDS_SEALED_REJECTED:
            return{
                ...state,
                historySealedBids: []
            };
        case END_ENGLISH_AUCTION_FULFILLED:
            const endEnglishAuction = action.payload;
            return{
                ...state,
                successMessage: 'Success!'
            };
        case END_ENGLISH_AUCTION_REJECTED:
            const endEnglishAuctionRejected = action.payload;
            return{
                ...state,
                errorMessage: 'Error!'
            };
        case FINALIZE_ENGLISH_AUCTION_FULFILLED:
            const finalizeEnglishAuction = action.payload;
            return{
                ...state,
                successMessage: 'Success!'
            };
        case FINALIZE_ENGLISH_AUCTION_REJECTED:
            const finalizeEnglishAuctionRejected = action.payload;
            return{
                ...state,
                errorMessage: 'Error!'
            };
        case HAS_FINALIZED_ENGLISH_FULFILLED:
            const responseHasFinalizedEnglish = action.payload;
            return{
                ...state,
                ...{responseHasFinalizedEnglish}
            };
        case HAS_FINALIZED_ENGLISH_REJECTED:
            return{
                ...state,
                responseHasFinalizedEnglish: false
            };
        case FETCH_HISTORY_BIDS_FULFILLED:
            const historyEnglishBids = action.payload;
            return{
                ...state,
                ...{historyEnglishBids}
            };
        case FETCH_HISTORY_BIDS_REJECTED:
            return{
                ...state,
                historyEnglishBids: []
            };
        case FETCH_USER_FROM_ADDRESS_FUULFILLED: {
            console.log(action.payload);
            const user = action.payload;
            const error = null;
            return {
                ...state,
                ...{user},
                ...{error}
            };
        }
        case FETCH_USER_FROM_ADDRESS_REJECTED:
            return {
                ...state,
                user: null,
                error: action.payload
            };
        case VERIFY_SEALED_BID_OFFER_FUULFILLED:{
            const responseVerify = action.payload;
            return{
                ...state,
                ...{responseVerify}
            }
        }
        case VERIFY_SEALED_BID_OFFER_REJECTED:{
            return{
                ...state,
                responseVerify : null
            }
        }
        case START_REVEAL_PERIOD_FULFILLED:{
            return{
                ...state,
                successMessage:action.payload
            }
        }
        case START_REVEAL_PERIOD_REJECTED:{
            return{
                ...state,
                errorMessage:action.payload
            }
        }
        case END_REVEAL_PERIOD_FULFILLED:{
            return{
                ...state,
                successMessage:action.payload
            }
        }
        case END_REVEAL_PERIOD_REJECTED:{
            return{
                ...state,
                errorMessage:action.payload
            }
        }
        case FINALIZE_SEALED_BID_AUCTIOND_FULFILLED:{
            return{
                ...state,
                successMessage:action.payload
            }
        }
        case FINALIZE_SEALED_BID_AUCTIOND_REJECTED:{
            return{
                ...state,
                errorMessage:action.payload
            }
        }
        case CANCEL_ENGLISH_AUCTION_FULFILLED:{
            return{
                ...state,
                successMessage:action.payload
            }
        }
        case CANCEL_ENGLISH_AUCTION_REJECTED:{
            return{
                ...state,
                errorMessage:action.payload
            }
        }
        case CANCEL_DUTCH_AUCTION_FULFILLED:{
            return{
                ...state,
                successMessage:action.payload
            }
        }
        case CANCEL_DUTCH_AUCTION_REJECTED:{
            return{
                ...state,
                errorMessage:action.payload
            }
        }
        case CANCEL_SEALED_BID_AUCTION_FULFILLED:{
            return{
                ...state,
                successMessage:action.payload
            }
        }
        case CANCEL_SEALED_BID_AUCTION_REJECTED:{
            return{
                ...state,
                errorMessage:action.payload
            }
        }
        default :
            return state;
    }
}