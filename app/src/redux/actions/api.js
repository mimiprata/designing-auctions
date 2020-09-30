export const API_SUCCESS = '_FULFILLED';
export const API_ERROR = '_REJECTED';
export const apiSuccess = (response, entity) => ({
    type: `${entity}${API_SUCCESS}`,
    payload: response
});

export const apiError = (error, entity) => ({
    type: `${entity}${API_ERROR}`,
    payload: error
});