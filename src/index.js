//import React from 'react';
//import './index.css';
import * as serviceWorker from './serviceWorker';
import {renderEntireTree} from "./render";
import state from "./redux/state";


renderEntireTree(state);


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
