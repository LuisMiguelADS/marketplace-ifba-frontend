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

const Overview = () => {
    return <Container>
        <h1>Demandas Abertas</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="#4b56d5" />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} CountViews="12"
                HideView="yes" Status="Aguardando Propostas" ColorStatus="#4b56d5" />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} CountViews="12"
                HideView="yes" Status="Aguardando Propostas" ColorStatus="#4b56d5" />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} CountViews="12"
                HideView="yes" Status="Aguardando Propostas" ColorStatus="#4b56d5" />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} CountViews="12"
                HideView="yes" Status="Aguardando Propostas" ColorStatus="#4b56d5" />
        </ContainerCards>
        <h1>Projetos Ativos</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-file-check" Title="Landing Page" Infos={['Instituição: IFBA', 'Início: 10/07/2025', 'Previsão: 10/10/2025']} Status="Em desenvolvimento" ColorStatus="green" />
            <Card IconContainer="pi pi-file-check" Title="Landing Page" Infos={['Instituição: IFBA', 'Início: 10/07/2025', 'Previsão: 10/10/2025']} Status="Em desenvolvimento" ColorStatus="green" />
            <Card IconContainer="pi pi-file-check" Title="Landing Page" Infos={['Instituição: IFBA', 'Início: 10/07/2025', 'Previsão: 10/10/2025']} Status="Em desenvolvimento" ColorStatus="green" />
        </ContainerCards>
        <h1>Dashboard</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-file-check" Title="Projetos Ativos" Statistics="05" />
            <Card IconContainer="pi pi-file-import" Title="Propostas" Statistics="10" />
            <Card IconContainer="pi pi-check" Title="Taxa Sucesso" Statistics="89%" />
            <Card IconContainer="pi pi-sun" Title="Nova ideia?" ButtonNewIdea="yes" />
        </ContainerCards>
    </Container>
}

export default Overview;