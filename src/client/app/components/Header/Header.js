import React from 'react';
import { connect } from 'react-redux';
import styles from './Header.scss';
import Button from '../Button/Button';
import { addClick } from '../../redux/reducer/homeReducer';

class Header extends React.Component {

    onAddClick() {
        this.props.addClick(true);
    }

    render() {
        return(
            <div className={styles.headerContainer}>
                <label>ToDo List</label>
                <div className={styles.button}>
                    <Button label='ADD' onAddClick={this.onAddClick.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default connect((state) => (
	{
        onAddClick: state.onAddClick
	}),
	{ addClick })(Header);