import React from 'react'
import styled from 'styled-components';
import { UserContext } from '../UserContext';

const Container = styled.div`
    display: flex;
    grid-template-columns: 1fr 1fr;
    width: 220px;
    max-height: 60px;
    align-self: flex-end;
    align-items: center;
    margin-right: 30px;
    justify-content: space-between;
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
    color: white;
`

const NameUserLogged = styled.p`
   font-weight: bold;
   font-size: 1.1rem;
`

const OrgOrEnterprise = styled.p`
    
`

const IconLogOut = styled.span`
    color: white;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover {
        scale: 1.2;
    }
`

const InfoPerfil = (props) => {
    const { userLogout } = React.useContext(UserContext);

    return <Container>
        <FotoPerfil src={props.FotoPerfil} />
        <ContainerInfos>
            <NameUserLogged>{props.NameUserLogged}</NameUserLogged>
            <OrgOrEnterprise>{props.OrgOrEnterprise}</OrgOrEnterprise>
        </ContainerInfos>
        <IconLogOut className='pi pi-sign-out' onClick={userLogout} />
    </Container>
}

export default InfoPerfil;