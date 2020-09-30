import {
    FETCH_DUTCH_ADD_RECEIPTS_FULFILLED,
    FETCH_DUTCH_ADD_RECEIPTS_REJECTED,
    FETCH_DUTCH_BID_RECEIPTS_FULFILLED,
    FETCH_DUTCH_BID_RECEIPTS_REJECTED,
    FETCH_ENGLISH_ADD_RECEIPTS_FULFILLED,
    FETCH_ENGLISH_ADD_RECEIPTS_REJECTED,
    FETCH_ENGLISH_BID_RECEIPTS_FULFILLED,
    FETCH_ENGLISH_BID_RECEIPTS_REJECTED,
    FETCH_SEALED_BID_ADD_RECEIPTS_FULFILLED,
    FETCH_SEALED_BID_ADD_RECEIPTS_REJECTED,
    FETCH_SEALED_BID_BID_RECEIPTS_FULFILLED,
    FETCH_SEALED_BID_BID_RECEIPTS_REJECTED
} from "../actions/statistics";


const initialState = {
    dutchAddReceipts:null,
    dutchBidReceipts: null,
    englishAddReceipts:null,
    englishBidReceipts: null,
    sealedAddReceipts:null,
    sealedBidReceipts: null,
};

export const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DUTCH_ADD_RECEIPTS_FULFILLED: {
            const dutchAddReceipts = action.payload;
            return {
                ...state,
                ...{dutchAddReceipts}
            };
        }
        case FETCH_DUTCH_ADD_RECEIPTS_REJECTED:
            return {
                ...state,
                dutchAddReceipts: null
            };
        case FETCH_DUTCH_BID_RECEIPTS_FULFILLED: {
            const dutchBidReceipts = action.payload;
            return {
                ...state,
                ...{dutchBidReceipts}
            };
        }
        case FETCH_DUTCH_BID_RECEIPTS_REJECTED:
            return {
                ...state,
                dutchBidReceipts: null
            };
        case FETCH_ENGLISH_ADD_RECEIPTS_FULFILLED: {
            const englishAddReceipts = action.payload;
            return {
                ...state,
                ...{englishAddReceipts}
            };
        }
        case FETCH_ENGLISH_ADD_RECEIPTS_REJECTED:
            return {
                ...state,
                englishAddReceipts: null
            };
        case FETCH_ENGLISH_BID_RECEIPTS_FULFILLED: {
            const englishAddReceipts = action.payload;
            return {
                ...state,
                ...{englishAddReceipts}
            };
        }
        case FETCH_ENGLISH_BID_RECEIPTS_REJECTED:
            return {
                ...state,
                englishAddReceipts: null
            };
        case FETCH_SEALED_BID_ADD_RECEIPTS_FULFILLED: {
            const sealedAddReceipts = action.payload;
            return {
                ...state,
                ...{sealedAddReceipts}
            };
        }
        case FETCH_SEALED_BID_ADD_RECEIPTS_REJECTED:
            return {
                ...state,
                sealedAddReceipts: null
            };
        case FETCH_SEALED_BID_BID_RECEIPTS_FULFILLED: {
            const sealedBidReceipts = action.payload;
            return {
                ...state,
                ...{sealedBidReceipts}
            };
        }
        case FETCH_SEALED_BID_BID_RECEIPTS_REJECTED:
            return {
                ...state,
                sealedBidReceipts: null
            };
        default:
            return state;
    }
}