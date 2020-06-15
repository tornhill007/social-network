import React from 'react';
import classes from './Post.module.css'

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img src="https://img.icons8.com/pastel-glyph/2x/user-male.png" alt="userEmblem"/>
            { props.message}
            <div>
                <span>like { props.likesCount }</span>
            </div>
        </div>
    );
}

export default Post;
