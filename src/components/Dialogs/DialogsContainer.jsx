import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

// Две фун-ции, которые возвращают объект
// Замапить state на пропсы, превратить часть state в props
let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};
let mapDispatchToProps = (dispatch) => {
    // Он перепутал диспатчи местами ?
    return {
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        }
    }
};

let authRedirectComponent = withAuthRedirect(Dialogs);
    

// Новая контейнерная ком-нта
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(authRedirectComponent);

export default DialogsContainer;