import React from 'react';
import styles from './Header.scss';

export default class Header extends React.Component {
    render() {
        console.log('styles', styles);
        return(
            <div className={styles.headerContainer}>
                <label>ToDo List</label>
            </div>
        );
    }
}