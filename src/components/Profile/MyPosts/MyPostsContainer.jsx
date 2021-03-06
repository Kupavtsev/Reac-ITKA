import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    //debugger;
    return {
        posts: state.profilePage.posts,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostElement) => { dispatch(addPostActionCreator(newPostElement)) }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;