import React from 'react';
import styled from 'styled-components';
import Select from '../../Components/Forms/Select';
import useForm from '../../Hooks/useForm';
import Input from '../../Components/Forms/Input';
import Card from '../../Components/Card';
import ListInformations from '../../Components/ListInformations';
import ContainerMainContent from '../../Components/ContainerMainContent';
import FormFilter from '../../Components/FormFilter';
import Modal from '../../Components/Modal';

const ContainerCards = styled.div`
    width: 100%;
    margin: 30px 0px 20px 0px;
    display: flex;
    gap: 30px;
`

const ContainerButtons = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 30px;
`

const ProposalsRequester = () => {
    const searchDemand = useForm();
    const areaSelect = useForm();
    const budgetSelect = useForm();
    const termSelect = useForm();
    const [modal, setModal] = React.useState();

    function handleClickModal(event) {
        event.preventDefault();
        setModal(!modal);
    }

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ];

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

    return <ContainerMainContent>
        <h1>Propostas</h1>
        <FormFilter Title='Filtrar propostas' LabelButton="Buscar">
            <Input label="Título" type="text" name="searchDemand" {...searchDemand} placeholder="Ex. Landing Page" definitionMaxWidth="350px" />
            <Select options={options} label="Área" name="area-select" {...areaSelect} optionTitle="Selecione uma área" />
            <Select options={options} label="Orçamento" name="budget-select" {...budgetSelect} optionTitle="Selecione um valor" />
            <Select options={options} label="Prazo" name="term-select" {...termSelect} optionTitle="Selecione um prazo" />
        </FormFilter>
        <h1>Resultados</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-file-import" Title="Landing Page" Infos={['Grupo Web Soluções', 'Instituição: IFBA', 'Prazo: 10/10/2025', 'Orçamento: R$ 3.000,00']} Tags={['IA', 'Desenvolvimento Web']} ButtonViewDetails onClickButtonViewDetails={handleClickModal} />
            <Card IconContainer="pi pi-file-import" Title="Landing Page" Infos={['Grupo Web Soluções', 'Instituição: IFBA', 'Prazo: 10/10/2025', 'Orçamento: R$ 3.000,00']} Tags={['IA', 'Desenvolvimento Web', 'Desenvolvimento Web']} ButtonViewDetails onClickButtonViewDetails={handleClickModal} />
        </ContainerCards>
        <Modal SetModal={setModal} View={modal} ButtonRecused ButtonConfirm>
            <ListInformations Title="Web Soluções" Informations={[informationsGeneral, aboutProposal, restrictions, requiredResources]} editStyle={{ maxHeight: '700px' }} modal />
        </Modal>
    </ContainerMainContent>
}

export default ProposalsRequester;