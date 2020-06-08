import React from 'react';
import Users from "./Users";
import {connect} from 'react-redux';
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC} from "../../redux/users-reducer";

// This function mapStateToProps accepts hole State
// and returns the object which is only needed for Present component
let mapStateToProps = (state) => {
    return {
        /* В пропсах будет свойство users, значением которого будут users из state
        23:00 55 more explanation*/
        users: state.usersPage.users,
        // Мы привязываем одну страничку к одной части Стэйта
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
};

// Передает callbacks дочерней, презентационной компоненте
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);