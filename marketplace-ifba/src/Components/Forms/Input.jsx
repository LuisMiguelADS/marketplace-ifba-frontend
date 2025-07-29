import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
`

const Label = styled.label`
    display: block;
    font-size: 1.3rem;
`

const StyledInput = styled.input`
    border: 1px solid #ccc;
    width: 100%;
    min-height: 50px;
    font-size: 1.1rem;
    padding: 0px 10px;
    border-radius: var(--standard-border);
    background-color: #eee;
    transition: 0.2s;

    &:focus, &:hover {
      outline: none;
      background-color: white;
      box-shadow: 0 0 5px 1px #018D1A;
    }
`

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #eee;
    border-radius: var(--standard-border);
    font-size: 1.1rem;
    width: 100%;
    min-height: 80px;
    resize: none;
    transition: 0.2s;
    margin-top: 5px;

    &:focus, &:hover {
      outline: none;
      background-color: white;
      box-shadow: 0 0 5px 1px #018D1A;
    }
`

const InputFile = styled.input`
    width: 100%;
    font-size: 1.1rem;
    border-radius: var(--standard-border);
    transition: 0.2s;

    &:focus, &:hover {
      outline: none;
      background-color: white;
      box-shadow: 0 0 5px 1px #018D1A;
    }
`

const Error = styled.p`
    color: #f31;
    font-size: 0.875rem;
    margin-top: 0.25rem;
`

const Input = ({ label, type, name, value, onChange, error, onBlur, placeholder, editStyle, definitionMaxWidth }) => {
  let inputElement;

  switch (type) {
    case 'textarea':
      inputElement = (
        <Textarea
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
          style={editStyle}
        />);
      break;
    case 'file':
      inputElement = (
        <InputFile
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
          style={editStyle}
        />);
      break;
    default:
      inputElement = (
        <StyledInput
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
          style={editStyle}
        />
      );
  };
  return (
    <Container style={{
      width: definitionMaxWidth,
      ...(type === 'textarea' && name !== 'message' ? { height: '110px' } : {}),
      ...(type === 'textarea' && name === 'biograph' ? { height: '200px' } : {}),
      ...(type === 'file' ? { height: '60px' } : {})
    }}>
      {label && <Label htmlFor={name}>{label}</Label>}
      {inputElement}
      {error && <Error>{error}</Error>}
    </Container >
  );
}

export default Input;
