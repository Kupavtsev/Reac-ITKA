import React from 'react';
import {connect} from 'react-redux';
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC} from "../../redux/users-reducer";
import Users from "./Users";
import * as axios from 'axios';

class UsersContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                //debugger;
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                //debugger;
                this.props.setUsers(response.data.items)
            });
    }

    // Render Going before componentDidMount
    // Must be in any Class for JSX
    // props in RENDER doesn't come in, it's inside Object
    render() {
        //debugger;
        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}/>
    }
}

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

// In this situation we work wiyh Container Component - UsersAPIComponent
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);