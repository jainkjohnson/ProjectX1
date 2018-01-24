import React from 'react';
import Header from '../components/Header/Header';
import ModalForAddToDo from '../components/ModalForAddToDo/ModalForAddToDo';

const AppContainer = () => (
  <div>
    <Header />
    <ModalForAddToDo />
    <i className="fa fa-address-book" />
  </div>
);

export default AppContainer;
