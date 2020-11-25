import { profileAPI, userAPI } from "../api/api";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 27 },
        { id: 3, message: 'Are you going to code?', likesCount: 127 },
        { id: 4, message: 'What about Fib levels?', likesCount: 327 },
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostElement) => ({ type: ADD_POST, newPostElement });

// SET_USER_PROFILE название действия, profile сидит в Action
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
// this is for testing in profile-reducer.test.js
export const deletePost = (postId) => ({ type: DELETE_POST, postId });

// THUNKs
export const getUserProfile = (userId) => (dispatch) => {
    userAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data));
        })
} 

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            //debugger;
            dispatch(setStatus(response.data));
        })
} 

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
            }
        })
} 

export default profileReducer;