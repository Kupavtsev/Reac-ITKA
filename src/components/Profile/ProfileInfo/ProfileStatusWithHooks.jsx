import React, { useEffect, useState } from 'react';
import s from './ProfileInfo.module.css';

/*
let arr = [0 , {} => {}];
let [a, setA] = arr;
*/

const ProfileStatusWithHooks = (props) => {
    
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

/*  
    let stateWithSetState = useState(false);
    // достаем первый элемент массива
    let editMode = stateWithSetState[0];
    let setEditMode = stateWithSetState[1];
*/

    // Синхронизируем наш Статус
    // [] отрисоваться один раз
    // [props.status] создаем зависимость
    useEffect( () => {
        setStatus(props.status)
    }, [props.status] );

    const activateMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            { !editMode &&
                <div>
                    <span onDoubleClick={activateMode}>{props.status || 'Put your status here...'}</span>
                </div>
            }
            { editMode &&
                <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        value={status}
                        onBlur={deactivateEditMode} />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;