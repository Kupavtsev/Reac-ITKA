import React from 'react';
import Header from "./Header";
import {connect} from 'react-redux';
import {getAuthUserData, logout} from "../../redux/auth-reducer";

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

export default connect(mapStateToProps, { getAuthUserData, logout })(HeaderContainer);