import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

// Смешиваем нащи 3 редьюсера
// form - ONLY this key word!
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    /*23:00 55 more explanation*/
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

// Отдаем store закомбайненые Редьюсеры
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;