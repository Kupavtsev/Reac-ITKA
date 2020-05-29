import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    //debugger;
    return (
      <div>
          <ProfileInfo />
          <MyPostsContainer />
      </div>
    )
};

export default Profile;