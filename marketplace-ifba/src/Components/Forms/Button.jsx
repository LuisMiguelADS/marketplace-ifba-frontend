import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    border-radius: var(--standard-border);
    background: #257e34;
    color: white;
    min-width: 200px;
    min-height: 50px;
    padding: 0.8rem 1.2rem;
    box-sizing: border-box;
    transition: 0.1s;
    align-self: flex-end;

    &:hover, &:focus {
      outline: none;
      background: #018e1b;
      box-shadow: 0 0 0 1px #018e1b, 0 0 0 2px #025911;
    }

    &:disabled {
      opacity: 0.5;
      cursor: wait;
    }
`

const StyledButtonRecused = styled(StyledButton)`
    background: #e03030fd;
    color: white;

    &:hover, &:focus {
      background: #ff0000;
      box-shadow: 0 0 0 1px #ff0000dc, 0 0 0 2px #e60000;
    }
`

const StyledButtonEdited = styled(StyledButton)`
    background:rgba(255, 255, 0, 0.69);
    color: black;

    &:hover, &:focus {
      background:rgb(236, 236, 0);
      box-shadow: 0 0 0 2px #ffff00d4, 0 0 0 2px rgb(131, 131, 1);
    }
`

const Button = ({ children, Recused, Edited, editStyle, onClick, ...props }) => {
  if (Recused) {
    return (
      <StyledButtonRecused {...props} style={editStyle} onClick={onClick}>
        {children}
      </StyledButtonRecused>
    );
  } else if (Edited) {
    return (
      <StyledButtonEdited {...props} style={editStyle} onClick={onClick}>
        {children}
      </StyledButtonEdited>
    );
  } else {
    return (
      <StyledButton {...props} style={editStyle} onClick={onClick}>
        {children}
      </StyledButton>
    );
  }
};

export default Button;
