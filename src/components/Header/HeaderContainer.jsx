import React from 'react';
import Header from "./Header";
import * as axios from 'axios';
import {connect} from 'react-redux';
import {getAuthUserData} from "../../redux/auth-reducer";
import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component {

    componentDidMount() {
        /*Вторым параметром передаем настройки запроса*/
        this.props.getAuthUserData();
    }

    render () {
        /*Пробрасываем пропсы для компоненты Header*/
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);