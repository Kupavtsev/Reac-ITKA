import {renderEntireTree} from "../render";

let state = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 27},
            {id: 3, message: 'Are you going to trade?', likesCount: 127},
            {id: 4, message: 'What about Fib levels?', likesCount: 327},
        ]
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

// Adding message to profilePage.posts
export let addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    renderEntireTree(state);
};

export default state;