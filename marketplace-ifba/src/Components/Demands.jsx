import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import NewDemandForm from './NewDemandForm';
import ContainerMainContent from './ContainerMainContent';
import ListInformations from './ListInformations';
import Modal from './Modal';

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

const Demands = () => {
    const [modal, setModal] = React.useState(false);

    function handleClickModal(event) {
        event.preventDefault();
        setModal(!modal);
    }

    return <ContainerMainContent>
        <h1>Demandas</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="#4b56d5" onClick={handleClickModal} />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="#4b56d5" onClick={handleClickModal} />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="#4b56d5" onClick={handleClickModal} />
        </ContainerCards>
        <h1>Nova Demanda</h1>
        <NewDemandForm />
        <Modal SetModal={setModal} View={modal} ButtonEdit ButtonRecused>
            <ListInformations Title="Web Soluções" Informations={[informationsGeneral, aboutProposal, restrictions, requiredResources]} buttonClosedModal="yes" onClick={handleClickModal} editStyle={{ maxHeight: '700px' }} Modal />
        </Modal>
    </ContainerMainContent>
}

export default Demands;