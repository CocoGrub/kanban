import React from 'react';
import './Button.scss';

const Button = ({ children,addCard,text }) => {
  return <div onClick={()=>addCard(text)} className="button">{children}</div>;
};



export default Button;
