import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REGISTER_SUCCESS, LOGIN_START } from "../actions/actionsTypes";
import { updateObject } from "../../utility/updateObject";


const initState = {
    user: null,
    token: null,
    error: null,
    loading: false,
    errorMessage: '',
    authRedirectPath: '/'
}

const loginSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user: action.user,
        error: null,
        loading: false
    })
}

const loginStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return loginStart(state, action);
        case LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case LOGIN_ERROR:
            debugger;
            return {
                ...state,
                authuser: '',
                error: true,
                isAuthenticated: false,
                errorMessage: action.error
            };
        case LOGOUT:
            return {
                token: null,
                authuser: null
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                authuser: action.user,
            };
        default:
            return state;
    }
}

export default authReducer;