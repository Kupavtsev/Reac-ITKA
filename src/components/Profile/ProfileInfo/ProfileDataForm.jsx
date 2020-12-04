import React from 'react';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';
import { reduxForm } from 'redux-form';
import s from './ProfileInfo.module.css';
import style from '../../common/FormsControls/FormsControls.module.css';


const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        { error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }
        <div>
            <b>Full name: </b>{createField("Full name", "fullName", [], Input)}
        </div>
        <div>
        {/* { type: "checkbox" } - параметр пропсов */}
            <b>Looking for a job: </b>{createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
        </div>
        
            <div>
                <b>My professional skiils: </b>
                {createField("My professional skiils", "lookingForAJobDescription", [], Textarea )}
            </div>
        
        <div>
            <b>About me: </b>
            {createField("About me", "aboutMe", [], Textarea )}
        </div>

         <div className={s.contact}>
        <b>Contacts</b>: {Object.keys(profile.contacts)
            .map(key => {
                return <div key={key} className={s.contact}>
                    {/* 97 52min */}
                    <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                </div>
            }
            )}
    </div> 
    </form>
}

const ProfileDataFormReduxForm = reduxForm({
    // a unique name for the form
    // "form" doesn't have any connection with "form" in redux-store
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;