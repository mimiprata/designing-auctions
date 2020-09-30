export const UI = '[ui]';
export const SET_LOADER_BID = `${UI} SET_LOADER_BID`;
export const SET_LOADER_ACTIVE_AUCTIONS = `${UI} SET_LOADER_ACTIVE_AUCTIONS`;
export const SET_LOADER_MY_AUCTIONS = `${UI} SET_LOADER_MY_AUCTIONS`;
export const SET_LOADER_TOKEN_DETAILS = `${UI} SET_LOADER_TOKEN_DETAILS`;
export const SET_LOADER_APARTMENT_DETAILS = `${UI} SET_LOADER_TOKEN_DETAILS`;
export const SET_LOADER_STATISTICS = `${UI} SET_LOADER_STATISTICS`;

export const setLoaderBid = (data) => ({
    type: SET_LOADER_BID,
    payload: {data}
});



export const setLoaderActiveAuctions = (data) => ({
    type: SET_LOADER_ACTIVE_AUCTIONS,
    payload: {data}
});

export const setLoaderMyAuctions = (data) => ({
    type: SET_LOADER_MY_AUCTIONS,
    payload: {data}
});

export const setLoaderTokenDetails = (data) => ({
    type: SET_LOADER_TOKEN_DETAILS,
    payload: {data}
});

export const setLoaderApartmentDetails = (data) => ({
    type: SET_LOADER_APARTMENT_DETAILS,
    payload: {data}
});


export const setLoaderStatistics = (data) => ({
    type: SET_LOADER_STATISTICS,
    payload: {data}
});