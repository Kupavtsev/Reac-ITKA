import React from 'react';
import styles from './users.modules.css';

let Users = (props) => {
//debugger;
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://www.fxmag.ru/scr/avatar_male.png',
                followed: false,
                fullName: 'Oleg',
                status: 'I am a Developer',
                location: {city: 'St.Petersburg', country: 'Russia'}
            },
            {
                id: 2,
                photoUrl: 'https://www.fxmag.ru/scr/avatar_male.png',
                followed: true,
                fullName: 'Andy',
                status: 'I am a HR',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 3,
                photoUrl: 'https://www.fxmag.ru/scr/avatar_male.png',
                followed: false,
                fullName: 'Kelly',
                status: 'Where are everybody',
                location: {city: 'Moscow', country: 'Russia'}
            },

        ])
    };
//debugger;
    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
};

export default Users;