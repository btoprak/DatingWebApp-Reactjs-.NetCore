import {
    GET_USER, GET_USERS, UPDATE_USER_SUCCESS,
    UPLOAD_USER_PHOTO, SET_MAIN_PHOTO, DELETE_USER_PHOTO,
    SEND_LIKE_SUCCESS
} from "./actionsTypes";
import axios from 'axios';
import alertify from "alertifyjs";

export function getUsersSuccess(users, pagination) {
    return { type: GET_USERS, users: users, pagination: pagination }
}

export function getUserSuccess(user) {
    return { type: GET_USER, payload: user }
}

export function updateUserSuccess(user) {

    return { type: UPDATE_USER_SUCCESS, payload: user }
}

export const uploadUserPhotoSuccess = (photo) => {
    return { type: UPLOAD_USER_PHOTO, payload: photo }
}

export const setMainPhotoSuccess = (photoId) => {
    return { type: SET_MAIN_PHOTO, payload: photoId }
}

export const deleteUserPhotoSuccess = (photoId) => {
    return { type: DELETE_USER_PHOTO, payload: photoId }
}

export const sendLikeSuccess = (recipientId) => {
    return { type: SEND_LIKE_SUCCESS, payload: recipientId }
}


export function getUsers(page, itemsPerPage, minAge, maxAge, gender, orderBy, likes) {

    if (likes === "Likers") {
        var params = {
            pageNumber: page,
            pageSize: itemsPerPage,
            minAge: minAge,
            maxAge: maxAge,
            gender: gender,
            orderBy: orderBy,
            likers: true
        }
    } else if (likes === "Likees") {
        params = {
            pageNumber: page,
            pageSize: itemsPerPage,
            minAge: minAge,
            maxAge: maxAge,
            gender: gender,
            orderBy: orderBy,
            likees: true
        }
    } else {
        params = {
            pageNumber: page,
            pageSize: itemsPerPage,
            minAge: minAge,
            maxAge: maxAge,
            gender: gender,
            orderBy: orderBy,
        }
    }
    return function (dispatch) {
        return axios.get('https://localhost:44398/api/users', {
            params: params
        })
            .then(({ data, headers }) => {
                dispatch(getUsersSuccess(data, headers.pagination));
            });
    }
}

export function getUser(id) {
    return function (dispatch) {
        return axios.get('https://localhost:44398/api/users/' + id
        )
            .then(({ data }) => {
                dispatch(getUserSuccess(data))
            })
            .catch(err => alertify.error("Error"));
    }
}

export function updateUser(user) {
    return function (dispatch) {
        return axios.put('https://localhost:44398/api/users/' + user.id, user
        )
            .then(({ data }) => {
                alertify.success("Profile updated");
                dispatch(getUserSuccess(user))
            })
            .catch(err => alertify.error("Error"));
    }
}

export function uploadUserPhoto(userId, photo) {
    return function (dispatch) {
        return axios.post('https://localhost:44398/api/users/' + userId + '/photos', photo, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress:' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        })
            .then(({ data }) => {
                dispatch(uploadUserPhotoSuccess(photo));
                window.location.reload(false);
            })
            .catch(err => alertify.error("Error"));
    }
}


export function setMainPhoto(userId, photoId) {
    return function (dispatch) {
        return axios.post('https://localhost:44398/api/users/' + userId + '/photos/' + photoId + '/setMain')
            .then(({ data }) => {
                dispatch(setMainPhotoSuccess(photoId));
                window.location.reload(false);
            })
            .catch(err => alertify.error("Error"));
    }
}

export function deleteUserPhoto(userId, photoId) {
    return function (dispatch) {
        return axios.delete('https://localhost:44398/api/users/' + userId + '/photos/' + photoId)
            .then(({ data }) => {
                dispatch(deleteUserPhotoSuccess(photoId));
                window.location.reload(false);
            })
            .catch(err => alertify.error("Error"));
    }
}

export function sendLike(userId, recipient) {
    return function (dispatch) {
        return axios.post('https://localhost:44398/api/users/' + userId + '/like/' + recipient.id)
            .then(({ data }) => {
                dispatch(sendLikeSuccess(recipient.id));
                alertify.success("You liked " + recipient.knownAs)
            })
            .catch((err) => { alertify.warning("You already like " + recipient.knownAs) });
    }
}


