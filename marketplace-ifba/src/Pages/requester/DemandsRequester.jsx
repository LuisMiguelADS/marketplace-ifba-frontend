import React from 'react';
import styled from 'styled-components';
import Card from '../../Components/Card';
import NewDemandForm from '../../Components/NewDemandForm';
import ContainerMainContent from '../../Components/ContainerMainContent';
import ListInformations from '../../Components/ListInformations';
import Modal from '../../Components/Modal';
import Button from '../../Components/Forms/Button';

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

const DemandsRequester = () => {
    const [modalOnDemand, setModalOnDemand] = React.useState(false);
    const [modalFormNewDemand, setModalFormNewDemand] = React.useState(false);

    function handleClickModal(event) {
        event.preventDefault();
        setModalOnDemand(!modalOnDemand);
    }

    function handleClickFormModal(event) {
        event.preventDefault();
        setModalFormNewDemand(!modalFormNewDemand);
    }

    return <ContainerMainContent>
        <h1>Demandas</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="orange" onClick={handleClickModal} />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="orange" onClick={handleClickModal} />
            <Card IconContainer="pi pi-send" Title="Landing Page" Infos={['Aguardando aprovação', 'Cadastro: 20/12/2025']} HideView="no" CountViews="10" Status="Aguardando Propostas" ColorStatus="orange" onClick={handleClickModal} />
        </ContainerCards>
        <h1>Nova Demanda</h1>
        <Button editStyle={{ alignSelf: 'flex-start' }} onClick={handleClickFormModal}>Criar Demanda</Button>
        <Modal SetModal={setModalFormNewDemand} View={modalFormNewDemand} ButtonCreate>
            <NewDemandForm editStyle={{ overflowY: 'scroll', width: '1000px', maxHeight: '700px' }} modal />
        </Modal>
        <Modal SetModal={setModalOnDemand} View={modalOnDemand} ButtonEdit ButtonRecused>
            <ListInformations
                Title="Web Soluções"
                Informations={[informationsGeneral, aboutProposal, restrictions, requiredResources]}
                buttonClosedModal="yes"
                onClick={handleClickModal}
                editStyle={{ maxHeight: '700px' }}
                modal />
        </Modal>
    </ContainerMainContent>
}

export default DemandsRequester;