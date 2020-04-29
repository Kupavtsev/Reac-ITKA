// This is exact copy of REDUX store
// To make it clear, how Redux work inside
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

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
        sitebar: {}
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
        // renderEntireTree on the first line of state.js
        // and give her observer
        // (Here's the same logic as in onClick)
        this._callSubscriber = observer;
    },

    // This 2 methods do change our state
    // Adding message to profilePage.posts

    // observer this is pattern you should to know!!!
    // it's very similiar with 'publisher-subscriber', 'addEventListener'

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.body;
            this._callSubscriber(this._state);
        } else if (action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.newMessageBody = '';
            this._state.dialogsPage.messages.push( { id: 6, message: body } );
            this._callSubscriber(this._state);
        }

    }

};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });


export default store;
// In console we can enter 'state'
window.store = store;

// store - OOP