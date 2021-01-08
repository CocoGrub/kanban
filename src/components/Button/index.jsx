import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
const Button = ({ children,addCard,text }) => {
  return <div onClick={()=>addCard(text)} className="button">{children}</div>;
};

// Button.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default Button;
