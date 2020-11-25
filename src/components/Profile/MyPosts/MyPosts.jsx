import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newPostElement' placeholder={'Post message'}
                    validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({
    form: 'postAddElementForm'
})(AddNewPostForm);

//window.props = [];
const MyPosts = React.memo((props) => {

    /*
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props || nextState != this.state;
        // return nextProps != this.props || nextState != this.state;
    }
    */

    console.log('Render MyPosts');
    //window.props.push(this.props);

    let postsElements = [...props.posts]
        .reverse() //this is correct because we do copy of Array
        .map(p => <Post message={p.message} likesCount={p.likesCount} />);
        //.reverse() WRONG for Pure Function this is mutual method !!!

    let onAddPost = (values) => {
        props.addPost(values.newPostElement);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <AddNewPostFormRedux onSubmit={onAddPost} />
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )

})

export default MyPosts;