export const SET_MESSAGE = 'SET_MESSAGE';

export const SEVERITY = {
    INFO:'info', ERROR:'error', WARNING:'warning', SUCCESS:'success'
};

export const setToastMessage = (message, severity) => ({
    type: SET_MESSAGE,
    payload: {
        message, severity
    }
});


export const resetToastMessage = () => ({
    type: SET_MESSAGE,
    payload: {
        message :'', severity:null
    }
});
