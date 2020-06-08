import React from 'react';
import styles from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/user.png';

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                //debugger;
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                //debugger;
                this.props.setUsers(response.data.items)
            });
    }

    // Render Going before componentDidMount
    // Must be in any Class for JSX
    // props in RENDER doesn't come in, it's inside Object
    render() {
        //debugger;
        // Math.ceil() округление в большую сторону
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return <div>
            <div>
                {/*// onClick т.к. обработчик события html элемента, то приходит (event)*/}
                {pages.map( p=> {
                    return <span className={this.props.currentPage === p && styles.selectedPage}
                                 onClick={ (e)=> { this.onPageChanged(p); }}>{p}</span>
                    /*className={true ? styles.selectedPage : ""}*/
                })}
            </div>
            {/*We need to add this. to getUsers to make connection with instance of class Users*/}
            {/*<button onClick={this.getUsers}>Get Users from server</button>*/}
            {
                // props now become part of Object so we need to write this.props
                // 23:00 55 more explanation
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