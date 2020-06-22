import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

// Смешиваем нащи 3 редьюсера
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    /*23:00 55 more explanation*/
    usersPage: usersReducer,
    auth: authReducer
});

// Отдаем store закомбайненые Редьюсеры
let store = createStore(reducers);

window.store = store;

export default store;