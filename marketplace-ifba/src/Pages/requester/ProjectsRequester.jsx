import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from '../../Components/ContainerMainContent';
import Card from '../../Components/Card';
import ListInformations from '../../Components/ListInformations';
import Button from '../../Components/Forms/Button';
import Delivery from '../../Components/Delivery';
import Modal from '../../Components/Modal';
import NewDeliveryForm from '../../Components/NewDeliveryForm';

const ContainerCards = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
`

const ContainerButtons = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
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
        subTitle: 'Organização',
        description: 'Empresa FIC'
    }]
};

const aboutProject = {
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
    }]
};

const timeline = {
    title: 'Cronograma',
    infos: [{
        subTitle: 'Iniciado',
        description: '20/12/2025'
    }, {
        subTitle: 'Prazo',
        description: '20/12/2025'
    }, {
        subTitle: 'Finalizado',
        description: '20/12/2025'
    }]
};

const state = {
    title: 'Estado',
    infos: [{
        subTitle: 'Status',
        description: 'Em desenvolvimento'
    }, {
        subTitle: 'Entregas',
        description: '07'
    }]
};

const ProjectsRequester = () => {
    const [viewDetails, setViewDetails] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [modalNewDelivery, setModalNewDelivery] = React.useState(false);

    function handleClickModal(event) {
        event.preventDefault();
        setModal(!modal);
    }

    function handleClickModalNewDelivery(event) {
        event.preventDefault();
        setModalNewDelivery(!modalNewDelivery);
    }

    function handleClickViewDetails(event) {
        event.preventDefault();
        setViewDetails(!viewDetails);
    }

    return (
        <ContainerMainContent>
            <h1>Projetos</h1>
            <ContainerCards>
                <Card IconContainer="pi pi-file-check" Title="Landing Page" Infos={['Instituição: IFBA', 'Início: 10/07/2025', 'Previsão: 10/10/2025']} Status="Em desenvolvimento" ColorStatus="green" HideView="no" onClick={handleClickViewDetails} />
                <Card IconContainer="pi pi-file-check" Title="Landing Page" Infos={['Instituição: IFBA', 'Início: 10/07/2025', 'Previsão: 10/10/2025']} Status="Em desenvolvimento" ColorStatus="green" HideView="no" onClick={handleClickViewDetails} />
                <Card IconContainer="pi pi-file-check" Title="Landing Page" Infos={['Instituição: IFBA', 'Início: 10/07/2025', 'Previsão: 10/10/2025']} Status="Em desenvolvimento" ColorStatus="green" HideView="no" onClick={handleClickViewDetails} />
            </ContainerCards>
            {(viewDetails) && <>
                <ListInformations Title="Landing Page" Informations={[informationsGeneral, aboutProject, timeline, state]} />
            </>}
            {(viewDetails) && <>
                <h1>Entregas</h1>
                <ContainerCards>
                    <Card IconContainer="pi pi-file-plus" Title="HTML" Infos={['Criado: Web Soluções', 'Prazo: 10/07/2025', 'Entrega: 10/10/2025']} Status="Em desenvolvimento" ColorStatus="green" HideView="no" onClick={handleClickModal} />
                    <Card IconContainer="pi pi-file-plus" Title="HTML" Infos={['Criado: Web Soluções', 'Prazo: 10/07/2025', 'Entrega: 10/10/2025']} Status="Em desenvolvimento" ColorStatus="green" HideView="no" onClick={handleClickModal} />
                    <Card IconContainer="pi pi-file-plus" Title="HTML" Infos={['Criado: Web Soluções', 'Prazo: 10/07/2025', 'Entrega: 10/10/2025']} Status="Em desenvolvimento" ColorStatus="green" HideView="no" onClick={handleClickModal} />
                </ContainerCards>
                <ContainerButtons>
                    <Button onClick={handleClickModalNewDelivery} editStyle={{ alignSelf: 'flex-start' }}>Nova Entrega</Button>
                </ContainerButtons>
            </>}
            <Modal SetModal={setModal} View={modal} ButtonEdit ButtonRecused ButtonConfirm>
                <Delivery Title='HTML' Informations={[
                    {
                        title: 'Sobre a Entrega',
                        infos: [{
                            subTitle: 'Solicitante',
                            description: 'Empresa FIC'
                        }, {
                            subTitle: 'Solicitado',
                            description: 'Web Soluções'
                        }, {
                            subTitle: 'Criada',
                            description: '20/12/2025'
                        }, {
                            subTitle: 'Prazo',
                            description: '20/12/2025'
                        }, {
                            subTitle: 'Finalizada',
                            description: '20/12/2025'
                        }, {
                            subTitle: 'Descrição',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nam et sapien nec magna ultriciesTincidunt. Suspendisse potenti. In hac habitasse platea dictumst.'
                        }]
                    }
                ]}>

                </Delivery>
            </Modal>
            <Modal SetModal={setModalNewDelivery} View={modalNewDelivery}>
                <NewDeliveryForm />
            </Modal>
        </ContainerMainContent>
    )
}

export default ProjectsRequester;