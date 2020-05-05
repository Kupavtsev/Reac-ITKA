import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {
    debugger;
    let state = props.store.getState();


    let addPost = () => {
        // ActionCreator это функция, которая возвращает action
        // action это объект у которого есть как минимум свойство type
        props.store.dispatch(addPostActionCreator());
    };

    let onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text);
        // Это универсальная функция store, поэтому закрываем доступ
        props.store.dispatch(action);
    };

    return (<MyPosts updateNewPostText={ onPostChange } addPost={ addPost } posts={state.profilePage.posts}
                     newPostText={state.profilePage.newPostText} />)
};

export default MyPostsContainer;