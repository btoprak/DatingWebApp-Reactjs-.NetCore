import {
    GET_USERS_WITH_ROLES, EDIT_ROLES
} from "../actions/actionsTypes"
import { updateObject } from "../../utility/updateObject";

const initState = {
    users: []
}

const getUsersWithRoles = (state, action) => {
    return updateObject(state, {
        users: action.payload,
    });
};


export default function adminReducer(state = initState, action) {
    switch (action.type) {
        case GET_USERS_WITH_ROLES:
            return getUsersWithRoles(state, action);
        default:
            return state;
    }
}