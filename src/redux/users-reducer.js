import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 5,
    isFetching: false,
    followingInProgress: [],
    //fake: 10
};

const usersReducer = (state = initialState, action) => {
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

// Чтобы зафоловить кого-то нам нужен userId, который приходит в функцию, как параметр
export const followSuccess = (userId) => {
    //debugger;
    return (
        { type: FOLLOW, userId }
    )
}
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
// Action which will set users to the STATE in Array from serever
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {

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
const followUnfollowFlow = async (dispatch, userid, apiMethod, actionCreator) => {
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
export const follow = (userid) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userid, userAPI.follow.bind(userAPI), followSuccess);
    }
}

export const unfollow = (userid) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userid, userAPI.unfollow.bind(userAPI), unfollowSuccess);
    }
}

export default usersReducer;