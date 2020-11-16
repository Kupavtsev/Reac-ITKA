// this is validator
export const required = value => {
    if (value) return undefined;
    return 'Field is required';
}

// THUNK
// this is creator of validator
export const maxLengthCreator = (maxLength) => value => {
    if (value.length > maxLength) return `max length is ${maxLength} symbols`;
    return undefined;
}


// value && value.lengh > 30
// if the data will be 'null' there is
// no length prop