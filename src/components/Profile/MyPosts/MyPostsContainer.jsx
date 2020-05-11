import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    let addPost = () => {
                        // ActionCreator это функция, которая возвращает action
                        // action это объект у которого есть как минимум свойство type
                        store.dispatch(addPostActionCreator());
                    };

                    let onPostChange = (text) => {
                        let action = updateNewPostTextActionCreator(text);
                        // Это универсальная функция store, поэтому закрываем доступ
                        store.dispatch(action);
                    };

                    return <MyPosts updateNewPostText={onPostChange}
                                    addPost={addPost}
                                    posts={state.profilePage.posts}
                                    newPostText={state.profilePage.newPostText}/>
                }
            }
        </StoreContext.Consumer>
    )
};

export default MyPostsContainer;