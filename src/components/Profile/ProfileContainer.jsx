import React from 'react';
import Profile from "./Profile";
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    componentDidMount() {
        /*userId becuase we give this param in App.js*/
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            // 80 33:00
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        // console.log("Render Profile")
        return (
            /*16:00 59 Lesson*/
            <Profile {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}

// Мы ставим () вне тела функции, т.к. она возвращает объект
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter,
    //withAuthRedirect
)
    (ProfileContainer);