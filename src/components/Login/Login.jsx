// https://redux-form.com/8.3.0/docs/gettingstarted.md/

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from './../common/FormsControls/FormsControls.module.css';


const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, { type: "password" })}
            {createField(null, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}
            
            {/* Создаем на экране Каптчу и поле для нее */}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {})}

            { error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxFrom = reduxForm({
    // a unique name for the form
    // "form" doesn't have any connection with "form" in redux-store
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        // 'login' it's not the same as in 'connect'
        // it's not Thunk creator
        // 78 19:00 это CB который внутри себя диспатчит вызов Thunk Creator
        // из connect, в который передаются эти же параметры, что и в CB
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div>
        <h1>Login</h1>
        <h2>Email: free@samuraijs.com</h2>
        <h2>Password: free</h2>
        {/* This name is gpoing to HOC reduxForm 
        <LoginForm /> */}
        <LoginReduxFrom onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
};

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

// mdtp we put thunk creators straight from auth-reducer
export default connect(mapStateToProps, { login })(Login);