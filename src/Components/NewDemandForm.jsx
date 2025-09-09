import React from 'react';
import useForm from '../Hooks/useForm';
import Input from './Forms/Input';
import styled from 'styled-components';
import Button from './Forms/Button';
import { REGISTER_DEMAND_POST } from '../api/demanda';
import ButtonClosedModel from './ButtonClosedModel';
import { UserContext } from './UserContext';
import useFetch from '../Hooks/useFetch';

const Form = styled.form`
    min-width: 340px;
    max-width: 1000px;
    background-color: #D6FFDE;
    padding: 20px;
    border-radius: var(--standard-border);
    box-shadow: 0 0 5px 1px #018d1b40;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;

    ${props => props.modal && `
        height: fit-content;
        overflow-y: auto;
        overflow-x: hidden;

        @media (min-width: 1041px) {
            &::-webkit-scrollbar {
                width: 20px;
                background-color: #01420c;
            }

            &::-webkit-scrollbar-thumb {
                height: 60px;
                background-color: #018e1b;
                border-radius: 5px;
                border: 2px solid #00420C;
            }
        }

        @media (max-width: 1040px) {
            overflow-y: visible;
            max-width: calc(100vw - 60px);
        }
    `}
`

const SubTitleForm = styled.h2`
    font-size: 1.5rem;
`

const NewDemandForm = ({ editStyle, ButtonClosedModal, onClick, onDemandCreated, ...props }) => {
    const titleDemand = useForm();
    const emailResponsible = useForm('email');
    const budget = useForm();
    const term = useForm();
    const description = useForm();
    const summary = useForm();
    const criteria = useForm();
    const { organizacao, user } = React.useContext(UserContext);
    // eslint-disable-next-line no-unused-vars
    const { request, data, error, setData, setError, setLoading, loading } = useFetch();

    async function handleSubmit(event) {
        event.preventDefault();
        organizationRegister(
            titleDemand.value,
            emailResponsible.value,
            budget.value,
            description.value,
            summary.value,
            criteria.value,
            term.value,
        );
        onClick();
    }

    async function organizationRegister(nome, emailResponsavel, orcamento, descricao, resumo, criterio, dataPrazoFinal) {
        const token = window.localStorage.getItem('token_autenticacao');
        const { url, options } = REGISTER_DEMAND_POST(
            {
                nome: nome,
                emailResponsavel: emailResponsavel,
                orcamento: orcamento,
                descricao: descricao,
                resumo: resumo,
                criterio: criterio,
                dataPrazoFinal: dataPrazoFinal,
                idUsuarioRegistrador: user.idUsuario,
                idOrganizacao: organizacao.idOrganizacao
            },
            token);
        const { response, json } = await request(url, options);
        if (response.ok) {
            console.log('[JOINREGISTERORGANIZACAO]: Registro da organização realizado com sucesso');
            alert('Demanda criada com sucesso!');
            
            if (onDemandCreated && json) {
                onDemandCreated(json);
            }
        } else {
            console.log('[JOINREGISTERORGANIZACAO]: Falha no registro da organização');
            alert('Erro ao criar demanda. Tente novamente.');
        }
    }

    return <Form action="" style={editStyle} modal={props.modal}>
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
        <Button onClick={handleSubmit}>Criar Demanda</Button>
    </Form>
}

export default NewDemandForm;