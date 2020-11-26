import React from 'react';
import styles from "./Paginator.module.css";


let Paginator = (props) => {

    // Math.ceil() округление в большую сторону
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {/* onClick т.к. обработчик события html элемента, то приходит (event) */}
        {pages.map(p => {
            return <span
                className={props.currentPage === p && styles.selectedPage}
                onClick={(e) => {
                    props.onPageChanged(p);
                }}>
                {p}
            </span>
            /*className={true ? styles.selectedPage : ""}*/
        })}
    </div>
}

export default Paginator;