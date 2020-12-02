import React from 'react';
import Profile from "./Profile";
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    refreshProfile() {
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

    componentDidMount() {
        this.refreshProfile()        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // 96
        // We do here the same as in componentDidMount
        if (this.props.match.params.userId != prevProps.match.params.userId) {
        this.refreshProfile()
        }
    }

    render() {
        // console.log("Render Profile")
        return (
            /*16:00 59 Lesson*/
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
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
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
    withRouter,
    //withAuthRedirect
)
    (ProfileContainer);