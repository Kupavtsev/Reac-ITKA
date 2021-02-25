const SEND_MESSAGE = 'SEND_MESSAGE'

type DialogType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Oleg'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Yuri'},
        {id: 5, name: 'Dima'},
        {id: 6, name: 'Sasha'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your mood ?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
    ] as Array<MessagesType>,
}

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): initialStateType => {

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
                messages: [...state.messages, { id: 6, message: body }],
            };
        default:
            return state
    }
}

type sendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
// 76 add newMessageBody
export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer