import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    let [editMode, setEditMode] = useState(false);

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

    // 97
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => { setEditMode(false) } // выходим из режима редактирования
            );
    }

    return (
        <div className={s.descriptionBlock}>
            {/* <div className={s.image}>
                <img
                    src='https://miro.medium.com/max/2800/1*WbcprlGOq8O5qVs7l-tPww.png'></img>
            </div> */}
            <div >
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}

                {
                    editMode
                        ? <ProfileDataForm 
                            initialValues={profile}
                            profile={profile} 
                            onSubmit={onSubmit} />
                        : <ProfileData
                            profile={profile}
                            isOwner={isOwner}
                            goToEditMode={() => { setEditMode(true) }} />
                }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>



        </div>
    )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return <div>
        {
            isOwner &&
            <div>
                <button onClick={goToEditMode}>edit</button>
            </div>
        }
        <div>
            <b>Full name: </b>{profile.fullName}
        </div>
        <div>
            {/* profile.lookingForAJob - this is API data*/}
            <b>Looking for a job: </b>{profile.lookingForAJob ? "yes" : "no"}
        </div>
        {
            profile.lookingForAJob &&
            <div>
                {/* profile.lookingForAJobDescription - this is API data*/}
                <b>My professional skiils: </b>{profile.lookingForAJobDescription}
            </div>
        }
        <div>
            {/* profile.aboutMe - this is API data*/}
            <b>About me: </b>{profile.aboutMe}
        </div>
        <div className={s.contact}>
            {/* Object.keys() - получаем ключи свойств объекта
                    return Обязательно вернуть из MAP */}
            <b>Contacts</b>: {Object.keys(profile.contacts)
                .map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                }
                )}
        </div>
    </div>
}

const Contact = ({ contactTitle, contactValue }) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;