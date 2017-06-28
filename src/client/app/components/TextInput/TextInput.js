import React from 'react';
import styles from './TextInput.scss';

export default class TextInput extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <label>Title</label>
                <input/>
            </div>
        )
    }
}