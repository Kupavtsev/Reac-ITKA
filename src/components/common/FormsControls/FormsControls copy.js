// from coments!
import React from 'react';
import styles from './FormsControls.module.css';


const FormControl = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
             <Element {...input} {...props} />
            { hasError && <span>{meta.error}</span>}
        </div>
    )
}

//А потом просто его импортим в компоненту формы, вызываем как
const Textarea = Element("textarea");


<Field component={Textarea} .../>