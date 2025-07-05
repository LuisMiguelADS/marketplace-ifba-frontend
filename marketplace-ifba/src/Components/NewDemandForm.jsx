import React from 'react';
import useForm from '../Hooks/useForm';
import Input from './Forms/Input';
import styled from 'styled-components';
import Button from './Forms/Button';
import ButtonClosedModel from './ButtonClosedModel';

const Form = styled.form`
    min-width: 340px;
    max-width: 800px;
    background-color: #00ff2f29;
    padding: 20px;
    border-radius: var(--standard-border);
    box-shadow: 0 0 5px 1px #018d1b40;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`

const SubTitleForm = styled.h2`
    font-size: 1.5rem;
`

const NewDemandForm = ({ editStyle, ButtonClosedModal, onClick }) => {
    const titleDemand = useForm();
    const emailResponsible = useForm('email');
    const budget = useForm();
    const term = useForm();
    const description = useForm();
    const summary = useForm();
    const criteria = useForm();

    return <Form action="" style={editStyle} >
        {ButtonClosedModal === "yes" && (<ButtonClosedModel onClick={onClick} className="pi pi-times" />)}
        <SubTitleForm>Informações Básicas</SubTitleForm>
        <Input label="Título" type="text" name="titleDemand" {...titleDemand} placeholder="Ex. Automatizar Processo" />
        <Input label="E-mail do responsável" type="text" name="email" {...emailResponsible} placeholder="Ex. responsavel@gmail.com" />
        <Input label="Orçamento disponível" type="number" name="budget" {...budget} placeholder="Ex. 4.000,00" step="0.01" />
        <SubTitleForm>Cronograma</SubTitleForm>
        <Input label="Prazo desejado" type="date" name="term" {...term} />
        <SubTitleForm>Detalhes</SubTitleForm>
        <Input label="Descrição" type="textarea" name="description" {...description} placeholder="Escreva..." />
        <Input label="Resumo" type="textarea" name="summary" {...summary} placeholder="Escreva..." />
        <Input label="Critérios" type="textarea" name="criteria" {...criteria} placeholder="Escreva..." />
        <Button>Criar Demanda</Button>
    </Form>
}

export default NewDemandForm;