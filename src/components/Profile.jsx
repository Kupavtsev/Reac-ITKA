import React from 'react';
import s from './Profile.module.css';

const Profile = () => {
    return (
        <div className={s.content}>Main Content
        <div>
          <img src='https://img.freepik.com/free-vector/abstract-circle-dot-gradation-background_2095-224.jpg?size=626&ext=jpg'></img>
        </div>
        <div>
          ava + description
        </div>
        <div>
          My post
          <div>
            New post
          </div>
          <div className={s.posts}>
            <div className={s.item}>
              post 1
            </div>
            <div className={s.item}>
              post 2
            </div>
          </div>
        </div>
      </div>
    )
}

export default Profile;