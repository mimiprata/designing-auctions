export const FETCH_TOKEN_DETAILS = 'FETCH_MY_TOKEN_DETAILS';
export const FETCH_TOKEN_DETAILS_FULFILLED = `${FETCH_TOKEN_DETAILS}_FULFILLED`;
export const FETCH_TOKEN_DETAILS_REJECTED = `${FETCH_TOKEN_DETAILS}_REJECTED`;
export const FETCH_TOKEN_DETAILS_PENDING = `${FETCH_TOKEN_DETAILS}_PENDING`;

export const FETCH_MY_TOKENS = 'FETCH_MY_TOKENS';
export const FETCH_MY_TOKENS_FULFILLED = `${FETCH_MY_TOKENS}_FULFILLED`;
export const FETCH_MY_TOKENS_REJECTED = `${FETCH_MY_TOKENS}_REJECTED`;

export const FETCH_MY_BALANCE = 'FETCH_MY_BALANCE';
export const FETCH_MY_BALANCE_FULFILLED = `${FETCH_MY_BALANCE}_FULFILLED`;
export const FETCH_MY_BALANCE_REJECTED = `${FETCH_MY_BALANCE}_REJECTED`;

export const fetchTokenDetails = (username, tokenId) => ({
    type: FETCH_TOKEN_DETAILS,
    payload: {username, tokenId}
});

export const fetchMyTokens = (username) =>({
    type: FETCH_MY_TOKENS,
    payload: {username}
});

export const fetchMyBalance = (username) =>({
    type: FETCH_MY_BALANCE,
    payload: {username}
});