import {SET_MESSAGE} from "../actions/messages";

const initState = {
    message: '',
    severity: null
};

export function messagesReducer( messagesContext = initState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_MESSAGE:
            return {...messagesContext, ...payload};

        default:
            return messagesContext;
    }
}
