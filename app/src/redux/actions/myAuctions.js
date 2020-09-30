
export const FETCH_MY_DUTCH_AUCTIONS = 'FETCH_MY_DUTCH_AUCTIONS';
export const FETCH_MY_DUTCH_AUCTIONS_FULFILLED = `${FETCH_MY_DUTCH_AUCTIONS}_FULFILLED`;
export const FETCH_MY_DUTCH_AUCTIONS_REJECTED = `${FETCH_MY_DUTCH_AUCTIONS}_REJECTED`;
export const FETCH_MY_DUTCH_AUCTIONS_PENDING = `${FETCH_MY_DUTCH_AUCTIONS}_PENDING`;

export const FETCH_MY_ENGLISH_AUCTIONS = 'FETCH_MY_ENGLISH_AUCTIONS';
export const FETCH_MY_ENGLISH_AUCTIONS_FULFILLED = `${FETCH_MY_ENGLISH_AUCTIONS}_FULFILLED`;
export const FETCH_MY_ENGLISH_AUCTIONS_REJECTED = `${FETCH_MY_ENGLISH_AUCTIONS}_REJECTED`;
export const FETCH_MY_ENGLISH_AUCTIONS_PENDING = `${FETCH_MY_ENGLISH_AUCTIONS}_PENDING`;

export const FETCH_MY_SEALED_BID_AUCTIONS = 'FETCH_MY_SEALED_BID_AUCTIONS';
export const FETCH_MY_SEALED_BID_AUCTIONS_FULFILLED = `${FETCH_MY_SEALED_BID_AUCTIONS}_FULFILLED`;
export const FETCH_MY_SEALED_BID_AUCTIONS_REJECTED = `${FETCH_MY_SEALED_BID_AUCTIONS}_REJECTED`;
export const FETCH_MY_SEALED_BID_AUCTIONS_PENDING = `${FETCH_MY_SEALED_BID_AUCTIONS}_PENDING`;

export const FETCH_MY_PENDING_SEALED_BID_AUCTIONS = 'FETCH_MY_PENDING_SEALED_BID_AUCTIONS';
export const FETCH_MY_PENDING_SEALED_BID_AUCTIONS_FULFILLED = `${FETCH_MY_PENDING_SEALED_BID_AUCTIONS}_FULFILLED`;
export const FETCH_MY_PENDING_SEALED_BID_AUCTIONS_REJECTED = `${FETCH_MY_PENDING_SEALED_BID_AUCTIONS}_REJECTED`;

export const FETCH_MY_PAST_DUTCH_AUCTIONS ='FETCH_MY_PAST_DUTCH_AUCTIONS';
export const FETCH_MY_PAST_DUTCH_AUCTIONS_FULFILLED = `${FETCH_MY_PAST_DUTCH_AUCTIONS}_FULFILLED`;
export const FETCH_MY_PAST_DUTCH_AUCTIONS_REJECTED = `${FETCH_MY_PAST_DUTCH_AUCTIONS}_REJECTED`;
export const FETCH_MY_PAST_DUTCH_AUCTIONS_PENDING= `${FETCH_MY_PAST_DUTCH_AUCTIONS}_PENDING`;

export const FETCH_MY_PENDING_ENGLISH_AUCTIONS = 'FETCH_MY_PENDING_ENGLISH_AUCTIONS';
export const FETCH_MY_PENDING_ENGLISH_AUCTIONS_FULFILLED = `${FETCH_MY_PENDING_ENGLISH_AUCTIONS}_FULFILLED`;
export const FETCH_MY_PENDING_ENGLISH_AUCTIONS_REJECTED = `${FETCH_MY_PENDING_ENGLISH_AUCTIONS}_REJECTED`;


export const fetchMyDutchAuctions = (username) => ({
    type: FETCH_MY_DUTCH_AUCTIONS,
    payload: {username}
});

export const fetchMyEnglishAuctions = (username) =>({
    type: FETCH_MY_ENGLISH_AUCTIONS,
    payload: {username}
});

export const fetchMySealedBidAuctions = (username) =>  ({
    type: FETCH_MY_SEALED_BID_AUCTIONS,
    payload: {username}
});

export const fetchMyPendingSealedBidAuctions = (username)=>  ({
    type: FETCH_MY_PENDING_SEALED_BID_AUCTIONS,
    payload: {username}
});

export const fetchMyPastDutchAuctions = (username)=>({
    type: FETCH_MY_PAST_DUTCH_AUCTIONS,
    payload:{username}
});

export const fetchMyPendingEnglishAuctions = (username)=>({
    type: FETCH_MY_PENDING_ENGLISH_AUCTIONS,
    payload:{username}
});



