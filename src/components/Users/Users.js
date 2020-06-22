import React from 'react';
import styles from "./users.module.css";
import userPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import * as axios from 'axios';

let Users = (props) => {

    // Math.ceil() округление в большую сторону
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {/*// onClick т.к. обработчик события html элемента, то приходит (event)*/}
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                             onClick={(e) => {
                                 props.onPageChanged(p);
                             }}>{p}</span>
                /*className={true ? styles.selectedPage : ""}*/
            })}
        </div>
        {/*We need to add this. to getUsers to make connection with instance of class Users*/}
        {/*<button onClick={this.getUsers}>Get Users from server</button>*/}
        {
            // props now become part of Object so we need to write this.props
            // 23:00 55 more explanation
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {/*Разные кнопки, в зависимоти от followed/unfollowed*/}
                        {u.followed
                            ? <button onClick={() => {

                                /*On the DELETE withCredentials second Arg*/
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "free"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.unfollow(u.id);
                                        }
                                    });


                            }}>Unfollow</button>
                            : <button onClick={() => {

                                /* Server API follow/{userId}, we must be authorized
                                * Our second Arg is null or an empty object*/
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "free"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.follow(u.id);
                                        }
                                    });



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
};

export default Users;