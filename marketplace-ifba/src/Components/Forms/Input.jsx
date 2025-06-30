import React from 'react';
import styles from './Input.module.css';
import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 1rem;

`

const Label = styled.label`
    display: block;
    font-size: 1rem;
    line-height: 1;
    padding-bottom: 0.5rem;
`

const StyledInput = styled.input`
    border: 1px solid #eee;
    display: block;
    width: 100%;
    font-size: 1rem;
    padding: 0.8rem;
    border-radius: 0.4rem;
    background: #eee;
    transition: 0.2s;
`

const Error = styled.p`
    color: #f31;
    font-size: 0.875rem;
    margin-top: 0.25rem;
`

const Input = ({ label, type, name, value, onChange }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput id={name} name={name} type={type} onChange={onChange} value={value} />
      <Error className={styles.error}>Error</Error>
    </Container>
  );
};

export default Input;
