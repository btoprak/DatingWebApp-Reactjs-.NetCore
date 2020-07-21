import {
    GET_MESSAGES, GET_MESSAGE_THREAD, SEND_MESSAGE
} from "../actions/actionsTypes"
import { updateObject } from "../../utility/updateObject";

const initState = {
    messages: [],
    messageThread: null,
    pagination: null,
    loading: false,
    message: null,
}

const getMessagesSuccess = (state, action) => {
    return updateObject(state, {
        messages: action.messages,
        pagination: action.pagination
    });
};

const getMessageThreadSuccess = (state, action) => {
    return updateObject(state, {
        messageThread: action.payload,
    });
};

const sendMessageSuccess = (state, action) => {
    return updateObject(state, {
        message: action.payload
    })
};

export default function messageReducer(state = initState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return getMessagesSuccess(state, action);
        case GET_MESSAGE_THREAD:
            return getMessageThreadSuccess(state, action);
        case SEND_MESSAGE:
            return sendMessageSuccess(state, action);
        default:
            return state;
    }
}