import axios from 'axios'
import { setAuthToken } from '../../utility/setAuthToken'
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REGISTER_SUCCESS, LOGIN_START } from './actionsTypes'
import alertify from "alertifyjs";



export const loginStart = () => {
    return { type: LOGIN_START };
};

export const loginSuccess = (token, user) => {
    alertify.success("giriş yapıldı");
    return { type: LOGIN_SUCCESS, token: token, user: user };
};

export const loginError = error => {
    return { type: LOGIN_ERROR, payload: error };
};

export const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userInfo");
    return { type: LOGOUT };
}

export const registerSuccess = user => {
    return { type: REGISTER_SUCCESS, payload: user };
};
// REGISTER
export const registerUser = userData => dispatch => {
    axios.post('https://localhost:44398/api/auth/register', userData)
        .then(res => {
            console.log(userData)
            dispatch(registerSuccess(userData))
        })
        .catch(err => console.log(err))
}

// LOGIN
export const loginUser = userData => dispatch => {
    dispatch(loginStart());
    debugger;
    axios.post('https://localhost:44398/api/auth/login', userData)
        .then(res => {
            const { token } = res.data
            const userInfo = res.data.user;
            // Token'i localStorage'da saklıyoruz
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            dispatch(loginSuccess(token, userInfo))
        })
        .catch(err => dispatch(loginError(err)));
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            dispatch(logout());
        }
        else {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            setAuthToken(token);
            dispatch(loginSuccess(token, user));
        }
    };
};


