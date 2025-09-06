import React from 'react'
import styled from 'styled-components';
import { UserContext } from '../UserContext';

const Container = styled.div`
    display: flex;
    grid-template-columns: 1fr 1fr;
    max-height: 60px;
    gap: 20px;
    align-self: flex-end;
    align-items: center;
    margin-right: 30px;
    justify-content: space-between;
    color: black;
`

const FotoPerfil = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
`

const ContainerInfos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const NameUserLogged = styled.p`
   font-weight: bold;
   font-size: 1.1rem;
`

const OrgOrEnterprise = styled.p`
    
`

const IconLogOut = styled.span`
    font-size: 1.5rem;
    cursor: pointer;

    &:hover {
        scale: 1.2;
    }
`

const InfoPerfil = (props) => {
    const { userLogout, user, organizacao, instituicao } = React.useContext(UserContext);
    let vinculo = '';

    if (organizacao != null) {
        vinculo = organizacao.nome;
    } else if (instituicao != null) {
        vinculo = instituicao.sigla;
    }

    return <Container>
        <FotoPerfil src={props.FotoPerfil} />
        <ContainerInfos>
            <NameUserLogged>{user.nomeCompleto}</NameUserLogged>
            <OrgOrEnterprise>{vinculo ? vinculo : "Sem vinculo"}</OrgOrEnterprise>
            <OrgOrEnterprise>{user.role}</OrgOrEnterprise>
        </ContainerInfos>
        <IconLogOut className='pi pi-sign-out' onClick={userLogout} />
    </Container>
}

export default InfoPerfil;