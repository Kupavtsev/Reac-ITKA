import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import { Route, withRouter } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from "./redux/app-reducer";
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

class App extends React.Component {

       componentDidMount() {
              /*Вторым параметром передаем настройки запроса*/
              this.props.initializeApp();
       }

       render() {
              if (!this.props.initialized) {
                     return <Preloader />
              }

              // Мы возвращаем разметку только после Инициализации
              return (
                     <div className='app-wrapper'>
                            <HeaderContainer />
                            <Navbar />
                            <div className='app-wrapper-content'>
                                   <Route path='/dialogs'
                                          render={() => <DialogsContainer />} />

                                   {/*60 20:00 adding params for user profile
                                     path='/profile/:userId/:secondParams'
                                     :userId? - ? now param as option*/}
                                   <Route path='/profile/:userId?'
                                          render={() => <ProfileContainer />} />

                                   <Route path='/users'
                                          render={() => <UsersContainer />} />

                                   <Route path='/music' component={Music} />
                                   <Route path='/news' component={News} />
                                   <Route path='/settings' component={Settings} />

                                   <Route path='/login'
                                          render={() => <Login />} />
                            </div>
                     </div>
              );
       }
};

const mapStateToProps = (state) => ({
       // Теперь App получит знание о том
       // проинициализированно он или нет
       initialized: state.app.initialized
})


// 80 10:45 compose and withRouter, but it's work the same !!!
let AppContainer = compose(
       withRouter,
       connect(mapStateToProps, { initializeApp })
)(App);

const SocialJSApp = (props) => {
   return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SocialJSApp;