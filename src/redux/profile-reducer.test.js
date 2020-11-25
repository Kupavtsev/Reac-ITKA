import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";
import React from 'react';

// 1.start data
let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 27 },
        { id: 3, message: 'Are you going to code?', likesCount: 127 },
        { id: 4, message: 'What about Fib levels?', likesCount: 327 },
    ]
};
// 2. action
let action = addPostActionCreator('New post text');

it('Length of posts should be incremented', () => {
    // 1.start data
    

    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(5);
})

it('Message of new posts should be correct', () => {
    
    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts[4].message).toBe('New post text');
})

it('Length after deleting should be decrement', () => {
    // 2. action
    let action = deletePost(1);

    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(3);
})

it(`After deleting length shouldn't be decrement if ID is incorrect`, () => {
    // 2. action
    let action = deletePost(1000);

    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(4);
})