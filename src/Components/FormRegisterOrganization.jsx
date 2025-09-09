import React from 'react';
import useForm from '../Hooks/useForm';
import Input from './Forms/Input';
import styled from 'styled-components';
import ButtonClosedModel from './ButtonClosedModel';
import Button from './Forms/Button';
import { REGISTER_ORGANIZATION_POST } from '../api/organizacao';
import { UserContext } from './UserContext';
import useFetch from '../Hooks/useFetch';


const Form = styled.form`
    min-width: 340px;
    width: 1000px;
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

const FormRegisterOrganization = ({ editStyle, ButtonClosedModal, onClick, ...props }) => {
    const nome = useForm();
    const sigla = useForm();
    const cnpj = useForm();
    const tipoOrganizacao = useForm();
    const setor = useForm();
    const telefone = useForm();
    const site = useForm();
    const descricao = useForm();
    // eslint-disable-next-line no-unused-vars
    const { request, data, error, setData, setError, setLoading, loading } = useFetch();
    const { setOrganizacao, user } = React.useContext(UserContext);

    async function handleSubmit(event) {
        event.preventDefault();
        organizationRegister(
            nome.value,
            sigla.value,
            cnpj.value,
            tipoOrganizacao.value,
            setor.value,
            telefone.value,
            site.value,
            descricao.value,
            user.idUsuario
        );
    }

    async function organizationRegister(nome, sigla, cnpj, tipoOrganizacao, setor, telefone, site, descricao, idUsuarioRegistrador) {
        const token = window.localStorage.getItem('token_autenticacao');
        const { url, options } = REGISTER_ORGANIZATION_POST(
            {
                nome: nome,
                sigla: sigla,
                cnpj: cnpj,
                tipoOrganizacao: tipoOrganizacao,
                setor: setor,
                telefone: telefone,
                site: site,
                descricao: descricao,
                idUsuarioRegistrador: idUsuarioRegistrador
            },
            token);
        const { response, json } = await request(url, options);
        if (response.ok) {
            setOrganizacao(json)
            console.log('[JOINREGISTERORGANIZACAO]: Registro da organização realizado com sucesso');
        } else {
            console.log('[JOINREGISTERORGANIZACAO]: Falha no registro da organização');
        }
    }

    return <Form action="" style={editStyle} modal={props.modal}>
        {ButtonClosedModal === "yes" && (<ButtonClosedModel onClick={onClick} className="pi pi-times" />)}
        <h1>Cadastrar Organização</h1>
        <Input label="Nome" type="text" name="nome" {...nome} placeholder="Nome da empresa" />
        <Input label="Sigla" type="text" name="sigla" {...sigla} placeholder="Sigla da empresa" />
        <Input label="Cnpj" type="text" name="cnpj" {...cnpj} placeholder="Ex. 00.000.000/0001-00" />
        <Input label="Tipo da Organização" type="text" name="tipoOrganizacao" {...tipoOrganizacao} placeholder="Ex. Privada" />
        <Input label="Setor" type="text" name="setor" {...setor} placeholder="Ex. Comércio" />
        <Input label="Telefone" type="phone" name="telefone" {...telefone} placeholder="Ex. (11) 91111-1111" />
        <Input label="Site" type="text" name="site" {...site} placeholder="Ex. www.empresa.com.br" />
        <Input label="Descrição" type="textarea" name="descricao" {...descricao} placeholder="Sobre a organização" />
        <Button onClick={handleSubmit}>Cadastrar</Button>
    </Form>
}

export default FormRegisterOrganization;