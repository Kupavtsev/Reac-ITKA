let renderEntireTree = () => {
    console.log('State has changed');
};

let state = {
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
        ]
    },
    sitebar: {}
};

// ?? In console we can enter 'state'
window.state = state;

// Adding message to profilePage.posts
export const addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    renderEntireTree(state);
};

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    renderEntireTree(state);
};

// observer this is pattern you should to know!!!
// it's very similiar with 'publisher-subscriber', 'addEventListener'
export const subscribe = (observer) => {
    // that logic of function subscribe will find
    // renderEntireTree on the first line of state.js
    // and give her observer
    // (Here's the same logic as in onClick)
    renderEntireTree = observer;
};

export default state;

// store - OOP