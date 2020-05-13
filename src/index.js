import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

// this is local 'state' used when someone else use this function
let renderEntireTree = (state) => {
    debugger;
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>, document.getElementById('root'));
};

// this state goes from import
renderEntireTree(store.getState());

// This is CallBack - one function inside other
// (here we give to subscribe function from line 11 of index.js)
// 42 когда store изменится вызовится эта стрелочная функция
store.subscribe(() => {
    let state = store.getState();
    renderEntireTree(state);
});

// Base version.
/*ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages}/>
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
