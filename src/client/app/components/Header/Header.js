import React from 'react';
import styles from './Header.scss';

export default class Header extends React.Component {
    render() {
        return(
            <div className={styles.headerContainer}>
                <label>ToDo List</label>
                <i className="fa fa-address-book" aria-hidden="true" />
            </div>
        );
    }
}