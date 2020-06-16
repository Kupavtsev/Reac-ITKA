import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
    /*if (props.profile == null || typeOf(props.profile) == undefined)*/
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={s.image}>
                <img
                    src='https://miro.medium.com/max/2800/1*WbcprlGOq8O5qVs7l-tPww.png'></img>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} />
            </div>
            <div>{props.profile.aboutMe}</div>

        </div>
    )
}

export default ProfileInfo;