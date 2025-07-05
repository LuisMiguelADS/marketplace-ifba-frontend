import React from 'react';
import styled from 'styled-components';

const ButtonClosed = styled.button`
    background-color: red;
    color: white;
    border: none;
    border-radius: var(--standard-border);
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover, &:focus {
      background: red;
      box-shadow: 0 0 0 1px #e60000b8, 0 0 0 2px #ff0000;
    }
`

const ButtonClosedModel = ({ onClick }) => {
  return <ButtonClosed onClick={onClick} className="pi pi-times" />
}

export default ButtonClosedModel;