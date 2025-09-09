import React from 'react';
import useForm from '../Hooks/useForm';
import Input from './Forms/Input';
import Button from './Forms/Button';
import { REGISTER_GROUP_REQUESTER_POST } from '../api/grupoPesquisa';
import { UserContext } from './UserContext';
import useFetch from '../Hooks/useFetch';
import DefaultForm from './DefaultForm';

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

    return (
        <DefaultForm 
            editStyle={editStyle} 
            ButtonClosedModal={ButtonClosedModal} 
            onClick={onClick} 
            modal={props.modal}
        >
            <h1>Cadastrar Grupo de Pesquisa</h1>
            <Input label="Nome" type="text" name="nome" {...nome} placeholder="Nome do grupo de pesquisa" />
            <Input label="Descrição" type="textarea" name="descricao" {...descricao} placeholder="Descreva o grupo de pesquisa" />
            <Button onClick={handleSubmit}>Cadastrar</Button>
        </DefaultForm>
    );
}

export default FormRegisterGroupResearch