import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { Textarea } from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        // handleSubmit придет из Конт Комп redux-form
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Message'} name={'newMessageBody'}
                 component={Textarea} validate={[required, maxLength50]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

const Dialogs = (props) => {
    // обращаемся к store и получаем тот state, который
    // нам нужен для Dialogs
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
    /*
    let newMessageBody = state.newMessageBody;
    */
    
    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }
    
    if (!props.isAuth) return <Redirect to="/login" />

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                {/* <div>
                    <div><textarea value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter' /></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div> */}
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs;