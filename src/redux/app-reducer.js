import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form';
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
                //isAuth: true
            }
        default:
            return state;
    }
};


export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    //debugger;

    // Такой синтаксис,когда Промисов много
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        });

    dispatch(initializedSuccess());
}

export default appReducer;