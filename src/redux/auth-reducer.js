import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                //isAuth: true
            }
        default:
            return state;
    }
};


export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload:
     {userId, email, login, isAuth} });
export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    /* We use two times 'data' because on the Server 'data' and we use 'data */
                    dispatch(setAuthUserData(id, email, login, true));
                }
            });
}

// Thunk Creator
export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    // in case it's ok we are dispatch the Thunk getAuthUserData to Store
                    dispatch(getAuthUserData())
                }
            });
}

export const logout = () => (dispatch) => {
    authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    // in case it's ok we need to clear current state
                    dispatch(setAuthUserData(null, null, null, false));
                }
            });
}

export default authReducer;