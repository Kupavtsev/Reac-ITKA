import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { userType } from './../types/types';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';




let initialState = {
    users: [] as Array<userType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []as Array<number>, // array of users ids
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        //case "FAKE": return {...state, fake: state.fake + 1}
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray( state.users, action.userId, "id", {followed: true} )
                /* This logic now in /utils/object-helpers.js
                users: [...state.users.map(u => {
                    // Если id не совпадает, то возвращем тот же самый объект 49, 30:30
                    if (u.id === action.userId) {
                        // Возвращаем копию пользователя и меняем в нем элемент
                        return { ...u, followed: true }
                    }
                    return u;
                })
                ]*/
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray( state.users, action.userId, "id", {followed: false} )
                /*users: [...state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
                ]*/
            }
        // Вставка пользователей в state
        case SET_USERS: {
            // Мы берем страй state и дописываем его новыми пользователями
            // которые пришли в action users: [ ...state.users, ...action.users]
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            // Мы берем страй state и дописываем его новыми пользователями
            // которые пришли в action
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
};

type followSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
// Чтобы зафоловить кого-то нам нужен userId, который приходит в функцию, как параметр
export const followSuccess = (userId: number): followSuccessActionType => {
    //debugger;
    return (
        { type: FOLLOW, userId }
    )
}

type unfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccessActionType => ({ type: UNFOLLOW, userId });

type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<userType>
}
// Action which will set users to the STATE in Array from serever
export const setUsers = (users: Array<userType>): setUsersActionType => ({ type: SET_USERS, users });

type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });

type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => (
    { type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }
    );

type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type toggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressActionType => (
    { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId }
    );

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {

        dispatch(toggleIsFetching(true));
        // It whows Current Page in UI
        dispatch(setCurrentPage(page));

        let data = await userAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

// Данный метод забрал дублирующийся код из follow/unfollow на себя
const followUnfollowFlow = async (dispatch: any, userid: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userid));

    /* Server API follow/{userId}, we must be authorized
       Our second Arg is null or an empty object*/
    let response = await apiMethod(userid)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userid));
    }
    dispatch(toggleFollowingProgress(false, userid));
}

// выносим связку диспатчей в отдельную Санку
export const follow = (userid: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userid, userAPI.follow.bind(userAPI), followSuccess);
    }
}

export const unfollow = (userid: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userid, userAPI.unfollow.bind(userAPI), unfollowSuccess);
    }
}

export default usersReducer;