import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ModalForAddToDo.scss';
import TextInput from '../TextInput/TextInput';
import { addClick } from '../../redux/reducer/homeReducer';

const { func, bool } = PropTypes;

@connect(
  (state) => ({
    onAddClick: state.onAddClick
  }),
  {
    addClick
  },
)

export default class ModalForAddToDo extends React.Component {

  static propTypes = {
    addClick: func,
    onAddClick: bool
  };

  closeModal = (event) => {
    event.stopPropagation();
    this.props.addClick(false);
  }

  render() {
    return (
      <div>
      {
        this.props.onAddClick
        ?
        <div className={styles.root} onClick={this.closeModal}>
          <div className={styles.modalContent}>
            <TextInput />
          </div>
        </div>
        :
        null
      }
      </div>
    );
  }
}
