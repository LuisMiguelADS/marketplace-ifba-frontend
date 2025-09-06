import React from 'react';
import useForm from '../Hooks/useForm';
import Input from './Forms/Input';
import styled from 'styled-components';
import ButtonClosedModel from './ButtonClosedModel';
import Button from './Forms/Button';
import { REGISTER_GROUP_REQUESTER_POST } from '../api/grupoPesquisa';
import { UserContext } from './UserContext';
import useFetch from '../Hooks/useFetch';


const Form = styled.form`
    min-width: 340px;
    max-width: 1000px;
    background-color: #E3F4E3;
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
    `}
`

const FormRegisterGroupResearch = ({ editStyle, ButtonClosedModal, onClick, ...props }) => {
    const nome = useForm();
    const descricao = useForm();
    const { request } = useFetch();
    const { user, setGrupoPesquisa, instituicao } = React.useContext(UserContext);

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (!instituicao || !user.idInstituicao) {
            alert('Você precisa estar vinculado a uma instituição para cadastrar um grupo de pesquisa.');
            return;
        }
        
        groupResearchRegister(
            nome.value,
            descricao.value,
            user.idUsuario,
            user.idInstituicao
        );
    }

    async function groupResearchRegister(nome, descricao, idUsuarioRegistrador, idInstituicao) {
        const token = window.localStorage.getItem('token_autenticacao');
        const { url, options } = REGISTER_GROUP_REQUESTER_POST(
            {
                nome: nome,
                descricao: descricao,
                idInstituicao: idInstituicao,
                usuarioRegistrador: idUsuarioRegistrador,
            },
            token);
        const { response, json } = await request(url, options);
        if (response.ok) {
            setGrupoPesquisa(json)
            console.log('[FORMREGISTERGROUPRESEARCH]: Registro do grupo pesquisa realizado com sucesso');
        } else {
            console.log('[FORMREGISTERGROUPRESEARCH]: Falha no registro do grupo pesquisa');
        }
    }

    return <Form action="" style={editStyle} modal={props.modal}>
        {ButtonClosedModal === "yes" && (<ButtonClosedModel onClick={onClick} className="pi pi-times" />)}
        <h1>Cadastrar Grupo de Pesquisa</h1>
        <Input label="Nome" type="text" name="nome" {...nome} placeholder="Nome do grupo de pesquisa" />
        <Input label="Descrição" type="textarea" name="descricao" {...descricao} placeholder="Descreva o grupo de pesquisa" />
        <Button onClick={handleSubmit}>Cadastrar</Button>
    </Form>
}

export default FormRegisterGroupResearch