import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    post: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "HELOOOO?", likesCount: 11},
        {id: 3, message: "HELlo?", likesCount: 15},
        {id: 4, message: "Maks", likesCount: 11},
        {id: 5, message: "KEKEKEK", likesCount: 16},
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 6,
                message: action.newPost,
                likesCount: 0
            };
            return {
                ...state,
                post: [...state.post, newPost]
            };
        // case UPDATE_NEW_POST_TEXT:
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
};

export const addPostActionCreator = (newPost) => ({
    type: ADD_POST,
    newPost
});

// export const updateNewPostTextActionCreator = (text) => ({
//     type: UPDATE_NEW_POST_TEXT,
//     newText: text
// });

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});

export const setStatus = (status) => ({
    type: SET_STATUS,
    status
});

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
        console.log(response);
        dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
        console.log(response);
        dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
        console.log(response);
        if(response.resultCode === 0) {
            dispatch(setStatus(status));
        }
};

export default profileReducer;