import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.scss';
import Button from '../Button/Button';
import { addClick } from '../../redux/reducer/homeReducer';

const { func } = PropTypes;

@connect(
  (state) => ({
    onAddClick: state.onAddClick
  }), {
    addClick
  },
)

export default class Header extends React.Component {

  static propTypes = {
    addClick: func
  }

  onAddClick = () => {
    this.props.addClick(true);
  };
  render() {
    return (
      <div className={styles.headerContainer}>
          <label>ToDo List</label>
          <div className={styles.button}>
            <Button label="ADD" onAddClick={this.onAddClick} />
          </div>
      </div>
    );
  }
}
