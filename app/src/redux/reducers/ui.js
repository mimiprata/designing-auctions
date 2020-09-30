import {
    SET_LOADER_ACTIVE_AUCTIONS, SET_LOADER_APARTMENT_DETAILS,
    SET_LOADER_BID,
    SET_LOADER_MY_AUCTIONS, SET_LOADER_STATISTICS,
    SET_LOADER_TOKEN_DETAILS
} from "../actions/ui";


const initialState = {
    loadingAuctionDetails: false,
    loadingActiveAuctions: false,
    loadingMyActiveAuctions: false,
    loadingTokenDetails: false,
    loadingApartmentDetails: false,
    loadingStatistics: false
};


export function uiReducer(state = initialState, action) {

    const { payload } = action;

    switch (action.type) {
        case SET_LOADER_BID : return{
            ...state,
            loadingAuctionDetails: payload.data
        };
        case SET_LOADER_ACTIVE_AUCTIONS: return{
            ...state,
            loadingActiveAuctions: payload.data
        };
        case SET_LOADER_MY_AUCTIONS: return{
            ...state,
            loadingMyActiveAuctions: payload.data
        };
        case SET_LOADER_TOKEN_DETAILS: return{
            ...state,
            loadingTokenDetails: payload.data
        };
        case SET_LOADER_APARTMENT_DETAILS: return{
            ...state,
            loadingApartmentDetails: payload.data
        };
        case SET_LOADER_STATISTICS: return{
            ...state,
            loadingStatistics: payload.data
        };
        default:
            return state;


    }
}
