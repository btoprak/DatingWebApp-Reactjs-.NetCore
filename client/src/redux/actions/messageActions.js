import {
    GET_MESSAGES, GET_MESSAGE_THREAD, SEND_MESSAGE, DELETE_MESSAGE, MARK_READ_MESSAGE
} from "./actionsTypes";
import axios from 'axios';
import alertify from "alertifyjs";

export function getMessagesSuccess(messages, pagination) {
    return { type: GET_MESSAGES, messages: messages, pagination: pagination }
}

export function getMessageThreadSuccess(messageThread) {
    return { type: GET_MESSAGE_THREAD, payload: messageThread }
}

export const sendMessageSuccess = (message) => {
    return { type: SEND_MESSAGE, payload: message }
}

export const deleteMessageSuccess = (message) => {
    return { type: DELETE_MESSAGE, payload: message }
}

export const markAsReadMessageSuccess = (id) => {
    return { type: MARK_READ_MESSAGE, payload: id }
}

export function getMessages(userId, page, itemsPerPage, messageContainer) {
    return function (dispatch) {
        return axios.get('https://localhost:44398/api/users/' + userId + '/messages', {
            params: {
                pageNumber: page,
                pageSize: itemsPerPage,
                messageContainer: messageContainer
            }
        })
            .then(({ data, headers }) => {
                dispatch(getMessagesSuccess(data, headers.pagination))
            });
    }
}

export function getMessageThread(userId, recipientId) {
    return function (dispatch) {
        return axios.get('https://localhost:44398/api/users/' + userId + '/messages/thread/' + recipientId)
            .then(({ data }) => {
                dispatch(getMessageThreadSuccess(data))
            }).catch(err => alertify.error("Error"));
    }
}

export function sendMessage(id, message) {
    return function (dispatch) {
        return axios.post('https://localhost:44398/api/users/' + id + '/messages', message)
            .then((data => {
                dispatch(sendMessageSuccess(message))
            })).catch(err => alertify.error("Error"));
    }
}

export function deleteMessage(userId, message) {
    return function (dispatch) {
        return axios.post('https://localhost:44398/api/users/' + userId + '/messages/' + message.id)
            .then((data => {
                dispatch(deleteMessageSuccess(message));
                alertify.success("Message deleted");
            })).catch(err => alertify.error("Error"));
    }
}

export function markAsReadMessage(userId, messageId) {
    return function (dispatch) {
        return axios.post('https://localhost:44398/api/users/' + userId + '/messages/' + messageId + '/read')
            .then((data => {
                dispatch(markAsReadMessageSuccess(messageId));
            })).catch(err => alertify.error("Error"));
    }
}