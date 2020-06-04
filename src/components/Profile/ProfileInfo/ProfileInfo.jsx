import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div className={s.image}>
                <img
                    src='https://miro.medium.com/max/2800/1*WbcprlGOq8O5qVs7l-tPww.png'></img>
            </div>
            <div className={s.descriptionBlock}>

            </div>
        </div>
    )
}

export default ProfileInfo;