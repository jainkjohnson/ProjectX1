import React from 'react';
import { connect } from 'react-redux';
import styles from './ModalForAddToDo.scss';
import TextInput from '../TextInput/TextInput';
import { addClick } from '../../redux/reducer/homeReducer';

class ModalForAddToDo extends React.Component {

    close() {
        this.props.addClick(true);
    }

    render() {
        console.log('this.props.onAddClick', this.props.onAddClick);
        return(
            <div>
            {
                this.props.onAddClick 
                ?
                <div className={styles.root} onClick={this.close.bind(this)}>
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

export default connect((state) => (
	{
        onAddClick: state.onAddClick
	}),
	{ addClick })(ModalForAddToDo);