import React from 'react';
import styles from './FormsControls.module.css';
import { Field } from 'redux-form';


// One for both, DRY
const FormControl = ({ input, meta: { touched, error }, children }) => {
    // Now we use REST Operator
    // const hasError = meta.touched && meta.error;
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            { hasError && <span>{error}</span>}
            {/* { meta.touched && meta.error && <span>"some error"</span>} */}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}

// First which is work!
// Now we use REST Operator
/*
export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                // Now in 'props' there is no more 'meta' and 'input' 
                <textarea {...input} {...props} />
            </div>
            { hasError && <span>{meta.error}</span>}
            // { meta.touched && meta.error && <span>"some error"</span>}
        </div>
    )
}
*/

/* This is working variant
export const Textarea = (props) => {
    return (
        <div>
            <textarea {...props.input} />
        </div>
    )
}
*/

// Second which is work!
/*
export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input} {...props} />
            </div>
            { hasError && <span>{meta.error}</span>}
        </div>
    )
}
*/

export const createField = (placeholder, name, validators, component, props = {}, text = "") => (
    <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        />
        {text}
    </div>
)
