import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

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

// Закидывание происходит с конца, от Dialogs
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )
    (Dialogs);;