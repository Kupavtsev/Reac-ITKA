import React from 'react';
import Profile from "./Profile";
import {connect} from 'react-redux';
import {getUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    componentDidMount() {
        //debugger;
        /*userId becuase we give this param in App.js*/
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId);
    }

    render() {

        return (
            /*16:00 59 Lesson*/
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

// Мы ставим () вне тела функции, т.к. она возвращает объект
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});


export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    //withAuthRedirect
)
(ProfileContainer);