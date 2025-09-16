import React from 'react';
import styled from 'styled-components';
import fotoPerfil from '../assets/img-perfil.png';
import { UserContext } from './UserContext';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #F0F0F0;
    width: 100%;
    padding: 30px;
    border-radius: var(--standard-border);
    width: 1000px;

    @media (max-width: 1380px) {
        padding: 20px;
        gap: 10px;
        width: 100%;
    }
`

const SectionContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    @media (max-width: 1380px) {
        flex-direction: column;
        gap: 10px
    }
`

const SectionContainerFoto = styled(SectionContainer)`
    flex-wrap: nowrap;
`

const InfosSectionFoto = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const FotoPerfil = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;

    @media (max-width: 1000px) {
        align-self: center;
    }
`

const Information = styled.p`
    padding: 20px;
    background-color:rgb(212, 211, 211);
    border-radius: var(--standard-border);
    text-align: justify;
    min-width: 300px;
`

const TitleSection = styled.h1`
    margin: 10px 0px;
`

const InformationsPerfil = () => {
    const { user, grupoPesquisa, instituicao, organizacao } = React.useContext(UserContext);

    return <Container>
            <SectionContainerFoto>
                <FotoPerfil src={fotoPerfil} />
                <InfosSectionFoto>
                    <h1>{user?.nomeCompleto || 'Nome não disponível'}</h1>
                    {instituicao != null ? <h3>Instituição: {instituicao.nome}</h3> : (organizacao != null ? <h3>Organização: {organizacao.nome}</h3> : null)}
                    <Information style={{ textAlign: 'justify', maxWidth: '1000px' }}>Biografia: lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget justo nec justo ultrices ultricies. Donec eget justo nec justo ultrices ultricies. Donec eget justo nec justo ultrices ultricies. lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget justo nec justo ultrices ultricies. Donec eget justo nec justo ultrices ultricies. Donec eget justo nec justo ultrices ultricies. </Information>
                </InfosSectionFoto>
            </SectionContainerFoto>
            <SectionContainer>
                <Information>Email: {user?.email || 'Email não disponível'}</Information>
                <Information>Telefone: {user?.telefone || 'Telefone não disponível'}</Information>
                <Information>Data Nascimento: {user?.dataNascimento ? new Date(user.dataNascimento).toLocaleDateString() : 'Data de nascimento não disponível'}</Information>
                <Information>Data Registro: {user?.dataRegistro ? new Date(user.dataRegistro).toLocaleDateString() : 'Data de registro não disponível'}</Information>
                <Information>Tipo de Usuário: {user?.role || 'Tipo de usuário não disponível'}</Information>
            </SectionContainer>
            {instituicao != null ? <>
            <TitleSection>Instituição</TitleSection>
            <SectionContainer>
                <Information>Nome: {instituicao?.nome || 'Nome não disponível'}</Information>
                <Information>Sigla: {instituicao?.sigla || 'Sigla não disponível'}</Information>
                <Information>Setor: {instituicao?.setor || 'Setor não disponível'}</Information>
                <Information>Tipo da Instituição: {instituicao?.tipoInstituicao || 'Tipo da instituição não disponível'}</Information>
                <Information>Telefone: {instituicao?.telefone || 'Telefone não disponível'}</Information>
                <Information>Site: {instituicao?.site || 'Site não disponível'}</Information>
            </SectionContainer> </> : <>
            <TitleSection>Sobre Organização</TitleSection>
            <SectionContainer>
                <Information>Nome: {organizacao?.nome || 'Nome não disponível'}</Information>
                <Information>Setor: {organizacao?.setor || 'Setor não disponível'}</Information>
                <Information>Site: {organizacao?.site || 'Site não disponível'}</Information>
                <Information>Telefone: {organizacao?.telefone || 'Telefone não disponível'}</Information>
                <Information>Tipo da Organização: {organizacao?.tipoOrganizacao || 'Tipo da organização não disponível'}</Information>
            </SectionContainer> 
            </>}
        </Container>
}

export default InformationsPerfil;