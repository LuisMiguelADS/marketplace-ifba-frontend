import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    grid-template-columns: 1fr 1fr;
    width: 180px;
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
   font-family: "Inter", sans-serif;
`

const OrgOrEnterprise = styled.p`

    
`

const InfoPerfil = (props) => {
    return <Container>
        <FotoPerfil src={props.FotoPerfil} />
        <ContainerInfos>
            <NameUserLogged>{props.NameUserLogged}</NameUserLogged>
            <OrgOrEnterprise>{props.OrgOrEnterprise}</OrgOrEnterprise>
        </ContainerInfos>
    </Container>
}

export default InfoPerfil;