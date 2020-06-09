const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

let initialState = {
    users: [],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: [...state.users.map( u => {
                    // Если id не совпадает, то возвращем тот же самый объект 49, 30:30
                    if (u.id === action.userId) {
                        /*Возвращаем копию пользователя и меняем в нем элемент*/
                        return {...u, followed: true}
                    }
                    return u;
                })
                ]
            }
        case UNFOLLOW:
            return {
                ...state,
                users: [...state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
                ]
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
            // Мы берем страй state и дописываем его новыми пользователями
            // которые пришли в action
            return { ...state, totalUsersCount: action.count }
        }
        default:
            return state;
    }
};

// Чтобы зафоловить кого-то нам нужен userId, который приходит в функцию, как параметр
export const followAC = (userId) => {
    //debugger;
    return (
        {type: FOLLOW, userId}
    )
}
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
// Action which will set users to the STATE in Array from serever
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCountAC = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });

export default usersReducer;