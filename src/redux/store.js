import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";


let store = {
    _callSubscriber() {
        console.log('State changed');
    },
    _state: {
        dialogsPage: {
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
            ],
            newMessageBody: 'hello'
        },
        profilePage: {
            post: [
                {id: 1, message: "Hi, how are you?", likesCount: 12},
                {id: 2, message: "HELOOOO?", likesCount: 11},
                {id: 3, message: "HELlo?", likesCount: 15},
                {id: 4, message: "Maks", likesCount: 11},
                {id: 5, message: "KEKEKEK", likesCount: 16},
            ],
            newPostText: 'KEK'
        }
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    // addPost() {
    //     let newPost = {
    //         id: 6,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 0
    //     };
    //     this._state.profilePage.post.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this._callSubscriber(this._state);
    // },
    //
    // updateNewPostText(newText) {
    //     this._state.profilePage.newPostText = newText;
    //     this._callSubscriber(this._state);
    // },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
    },
};


export default store;