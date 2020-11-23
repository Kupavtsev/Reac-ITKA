import { createSelector } from "reselect";

// Users 83
const getUsersSelector = (state) => {
    return state.usersPage.users;
}

// 'users' comes here from 'getUsers'
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})

// Other
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}

/*
82
export const countSomethingDifficult = (state) => {
    for... Math... big arrays
    let count = 23
    return count;
}
*/