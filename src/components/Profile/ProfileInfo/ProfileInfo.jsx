import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import userPhoto from '../../../assets/images/user.png';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    /*If there is no "profile" it shows preloader*/
    /*if (props.profile == null || typeOf(props.profile) == undefined)*/
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            {/* <div className={s.image}>
                <img
                    src='https://miro.medium.com/max/2800/1*WbcprlGOq8O5qVs7l-tPww.png'></img>
            </div> */}
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto } className={s.mainPhoto} />
                { isOwner && <input type={'file'} onChange={onMainPhotoSelected} /> }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
            <div>{profile.aboutMe}</div>

        </div>
    )
}

export default ProfileInfo;