import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 80px;
    justify-content: space-between;
`

const StyledSelect = styled.select`
    height: 50px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-color: #eee;
    font-size: 1.1rem;
    padding: 0px 10px;
    border-radius: var(--standard-border);
    transition: 0.2s;

    &:focus, &:hover {
      outline: none;
      background-color: white;
      box-shadow: 0 0 5px 1px #018D1A;
    }
`

const Label = styled.label`
    display: block;
    font-size: 1.3rem;
`

const Select = ({ options, label, name, onChange, optionTitle, value, definitionMaxWidth }) => {
    return <Container style={{ width: definitionMaxWidth }}>
        {label && <Label htmlFor={name}>{label}</Label>}
        <StyledSelect value={value} name={name} id={name} onChange={onChange}>
            <option value='' disabled>{optionTitle}</option>
            {options.map((op) => (
                <option key={op.value} value={op.value}>
                    {op.label}
                </option>
            ))}
        </StyledSelect>
    </Container>
}

export default Select;