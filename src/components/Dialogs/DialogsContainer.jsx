import {sendMessageCreator} from "../../redux/dialogs-reducer";
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
    return {
        // 76 now it's accept newMessageBody from Dialogs
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
};

// Закидывание происходит с конца, от Dialogs
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )
    (Dialogs);;