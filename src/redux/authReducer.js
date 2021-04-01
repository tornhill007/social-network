import {stopSubmit} from "redux-form"
import {authAPI, securityAPI} from "../api/api";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data
            };
            case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};


export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    data: {id, email, login, isAuth}
});

export const setCaptchaUrl = (captchaUrl) => ({
    type: SET_CAPTCHA_URL,
    data: {captchaUrl}
});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
        console.log(response);
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
        console.log(response);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        }
        else {
            if(response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}))
        }
};

export const logout = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.logout(email, password, rememberMe);
        console.log(response);
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
};

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrlApi();
        console.log(response);
        const captchaUrl = response.data.url
        dispatch(setCaptchaUrl(captchaUrl));
};

export default authReducer;