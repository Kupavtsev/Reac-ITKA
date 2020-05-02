// This is exact copy of REDUX store
// To make it clear, how Redux work inside
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 27},
                {id: 3, message: 'Are you going to trade?', likesCount: 127},
                {id: 4, message: 'What about Fib levels?', likesCount: 327},
            ],
            newPostText: 'You are Trader!'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Oleg'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Yuri'},
                {id: 5, name: 'Dima'},
                {id: 6, name: 'Sasha'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your mood ?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'},
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber () {
        console.log('State has changed');
    },

    // This 2 methods dont change our state
    getState() {
      return this._state;
    },
    subscribe (observer) {
        // that logic of function subscribe will find
        // renderEntireTree on the first line of store.js
        // and give her observer
        // (Here's the same logic as in onClick)
        this._callSubscriber = observer;
    },

    // This 2 methods do change our state
    // Adding message to profilePage.posts

    // observer this is pattern you should to know!!!
    // it's very similiar with 'publisher-subscriber', 'addEventListener'

    // Мы диспатчим действия из UI, которые преобразуют state
    dispatch(action) {
        // Это превращается в новый profilePage после обработки Редьюсером
        // Т.е. через эту переменную state обновился
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        // Мы сначала преоброзавали ветки store редьюсором
        // а дольше уведомили подписчиков
        this._callSubscriber(this._state);
    }

};


export default store;
// In console we can enter 'state'
window.store = store;

// store - OOP