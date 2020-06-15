import React from 'react';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControl/FormsControls";

const maxLength10 = maxLength(10);

const MyPostsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field placeholder={"Post message"} component={TextArea} name={"newPost"} validate={[required, maxLength10]}/>
        <div>
            <button>Add post</button>
        </div>
    </form>
};

const MyPostsFormRedux = reduxForm({form: "newPost"})(MyPostsForm);

const MyPosts = (props) => {
        console.log("KEK");
        console.log(props);
        let postsElements = props.post.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

        let newPostElement = React.createRef();

        // let addPost = () => {
        //     props.addPost();
        // };

        let addPost = (values) => {
            console.log(values);
            props.addPost(values.newPost);
        };

        // let onPostChange = () => {
        //     let text = newPostElement.current.value;
        //     props.updateNewPostText(text);
        // };

        // let onPostChange = () => {
        //     let text = newPostElement.current.value;
        //     props.updateNewPostText(text);
        //
        // };

        console.log(props.post);

        return (
            <div>
                My posts
                <div>
                    <MyPostsFormRedux onSubmit={addPost}/>
                </div>
                <div>
                    {postsElements}
                </div>
            </div>
        );
    }

export default MyPosts;
