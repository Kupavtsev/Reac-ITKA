import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SocialJSApp from './App';

// this is local 'state' used when someone else use this function

/*
setInterval(() => {
    store.dispatch({type:"FAKE"})
}, 1000);
*/


// 89 <BrowserRouter> and <Provider> moved to app.js this is Mistake! - 90 28:00
// When we use HOC withRouter in app.js it should be already inside of <BrowserRouter> and <Provider>
// after 'return'
ReactDOM.render(
            <SocialJSApp />
        , document.getElementById('root'));


/*renderEntireTree(store.getState());*/

// This is CallBack - one function inside other
// (here we give to subscribe function from line 11 of index.js)
// 42 когда store изменится вызовится эта стрелочная функция
// 47 Delete 10:10
/*store.subscribe(() => {
    let state = store.getState();
    renderEntireTree(state);
});*/

// His version on 47 lesson! 8:48
/*
renderEntireTree();
store.subscribe(() => {
    renderEntireTree();
    })
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
