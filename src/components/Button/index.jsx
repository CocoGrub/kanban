import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';
const Button = ({ text }) => {
  return <div className="button">{text}</div>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
