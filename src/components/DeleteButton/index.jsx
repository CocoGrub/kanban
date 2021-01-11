import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #807b7b;
  color: #565454;
  margin: 0 1em;
  padding: 0.25em 1em;

`
const DeleteBtn = ({ children,onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};


export default DeleteBtn;
