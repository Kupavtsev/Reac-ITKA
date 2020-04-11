import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src='https://img.freepik.com/free-vector/abstract-circle-dot-gradation-background_2095-224.jpg?size=626&ext=jpg'></img>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;