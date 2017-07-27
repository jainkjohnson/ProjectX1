import React from 'react'
import Header from '../components/Header/Header'
import ModalForAddToDo from '../components/ModalForAddToDo/ModalForAddToDo'

export default class AppContainer extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <ModalForAddToDo />
            </div>
        );
    }
}