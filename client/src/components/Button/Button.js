import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => (
  <button onClick={props.onAddClick}>{props.label}</button>
);

const { string, func } = PropTypes;

Button.propTypes = {
  label: string,
  onAddClick: func,
};

export default Button;
