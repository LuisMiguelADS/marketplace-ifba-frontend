import React from 'react';
import styled from 'styled-components';
import Select from '../../Components/Forms/Select';
import useForm from '../../Hooks/useForm';
import Button from '../../Components/Forms/Button';
import Input from '../../Components/Forms/Input';
import Card from '../../Components/Card';
import ListInformations from '../../Components/ListInformations';
import ContainerMainContent from '../../Components/ContainerMainContent';
import FormFilter from '../../Components/FormFilter';
import Modal from '../../Components/Modal';
import SendDemand from '../../Components/SendDemand';

const ContainerCards = styled.div`
    width: 100%;
    margin: 30px 0px 20px 0px;
    display: flex;
    gap: 30px;
`

const ContainerButtons = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const GroupResearchProvider = () => {
    const searchDemand = useForm();
    const areaSelect = useForm();
    const demandSelect = useForm();
    const [modal, setModal] = React.useState(false);
    const [viewDetails, setViewDetails] = React.useState(false);

    function handleClickModal(event) {
        event.preventDefault();
        setModal(!modal);
    }

    function handleClickViewDetails(event) {
        event.preventDefault();
        setViewDetails(!viewDetails);
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
            subTitle: 'Cadastro na Plataforma',
            description: '20/10/2025'
        }],
        tags: ['IA', 'Desenvolvimento Web', 'Desenvolvimento de Software']
    };

    const aboutGroup = {
        title: 'Sobre o Grupo',
        infos: [{
            subTitle: 'Descrição',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna et lectus tristique auctor. Nam eleifend, velit eu imperdiet sollicitudin, sem magna vulputate magna, ut commodo nulla magna eget enim. Sed vel nunc eu neque elementum imperdiet. Proin et dolor eu elit ullamcorper tempus. Donec ut ornare arcu, at maximus eros. Nam sed varius nisi. Maecenas non felis non est venenatis venenatis. Praesent sed neque ut ligula pulvinar efficitur. Integer vitae erat quis massa vestibulum posuere.'
        }, {
            subTitle: 'Trabalhos Realizados',
            description: '18'
        }, {
            subTitle: 'Estrelas',
            description: '4.5 | 5 avaliações'
        },
        {
            subTitle: 'Membros',
            members: [{
                name: 'Integrante 1',
                img_perfil: ''
            },
            {
                name: 'Integrante 2',
                img_perfil: ''
            },
            {
                name: 'Integrante 3',
                img_perfil: ''
            },
            {
                name: 'Integrante 4',
                img_perfil: ''
            }]
        }]
    };

    return <ContainerMainContent>
        <h1>Grupos Pesquisa</h1>
        <FormFilter Title='Filtrar grupos' LabelButton="Buscar">
            <Input label="Título" type="text" name="searchDemand" {...searchDemand} placeholder="Ex. Landing Page" definitionMaxWidth="350px" />
            <Select options={options} label="Área" name="area-select" {...areaSelect} optionTitle="Selecione uma área" />
        </FormFilter>
        <h1>Resultados</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-users" Title="Web Soluções" Infos={['Instituição: IFBA']} Tags={['IA', 'Desenvolvimento Web']} ButtonViewDetails onClickButtonViewDetails={handleClickViewDetails} ReviewsStars="4.5 | 5 avaliações" />
            <Card IconContainer="pi pi-users" Title="Web Soluções" Infos={['Instituição: IFBA']} Tags={['IA', 'Desenvolvimento Web']} ButtonViewDetails onClickButtonViewDetails={handleClickViewDetails} ReviewsStars="4.5 | 5 avaliações" />
        </ContainerCards>

        {(viewDetails) && <div>
            <ListInformations Title="Web Soluções" Informations={[informationsGeneral, aboutGroup]} />
            <ContainerButtons>
                <Button onClick={handleClickModal} editStyle={{ marginTop: '20px' }}>Propor Demanda</Button>
            </ContainerButtons>
        </div>}
        <Modal SetModal={setModal} View={modal}>
            <SendDemand Title="Web Soluções" Informations={[informationsGeneral]}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginTop: '20px'
                }}>
                    <Select options={options} label="Demandas" name="demand-select" {...demandSelect} optionTitle="Selecione uma demanda" />
                    <Button>Enviar Demanda</Button>
                </div>
            </SendDemand>
        </Modal>
    </ContainerMainContent>
}

export default GroupResearchProvider;