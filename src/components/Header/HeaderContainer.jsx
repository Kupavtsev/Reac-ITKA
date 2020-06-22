import React from 'react';
import Header from "./Header";
import * as axios from 'axios';
import {connect} from 'react-redux';
import {setAuthUserData} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {

    componentDidMount() {
        /*Вторым параметром передаем настройки запроса*/
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    /*Здесь два раза data, т.к. на сервере тоже используется data*/
                    this.props.setAuthUserData(id, email, login);
                }
            });
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

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);