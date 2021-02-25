import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // if null, then captcha is not required
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:    
            return {
                userId233: 'hello',
                ...state,
                ...action.payload,
                //isAuth: true
            }
        default:
            return state;
    }
};

type setAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
});


type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload:
        { captchaUrl }
});

export const getAuthUserData = () => async (dispatch: any) => {
    // 80 добавляя return мы достаем promise наружу
    // и передаем его в app-reducer
    // 90 'qwait' have chenged 'return'
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        // We use two times 'data' because on the Server 'data' and we use 'data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

// Thunk Creator
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        // in case it's ok we are dispatch the Thunk getAuthUserData to Store
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        // in case it's ok we need to clear current state
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;