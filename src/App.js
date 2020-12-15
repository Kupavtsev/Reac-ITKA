import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import { HashRouter, Redirect, Route, Switch, withRouter, BrowserRouter } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from "./redux/app-reducer";
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from "./redux/redux-store";
import { Provider } from "react-redux";
import Music from "./components/Music/Music";
import { withSuspense } from './hoc/withSuspense';

//import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); // Lazy Loading
//import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer')); // Lazy Loading

//const Music = React.lazy(() => import('./components/Music/Music')); // Lazy Loading

class App extends React.Component {

       // 99 40min
       /*
       catchAllUnhandleErrors = (promiseRejectionEvent) => {
              alert("Some error occured");
              //console.error(promiseRejectionEvent);
       }
       */
       componentDidMount() {
              /*Вторым параметром передаем настройки запроса*/
              this.props.initializeApp();
              //window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors); 99
       }
       /* 99
       componentWillMount() {
              window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors);
       }
       */

       render() {
              if (!this.props.initialized) {
                     // Если запускается Preloader, значит компонета вмонтировалась
                     // и запускается componentDidMount
                     return <Preloader />
              }

              // Мы возвращаем разметку только после Инициализации
              return (
                     <div className='app-wrapper'>
                            <HeaderContainer />
                            <Navbar />
                            <div className='app-wrapper-content'>
                                   <Suspense fallback={<Preloader />}>
                                          <Switch>
                                                 <Route exact path='/'
                                                        render={ () => <Redirect to={"/profile"}/>} />

                                                 <Route path='/dialogs'
                                                        render={withSuspense(DialogsContainer)} />

                                                 {/* <Suspense fallback={<Preloader />}>
                                                  <Route path='/dialogs'
                                                  render={() => <DialogsContainer />} />
                                                  </Suspense> */}


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

                                                 <Route path='/*' exact={true}
                                                        render={() => <div>404 NOT FOUND</div>} />


                                          </Switch>
                                   </Suspense>
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


// 80 10:45 compose and withRouter, but it's work the same without it !!!
let AppContainer = compose(
       withRouter,
       connect(mapStateToProps, { initializeApp }))(App);

const SocialJSApp = (props) => {
       // basename необходимо для корректной работы на GitHub с путями
       // basename={"https://kupavtsev.github.io/Reac-ITKA/"} production
       // basename={process.env.PUBLIC_URL} рабоает корректно с <BrowserRouter>
       return <BrowserRouter>
              <Provider store={store}>
                     <AppContainer />
              </Provider>
       </BrowserRouter>
}

export default SocialJSApp;