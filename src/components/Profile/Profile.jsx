import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts'

const Profile = () => {
    return (
      <div>Main Content
        <div>
          <img src='https://img.freepik.com/free-vector/abstract-circle-dot-gradation-background_2095-224.jpg?size=626&ext=jpg'></img>
        </div>
        <div>
          ava + description
        </div>
          <MyPosts />
      </div>
    )
}

export default Profile;