import React from 'react';
import classes from './Dialogs.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {addMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogsReducer";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators/validators";
import {TextArea} from "../common/FormsControl/FormsControls";

console.log(classes);

const DialogItem = (props) => {
    console.log(props);
    let path = "/dialogs/" + props.id;

    return <div className={classes.dialog}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

const Message = (props) => {
    return <div className={classes.message}>{props.message}</div>
}


const Dialogs = (props) => {
    console.log(props.dialogsPage);
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = state.messages.map(message => <Message message={message.message}/>);


    let onAddMessageClick = (values) => {
        props.onAddMessageClick(values.newMessage);
    };

    const maxLength20 = maxLength(20);

    const NewMessageForm = (props) => {
        return <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name={"newMessage"} validate={[required, maxLength20]}/>
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    };

    const NewMessageFormRedux = reduxForm({form: "newMessage"})(NewMessageForm);

    return (
        <div className={classes.container}>
            <div className={classes.wrapperDialog}>
                {dialogsElements}
                {/*<div className={classes.dialog + ' ' + classes.active}>*/}
                {/*    <NavLink to="/dialogs/1">Andrew</NavLink>*/}
                {/*</div>*/}
            </div>
            <div className={classes.wrapperMessage}>
                <div>{messagesElements}</div>
                <NewMessageFormRedux onSubmit={onAddMessageClick}/>
            </div>
        </div>
    );
}

export default Dialogs;
