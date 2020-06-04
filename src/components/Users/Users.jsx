import React from 'react';
import styles from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/user.png';

class Users extends React.Component {

    constructor(props) {
        super(props);
        alert('NEW')
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                //debugger;
                this.props.setUsers(response.data.items)
            });
    }

    // Must be in any Class for JSX
    // props in RENDER doesn't come in
    render() {
        return <div>
            {/*We need to add this. to getUsers to make connection with instance of class Users*/}
            {/*<button onClick={this.getUsers}>Get Users from server</button>*/}
            {
                // props now become part of Object
                // so we need to write this.props
                this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                    </div>
                    <div>
                        {/*Разные кнопки, в зависимоти от followed/unfollowed*/}
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
                </div>)
            }
        </div>
    }
}

export default Users;