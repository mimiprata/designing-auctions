import {
    FETCH_MY_APARTMENTS_FULFILLED, FETCH_MY_APARTMENTS_REJECTED,
    FETCH_APARTMENT_DETAILS_FULFILLED,
    FETCH_APARTMENT_DETAILS_REJECTED
} from "../actions/apartments";
const initialState = {
    apartmentDetails:'',
    myApartments: []
};

export const apartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APARTMENT_DETAILS_FULFILLED: {
            const apartmentDetails = action.payload;
            return {
                ...state,
                ...{apartmentDetails}
            };
        }
        case FETCH_APARTMENT_DETAILS_REJECTED:
            return {
                ...state,
                apartmentDetails: null
            };
        case FETCH_MY_APARTMENTS_FULFILLED:{
            const myApartments = action.payload;
            return {
                ...state,
                ...{myApartments}
            }
        }
        case FETCH_MY_APARTMENTS_REJECTED:
            return {
                ...state,
                myApartments: null
            };
        default:
            return state;
    }

};