import React from 'react';
import s from './Post.module.css';

const Post = (props) => {

  return (
    <div className={s.item}>
      <img src='https://lh3.googleusercontent.com/proxy/1ZDBmL-bG_czN8Jy2a6gDRiN-OKPWfRm4p4aAxbL4mIz7b9cUQXgXmFjEr_ExebNhjy1nZs4SO76NuVIS89JcGS12e5ivrQmvKIQBO0x4S_kVNlxgGdooY7Qqr4l'></img>
            {props.message}
      <div>
        <span>like</span>
      </div>
    </div>
  )
}

export default Post;