const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        ]
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
            // которые пришли в action
            return { ...state, users: [ ...state.users, ...action.users] }
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

export default usersReducer;