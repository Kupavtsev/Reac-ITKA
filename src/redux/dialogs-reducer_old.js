const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Oleg'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Yuri'},
        {id: 5, name: 'Dima'},
        {id: 6, name: 'Sasha'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your mood ?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
    ],
    // 76 we delete, now it's not in state
    // newMessageBody: ""
};

const dialogsReducer = (state = initialState, action) => {

    /*let stateCopy = { ...state };
    stateCopy.messages = [...state.messages];*/

    switch (action.type) {
        case SEND_MESSAGE:
            //let body = state.newMessageBody;
            // 76 now it goes from action
            let body = action.newMessageBody;
            return {
                ...state,
                //newMessageBody : '',
                messages: [...state.messages, { id: 6, message: body }]
            };
        default:
            return state;
    }
};

// 76 add newMessageBody
export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;