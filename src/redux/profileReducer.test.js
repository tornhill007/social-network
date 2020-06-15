import React from "react";
import profileReducer, {addPostActionCreator} from "./profileReducer";

let state = {
    post: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "HELOOOO?", likesCount: 11},
        {id: 3, message: "HELlo?", likesCount: 15},
        {id: 4, message: "Maks", likesCount: 11},
        {id: 5, message: "KEKEKEK", likesCount: 16},
    ]
};

it('length of posts should be incremented', () => {
    //1.test data
    let action = addPostActionCreator("NewPost");
    //2.action
    let newState = profileReducer(state, action);
    //3.expectation
    expect(newState.post.length).toBe(6);
});

it('length of posts should be incremented', () => {
    //1.test data
    let action = addPostActionCreator("NewPost");
    //2.action
    let newState = profileReducer(state, action);
    //3.expectation
    expect(newState.post[5].message).toBe("NewPost");
});
