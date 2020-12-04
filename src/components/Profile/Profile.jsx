import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    //debugger;
    return (
      <div>
          <ProfileInfo profile={props.profile}
          isOwner={props.isOwner}
          status={props.status}
          updateStatus={props.updateStatus}
          savePhoto={props.savePhoto}
          saveProfile={props.saveProfile}
          />
          <MyPostsContainer />
      </div>
    )
};

export default Profile;