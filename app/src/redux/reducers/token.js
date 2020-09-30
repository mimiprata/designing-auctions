import {
    FETCH_MY_BALANCE_FULFILLED, FETCH_MY_BALANCE_REJECTED,
    FETCH_MY_TOKENS_FULFILLED, FETCH_MY_TOKENS_REJECTED,
    FETCH_TOKEN_DETAILS_FULFILLED,
    FETCH_TOKEN_DETAILS_REJECTED
} from "../actions/token";
const initialState = {
    tokenDetails:'',
    myTokens: [],
    myBalance: ''
};

export const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOKEN_DETAILS_FULFILLED: {
            const tokenDetails = action.payload;
            return {
                ...state,
                ...{tokenDetails}
            };
        }
        case FETCH_TOKEN_DETAILS_REJECTED:
            return {
                ...state,
                tokenDetails: null
            };
        case FETCH_MY_TOKENS_FULFILLED:{
            const myTokens = action.payload;
            return {
                ...state,
                ...{myTokens}
            }
        }
        case FETCH_MY_TOKENS_REJECTED:
            return {
                ...state,
                myTokens: null
            };
        case FETCH_MY_BALANCE_FULFILLED:{
            const myBalance = action.payload;
            return {
                ...state,
                ...{myBalance}
            }
        }
        case FETCH_MY_BALANCE_REJECTED:
            return {
                ...state,
                myBalance: null
            };
        default:
            return state;
    }

};