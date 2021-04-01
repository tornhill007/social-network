import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControl/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import classes from "../common/FormsControl/FormsControls.module.css"

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"} component={Input} placeholder={"email"} validate={[required]}/>
            </div>
            <div>
                <Field name={"password"} component={Input} placeholder={"password"} validate={[required]}/>
            </div>
            <div>
                <Field name={"rememberMe"} component={Input} type={"checkbox"}/> remember me
            </div>
        {props.captchaUrl && <img src={props.captchaUrl} alt="captcha"/>}
        {props.captchaUrl && <Field name={"captcha"} component={Input} placeholder={"Symbols"} validate={[required]}/>}
            {props.error && <div className={classes.formError}>{props.error}</div>}
            <div>
                <button>
                    Login
                </button>
            </div>
        </form>
};

const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm)


const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };

    if(props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <ReduxLoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);