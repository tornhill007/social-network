import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input, TextArea} from "../../common/FormsControl/FormsControls";
import {required} from "../../../utils/validators/validators";
import classes from "../../common/FormsControl/FormsControls.module.css";

const ProfileDataForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
        </div>
        {props.error && <div className={classes.formError}>{props.error}</div>}
        <div>
            <div>
                <h4>FullName: </h4><Field name={"fullName"} component={Input} placeholder={"fullName"}/>
            </div>
            <div>
                <h4>lookingForAJob: </h4><Field name={"lookingForAJob"} component={Input} type={"checkbox"}/>
            </div>
            <div>
                <h4>My professional skills: </h4><Field name={"lookingForAJobDescription"} component={TextArea} placeholder={"My professional skills"}/>
            </div>
            <div>
                <h4>About me: </h4><Field name={"aboutMe"} component={TextArea} placeholder={"About me"}/>
            </div>
            <div>
                <h4>Contacts: </h4>{Object.keys(props.profile.contacts).map(key =>
                <div>{key}: <Field name={"contacts." + key} component={Input} placeholder={key}/></div>
            )}
            </div>
            <div>
                <button>Save</button>
            </div>
        </div>
    </form>
};

const ReduxProfileDataForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm)

export default ReduxProfileDataForm;
