import React from 'react';
import Card from './Card';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 8;
    margin: 100px 0px 0px 300px;
    padding: 30px;
`

const ContainerCards = styled.div`
    width: 100%;
    margin: 30px 0px 20px 0px;
    display: flex;
    gap: 30px;
`

const Demands = () => {
    return <Container>
        <h1>Demandas Abertas</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="#4b56d5" />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="#4b56d5" />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="#4b56d5" />
        </ContainerCards>
    </Container>
}

export default Demands;