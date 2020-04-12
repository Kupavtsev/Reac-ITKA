import React from 'react';
import s from './Post.module.css';

const Post = (props) => {

  return (
    <div className={s.item}>
      <img src='https://cdn1.iconfinder.com/data/icons/job1-1/64/businessman-job-avatar-occupation-jobs-business-trader-512.png'></img>
            {props.message}
      <div>
        <span>like </span> {props.likesCount}
      </div>
    </div>
  )
}

export default Post;