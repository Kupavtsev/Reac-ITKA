import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
//console.log(s)

// let s = {
//   'nav': 'Navbar_nav__vAKxE',
//   'item': 'Navbar_item__1W7dl',
//   'active': 'Navbar_active__2j4Cr'
// }

/*let c1 = "item";
let c2 = "active";
className="item active"
let classes = c1 + " " + c2;
let classesNew = {`${c1}  ${c2}`}*/

const Navbar = () => {
    return (
        <nav className={s.nav}>
        <div className={s.item}>
          <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
          </div>
        <div className={`${s.item} ${s.active}`}>
          <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
        </div>
      </nav>
    )
}

export default Navbar;