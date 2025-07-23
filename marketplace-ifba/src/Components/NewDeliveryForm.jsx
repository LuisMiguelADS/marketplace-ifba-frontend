import React from 'react';
import useForm from '../Hooks/useForm';
import Input from './Forms/Input';
import styled from 'styled-components';
import Button from './Forms/Button';
import ButtonClosedModel from './ButtonClosedModel';

const Form = styled.form`
    min-width: 340px;
    max-width: 1000px;
    background-color: #00ff2f29;
    padding: 20px;
    border-radius: var(--standard-border);
    box-shadow: 0 0 5px 1px #018d1b40;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    margin-top: 20px;
`

const SubTitleForm = styled.h2`
    font-size: 1.5rem;
`

const Container = styled.div`
    width: 1000px;
    background-color: #D6FFDE;
    padding: 30px;
    border-radius: var(--standard-border);
`

const NewDeliveryForm = ({ editStyle }) => {
    const titleDemand = useForm();
    const term = useForm();
    const description = useForm();

    return <Container>
        <h1>Nova Demanda</h1>
        <Form action="" style={editStyle}>
            <SubTitleForm>Informações Básicas</SubTitleForm>
            <Input label="Título" type="text" name="titleDemand" {...titleDemand} placeholder="Ex. Automatizar Processo" />
            <Input label="Descrição" type="textarea" name="description" {...description} placeholder="Escreva..." />
            <SubTitleForm>Cronograma</SubTitleForm>
            <Input label="Prazo desejado" type="date" name="term" {...term} />
            <Button>Criar Demanda</Button>
        </Form>
    </Container>
}

export default NewDeliveryForm;