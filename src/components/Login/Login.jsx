// https://redux-form.com/8.3.0/docs/gettingstarted.md/

import React from 'react';
import { Field, reduxForm } from 'redux-form';


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component={"input"} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={"input"} />
            </div>
            <div>
                <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxFrom = reduxForm({
    // a unique name for the form
    // "form" doesnt have any connection with "form" in redux-store
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit  = (formData) => {
        console.log(formData);
    }

    return <div>
        <h1>Login</h1>
        {/* This name is gpoing to HOC reduxForm 
        <LoginForm /> */}
        <LoginReduxFrom onSubmit={onSubmit} />
    </div>
};

export default Login;