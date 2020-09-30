import {
    ADD_DUTCH_AUCTION_FULFILLED,
    ADD_DUTCH_AUCTION_REJECTED,
    ADD_ENGLISH_AUCTION_FULFILLED,
    ADD_ENGLISH_AUCTION_REJECTED,
    ADD_SEALED_BID_AUCTION_FULFILLED,
    ADD_SEALED_BID_AUCTION_REJECTED,
    FETCH_ALL_DUTCH_AUCTIONS_FULFILLED,
    FETCH_ALL_DUTCH_AUCTIONS_PENDING,
    FETCH_ALL_DUTCH_AUCTIONS_REJECTED,
    FETCH_ALL_ENGLISH_AUCTIONS_FULFILLED,
    FETCH_ALL_ENGLISH_AUCTIONS_PENDING,
    FETCH_ALL_ENGLISH_AUCTIONS_REJECTED,
    FETCH_ALL_SEALED_BID_AUCTIONS_FULFILLED,
    FETCH_ALL_SEALED_BID_AUCTIONS_PENDING,
    FETCH_ALL_SEALED_BID_AUCTIONS_REJECTED
} from "../actions/auction";

const initialState = {
    auctions:[],
    responseAdd:'',
    errorAdd:'',
};
export const auctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_DUTCH_AUCTIONS_PENDING: {
            return {
                ...state,
                auctions: []
            };

        }

        case FETCH_ALL_DUTCH_AUCTIONS_FULFILLED: {
            const auctions = action.payload;
            return {
                ...state,
                ...{auctions}
            };
        }
        case FETCH_ALL_DUTCH_AUCTIONS_REJECTED:
            return {
                ...state,
                auctions: [],
            };
        case FETCH_ALL_ENGLISH_AUCTIONS_PENDING: {
            return {
                ...state,
                auctions: []
            };
        }
        case FETCH_ALL_ENGLISH_AUCTIONS_FULFILLED: {
            const auctions = action.payload;
            return {
                ...state,
                ...{auctions}
            };
        }
        case FETCH_ALL_ENGLISH_AUCTIONS_REJECTED:
            return {
                ...state,
                auctions: [],
            };
        case FETCH_ALL_SEALED_BID_AUCTIONS_PENDING: {
            return {
                ...state,
                auctions: []
            };
        }
        case FETCH_ALL_SEALED_BID_AUCTIONS_FULFILLED: {
            const auctions = action.payload;
            return {
                ...state,
                ...{auctions}
            };
        }
        case FETCH_ALL_SEALED_BID_AUCTIONS_REJECTED:
            return {
                ...state,
                auctions: [],
            };
        case ADD_SEALED_BID_AUCTION_FULFILLED:
            return{
                ...state,
                responseAdd: action.payload
            };
        case ADD_SEALED_BID_AUCTION_REJECTED:
            return{
                ...state,
                responseAdd: null,
                errorAdd:action.payload
            };
        case ADD_DUTCH_AUCTION_FULFILLED:
            return{
                ...state,
                responseAdd: action.payload
            };
        case ADD_DUTCH_AUCTION_REJECTED:
            return{
                ...state,
                responseAdd: null,
                errorAdd:action.payload
            };
        case ADD_ENGLISH_AUCTION_FULFILLED:
            return{
                ...state,
                responseAdd: action.payload
            };
        case ADD_ENGLISH_AUCTION_REJECTED:
            return{
                ...state,
                responseAdd: null,
                errorAdd:action.payload
            };
        default:
            return state;
    }



};