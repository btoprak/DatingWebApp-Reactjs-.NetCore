import {
    GET_USER, GET_USERS
} from "../actions/actionsTypes"
import { updateObject } from "../../utility/updateObject";

const initState = {
    users: [],
    user: [],
    pagination: null,
    loading: false,
}

const getUsersSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users,
        pagination: action.pagination
    });
};
const getUserSuccess = (state, action) => {
    return updateObject(state, {
        user: action.payload,
        loading: false
    });
};

export default function datingReducer(state = initState, action) {
    switch (action.type) {
        case GET_USERS:
            return getUsersSuccess(state, action);
        case GET_USER:
            return getUserSuccess(state, action);
        default:
            return state;
    }
}