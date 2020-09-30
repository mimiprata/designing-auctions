

export const FETCH_ALL_DUTCH_AUCTIONS = 'FETCH_ALL_DUTCH_AUCTIONS';
export const FETCH_ALL_DUTCH_AUCTIONS_FULFILLED = `${FETCH_ALL_DUTCH_AUCTIONS}_FULFILLED`;
export const FETCH_ALL_DUTCH_AUCTIONS_REJECTED = `${FETCH_ALL_DUTCH_AUCTIONS}_REJECTED`;
export const FETCH_ALL_DUTCH_AUCTIONS_PENDING = `${FETCH_ALL_DUTCH_AUCTIONS}_PENDING`;

export const FETCH_ALL_ENGLISH_AUCTIONS = 'FETCH_ALL_ENGLISH_AUCTIONS';
export const FETCH_ALL_ENGLISH_AUCTIONS_FULFILLED = `${FETCH_ALL_ENGLISH_AUCTIONS}_FULFILLED`;
export const FETCH_ALL_ENGLISH_AUCTIONS_REJECTED = `${FETCH_ALL_ENGLISH_AUCTIONS}_REJECTED`;
export const FETCH_ALL_ENGLISH_AUCTIONS_PENDING = `${FETCH_ALL_ENGLISH_AUCTIONS}_PENDING`;

export const FETCH_ALL_SEALED_BID_AUCTIONS = 'FETCH_ALL_SEALED_BID_AUCTIONS';
export const FETCH_ALL_SEALED_BID_AUCTIONS_FULFILLED = `${FETCH_ALL_SEALED_BID_AUCTIONS}_FULFILLED`;
export const FETCH_ALL_SEALED_BID_AUCTIONS_REJECTED = `${FETCH_ALL_SEALED_BID_AUCTIONS}_REJECTED`;
export const FETCH_ALL_SEALED_BID_AUCTIONS_PENDING = `${FETCH_ALL_SEALED_BID_AUCTIONS}_PENDING`;

export const ADD_SEALED_BID_AUCTION ='ADD_SEALED_BID_AUCTION';
export const ADD_SEALED_BID_AUCTION_FULFILLED = `${ADD_SEALED_BID_AUCTION}_FULFILLED`;
export const ADD_SEALED_BID_AUCTION_REJECTED = `${ADD_SEALED_BID_AUCTION}_REJECTED`;
export const ADD_SEALED_BID_AUCTION_PENDING= `${ADD_SEALED_BID_AUCTION}_PENDING`;

export const ADD_DUTCH_AUCTION ='ADD_DUTCH_AUCTION';
export const ADD_DUTCH_AUCTION_FULFILLED = `${ADD_DUTCH_AUCTION}_FULFILLED`;
export const ADD_DUTCH_AUCTION_REJECTED = `${ADD_DUTCH_AUCTION}_REJECTED`;
export const ADD_DUTCH_AUCTION_PENDING= `${ADD_DUTCH_AUCTION}_PENDING`;

export const ADD_ENGLISH_AUCTION ='ADD_ENGLISH_AUCTION';
export const ADD_ENGLISH_AUCTION_FULFILLED = `${ADD_ENGLISH_AUCTION}_FULFILLED`;
export const ADD_ENGLISH_AUCTION_REJECTED = `${ADD_ENGLISH_AUCTION}_REJECTED`;
export const ADD_ENGLISH_AUCTION_PENDING= `${ADD_ENGLISH_AUCTION}_PENDING`;



export const addDutchAuction = (username, auctionDetails) =>{
    return({
        type: ADD_DUTCH_AUCTION,
        payload: {username, auctionDetails}
    })};

export const addSealedBidAuction = (username, auctionDetails) => {
    return({
        type: ADD_SEALED_BID_AUCTION,
        payload: {username, auctionDetails}
    })};

export const addEnglishAuction = (username, auctionDetails) => {
    return({
        type: ADD_ENGLISH_AUCTION,
        payload: {username, auctionDetails}
    })};

export const fetchAllDutchAuctions = (username) => ({
    type: FETCH_ALL_DUTCH_AUCTIONS,
    payload: {username}
});

export const fetchAllEnglishAuctions = (username) =>({
    type: FETCH_ALL_ENGLISH_AUCTIONS,
    payload: {username}
});

export const fetchAllSealedBidAuctions = (username) =>  ({
    type: FETCH_ALL_SEALED_BID_AUCTIONS,
    payload: {username}
});



