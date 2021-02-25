import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type intialStateType = {
    initialized: boolean,
}

let initialState: intialStateType = {
    initialized: false,
};


const appReducer = (state = initialState, action: any): intialStateType => {
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


type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS //'INITIALIZED_SUCCESS'
}
export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())

    // This is we use and we have a lot of Promises
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        });

    dispatch(initializedSuccess());
}

export default appReducer;