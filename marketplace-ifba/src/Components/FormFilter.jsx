import React from 'react';
import styled from 'styled-components';
import Button from './Forms/Button';

const Form = styled.form`
    background-color: #9EFFB0;
    display: flex;
    flex-direction: column;
    border-radius: var(--standard-border);
    padding: 30px;
    gap: 30px;
    width: fit-content;
`

const ContainerFields = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
`
const FormFilter = ({ Title, children, LabelButton }) => {
    return <Form>
        <h2>{Title}</h2>
        <ContainerFields>
            {children}
        </ContainerFields>
        <Button editStyle={{ alignSelf: 'flex-start' }}>{LabelButton}</Button>
    </Form>
}

export default FormFilter;