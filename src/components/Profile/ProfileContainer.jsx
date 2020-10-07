import React from 'react';
import Profile from "./Profile";
import {connect} from 'react-redux';
import {getUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

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


let authRedirectComponent = withAuthRedirect(ProfileContainer)

// Мы ставим () вне тела функции, т.к. она возвращает объект
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter(authRedirectComponent);

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);