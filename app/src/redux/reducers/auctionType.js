import {SET_AUCTION_TYPE} from "../actions/auctionType";
import { REHYDRATE } from 'redux-persist';
const initialState = {
    auctionType:'ENGLISH'
};

export function auctionTypeReducer (state = initialState, action){
    const { type, payload } = action;


    switch(type) {
        case REHYDRATE:
            if (action.payload) {
                return { ...state, ...action.payload.auctionType };
            }
            return state;
        case SET_AUCTION_TYPE:
            const auctionType = payload;
            return {
                ...state,
                ...{auctionType}
            }
        default:
            return state;
    }
}