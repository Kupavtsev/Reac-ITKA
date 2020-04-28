import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        //props.addPost();
        props.dispatch({ type: 'ADD-POST' });
        // Now we make textarea empty, throw state
        // Old version of empty textarea
        //props.updateNewPostText('');
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        //props.updateNewPostText(text);
        let action = { type: 'UPDATE-NEW-POST-TEXT', newText: text };
        props.dispatch(action);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea onChange={ onPostChange } ref={newPostElement} value={props.newPostText} />
                </div>
                <div>
                    <button onClick={ addPost }>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;