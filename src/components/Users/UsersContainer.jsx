import React from 'react';
import Users from "./Users";
import {connect} from 'react-redux';
import {followAC, setUsersAC, unfollowAC} from "../../redux/users-reducer";

// This function accepts hole State
// and returns the object which is only needed for Present component
let mapStateToProps = (state) => {
    return {
        /* В пропсах будет свойство users, значением которого будут users из state*/
        users: state.usersPage.users
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);