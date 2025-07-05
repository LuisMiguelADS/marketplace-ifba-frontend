import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from './ContainerMainContent';
import ListInformations from './ListInformations';
import Modal from './Modal';
import Card from './Card';

const ContainerCards = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
`
const informationsGeneral = {
    title: 'Informações Gerais',
    infos: [{
        subTitle: 'Grupo Pesquisa',
        description: 'Web Soluções'
    }, {
        subTitle: 'Instituição',
        description: 'IFBA - Instituto Federal da Bahia'
    }, {
        subTitle: 'Solução',
        description: 'Software + Manutenção + Suporte'
    }]
};

const aboutProposal = {
    title: 'Sobre a Proposta',
    infos: [{
        subTitle: 'Descrição',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna et lectus tristique auctor. Nam eleifend, velit eu imperdiet sollicitudin, sem magna vulputate magna, ut commodo nulla magna eget enim. Sed vel nunc eu neque elementum imperdiet. Proin et dolor eu elit ullamcorper tempus. Donec ut ornare arcu, at maximus eros. Nam sed varius nisi. Maecenas non felis non est venenatis venenatis. Praesent sed neque ut ligula pulvinar efficitur. Integer vitae erat quis massa vestibulum posuere.'
    }, {
        subTitle: 'Resumo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nam et sapien nec magna ultriciesTincidunt. Suspendisse potenti. In hac habitasse platea dictumst.'
    }, {
        subTitle: 'Orçamento',
        description: 'R$ 3.000,00'
    },
    {
        subTitle: 'Prazo',
        description: '90 dias'
    }]
};

const restrictions = {
    title: 'Restrições',
    infos: [{
        subTitle: 'Calendário Academico',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }, {
        subTitle: 'Manutenção Contínua',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }]
};

const requiredResources = {
    title: 'Recursos Necessários',
    infos: [{
        subTitle: 'Infraestrutura',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }, {
        subTitle: 'Conteúdos e Dados',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }]
};

const Overview = () => {
    const [modal, setModal] = React.useState(false);

    function handleClickModal(event) {
        event.preventDefault();
        setModal(!modal);
    }

    return <ContainerMainContent>
        <h1>Demandas Abertas</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Pendente" ColorStatus="#4b56d5" onClick={handleClickModal} />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} CountViews="12"
                HideView="yes" Status="Aguardando Propostas" ColorStatus="#4b56d5" onClick={handleClickModal} />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} CountViews="12"
                HideView="yes" Status="Aguardando Propostas" ColorStatus="#4b56d5" onClick={handleClickModal} />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} CountViews="12"
                HideView="yes" Status="Aguardando Propostas" ColorStatus="#4b56d5" onClick={handleClickModal} />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} CountViews="12"
                HideView="yes" Status="Aguardando Propostas" ColorStatus="#4b56d5" onClick={handleClickModal} />
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
        <Modal SetModal={setModal} View={modal}>
            <ListInformations Title="Web Soluções" Informations={[informationsGeneral, aboutProposal, restrictions, requiredResources]} editStyle={{ maxHeight: '700px' }} Modal />
        </Modal>
    </ContainerMainContent>
}

export default Overview;