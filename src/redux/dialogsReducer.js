const ADD_MESSAGE = 'ADD_MESSAGE';


let initialState = {
    dialogs: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Alice'},
        {id: 3, name: 'Alex'},
        {id: 4, name: 'Edward'},
        {id: 5, name: 'Daria'},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'How are you?'},
        {id: 4, message: 'Hi!'},
        {id: 5, message: 'Heeyyy'},
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: action.newMessage
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
};

export const addMessageActionCreator = (newMessage) => ({
    type: ADD_MESSAGE,
    newMessage
});

export default dialogsReducer;