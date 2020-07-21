import axios from 'axios'

export const setAuthToken = token => {
    if (token) {
        // console.log(token);
        // Her Axios isteği için tokeni uygula
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        // Sil
        delete axios.defaults.headers.common['Authorization']
    }
}
