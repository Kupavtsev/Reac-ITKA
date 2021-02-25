import { profileType, postType, photosType } from './../types/types';
import { stopSubmit } from "redux-form";
import { profileAPI, userAPI } from "../api/api";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 27 },
        { id: 3, message: 'Are you going to code?', likesCount: 127 },
        { id: 4, message: 'What about Fib levels?', likesCount: 327 },
    ] as Array<postType>,
    profile: null as unknown as profileType || null,
    status: "",
    newPostText: ""
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostElement,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        // Если необходимого action не придет, то вернется state по умолчанию
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
        }
        case SAVE_PHOTO_SUCCESS: {
            // ...state.profile - оставляем, что и был
            //  photos: action.photos - поменять на то что пришло из Action
            return { ...state, profile: { ...state.profile, photos: action.photos } as profileType }
        }
        default:
            return state;
    }
};

type addPostActionCreatorActionType = {
     type: typeof ADD_POST,
      newPostElement: string
     }
export const addPostActionCreator = (newPostElement: string): addPostActionCreatorActionType => (
    { type: ADD_POST, newPostElement }
    );

type setUserProfileActionType = {
     type: typeof SET_USER_PROFILE,
      profile: profileType
    }
// SET_USER_PROFILE название действия, profile сидит в Action
export const setUserProfile = (profile: profileType): setUserProfileActionType => (
    { type: SET_USER_PROFILE, profile }
    );

type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): setStatusActionType => (
    { type: SET_STATUS, status }
    );

type deletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}    
// this is for testing in profile-reducer.test.js
export const deletePost = (postId: number): deletePostActionType => (
    { type: DELETE_POST, postId }
    );

type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: photosType
}
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessActionType => (
    { type: SAVE_PHOTO_SUCCESS, photos }
    );

// THUNKs
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await userAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        alert('error from status update');
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        // data.data - одна наша и одна сервера
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
    // запрашиваем авторизованность
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        // 97 >40min
        // мы обновляем данные из сервера в наш бизнес
        // и таким образом они отображаются на странице
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
        // В случае ощибки ?
        return Promise.reject(response.data.messages[0]);
        // ошибка для конкретного поля
        //dispatch(stopSubmit("edit-profile", { "contacts": {"facebook": response.data.messages[0]} }));
    }
}

export default profileReducer;