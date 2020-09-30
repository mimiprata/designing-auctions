import {
    FETCH_MY_DUTCH_AUCTIONS_FULFILLED,
    FETCH_MY_DUTCH_AUCTIONS_PENDING,
    FETCH_MY_DUTCH_AUCTIONS_REJECTED,
    FETCH_MY_ENGLISH_AUCTIONS_FULFILLED,
    FETCH_MY_ENGLISH_AUCTIONS_PENDING,
    FETCH_MY_ENGLISH_AUCTIONS_REJECTED,
    FETCH_MY_PENDING_SEALED_BID_AUCTIONS_FULFILLED,
    FETCH_MY_PENDING_SEALED_BID_AUCTIONS_REJECTED,
    FETCH_MY_SEALED_BID_AUCTIONS_FULFILLED,
    FETCH_MY_SEALED_BID_AUCTIONS_PENDING,
    FETCH_MY_SEALED_BID_AUCTIONS_REJECTED,
    FETCH_MY_PAST_DUTCH_AUCTIONS_FULFILLED,
    FETCH_MY_PAST_DUTCH_AUCTIONS_REJECTED,
    FETCH_MY_PENDING_ENGLISH_AUCTIONS_FULFILLED,
    FETCH_MY_PENDING_ENGLISH_AUCTIONS_REJECTED
} from "../actions/myAuctions";
import {REHYDRATE} from "redux-persist/es/constants";

const initialState = {
    myActiveAuctions:[],
    myPendingAuctions:[]
};
export const myAuctionsReducer = (state = initialState, action) => {
    switch (action.type) {
       /* case REHYDRATE:
            if (action.payload) {
                return { ...state, ...action.payload.myActiveAuctions };
            }
            return state;*/
        case FETCH_MY_DUTCH_AUCTIONS_PENDING: {
            return {
                ...state,
                myActiveAuctions: []
            };

        }

        case FETCH_MY_DUTCH_AUCTIONS_FULFILLED: {
            const myActiveAuctions = action.payload;
            return {
                ...state,
                ...{myActiveAuctions}
            };
        }
        case FETCH_MY_DUTCH_AUCTIONS_REJECTED:
            return {
                ...state,
                myActiveAuctions: [],
            };
        case FETCH_MY_ENGLISH_AUCTIONS_PENDING: {
            return {
                ...state,
                myActiveAuctions: []
            };
        }
        case FETCH_MY_ENGLISH_AUCTIONS_FULFILLED: {
            const myActiveAuctions = action.payload;
            return {
                ...state,
                ...{myActiveAuctions}
            };
        }
        case FETCH_MY_ENGLISH_AUCTIONS_REJECTED:
            return {
                ...state,
                myActiveAuctions: [],
            };
        case FETCH_MY_SEALED_BID_AUCTIONS_PENDING: {
            return {
                ...state,
                myActiveAuctions: []
            };
        }
        case FETCH_MY_SEALED_BID_AUCTIONS_FULFILLED: {
            const myActiveAuctions = action.payload;
            return {
                ...state,
                ...{myActiveAuctions}
            };
        }
        case FETCH_MY_SEALED_BID_AUCTIONS_REJECTED:
            return {
                ...state,
                myActiveAuctions: [],
            };
        case FETCH_MY_PENDING_SEALED_BID_AUCTIONS_FULFILLED: {
            const myPendingAuctions = action.payload;
            return {
                ...state,
                ...{myPendingAuctions}
            };
        }
        case FETCH_MY_PENDING_SEALED_BID_AUCTIONS_REJECTED:
            return {
                ...state,
                myPendingAuctions: [],
            };
        case FETCH_MY_PAST_DUTCH_AUCTIONS_FULFILLED: {
            const myPendingAuctions = action.payload;
            return {
                ...state,
                ...{myPendingAuctions}
            };
        }
        case FETCH_MY_PAST_DUTCH_AUCTIONS_REJECTED:
            return {
                ...state,
                myPendingAuctions: [],
            };
        case FETCH_MY_PENDING_ENGLISH_AUCTIONS_FULFILLED: {
            const myPendingAuctions = action.payload;
            return {
                ...state,
                ...{myPendingAuctions}
            };
        }
        case FETCH_MY_PENDING_ENGLISH_AUCTIONS_REJECTED:
            return {
                ...state,
                myPendingAuctions: [],
            };
        default:
            return state;
    }



};