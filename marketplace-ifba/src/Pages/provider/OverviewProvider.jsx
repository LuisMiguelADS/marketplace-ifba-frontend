import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from '../../Components/ContainerMainContent';
import ListInformations from '../../Components/ListInformations';
import Modal from '../../Components/Modal';
import Card from '../../Components/Card';
import useFetch from '../../Hooks/useFetch';

const ContainerCards = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
`

const OverviewProvider = () => {
    const [modal, setModal] = React.useState(false);
    const { request, data, error, loading } = useFetch();
    const [selectedDemand, setSelectedDemand] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const { response, json } = await request('http://localhost:8080/geral/allDemands');
            console.log(response, json);
        }
        fetchData();
    }, [request]);

    function handleClickModal(demand) {
        setSelectedDemand(demand);
        setModal(!modal);
        console.log(demand);
    }

    return <ContainerMainContent>
        <h1>Ofertas</h1>
        <ContainerCards>
            {error ? (<p style={{ color: 'red' }}>{error}</p>) : (null)}
            {loading ? (<p>Carregando...</p>) : (null)}
            {data && data.length > 0 ? (data.map((demand, index) => {
                return (
                    <Card
                        key={index}
                        IconContainer="pi pi-file-edit"
                        Title={demand.titleDemand}
                        Infos={[
                            'Data Cadastro: ' + new Date(demand.dateTermDemand).toLocaleDateString('pt-BR'),
                            demand.organizationAprovation === true ? 'Demanda Aprovada' : 'Aguardando Aprovação'
                        ]}
                        HideView="yes"
                        CountViews={demand.views}
                        Status={demand.status}
                        ColorStatus="red"
                        onClick={() => handleClickModal(demand)}
                    />
                );
            })) : (<p>Sem demandas</p>)}
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
            <ListInformations
                Title={selectedDemand && selectedDemand.titleDemand}
                Informations={[
                    {
                        title: 'Informações Gerais',
                        infos: [
                            {
                                subTitle: 'Organização',
                                description: selectedDemand && selectedDemand.organization && selectedDemand.organization.name
                            },
                            {
                                subTitle: 'Email Responsável',
                                description: selectedDemand && selectedDemand.emailResponsible
                            },
                            {
                                subTitle: 'Data Cadastro',
                                description: new Date(selectedDemand && selectedDemand.dateTermDemand).toLocaleDateString('pt-BR')
                            },
                            {
                                subTitle: 'Data Aprovação',
                                description: selectedDemand && selectedDemand.dateApprovedDemand ? new Date(selectedDemand.dateApprovedDemand).toLocaleDateString('pt-BR') : 'Ainda não foi aprovado'
                            },
                        ]
                    },
                    {
                        title: 'Sobre Proposta',
                        infos: [
                            {
                                subTitle: 'Orçamento',
                                description: 'R$ ' + (selectedDemand?.budget ?? 'Não informado')
                            },
                            {
                                subTitle: 'Descrição',
                                description: selectedDemand && selectedDemand.description
                            },
                            {
                                subTitle: 'Resumo',
                                description: selectedDemand && selectedDemand.resum
                            },
                            {
                                subTitle: 'Critérios',
                                description: selectedDemand && selectedDemand.criteria
                            }
                        ]
                    },
                    {
                        title: 'Estado',
                        infos: [
                            {
                                subTitle: 'Status',
                                description: selectedDemand && selectedDemand.status
                            },
                            {
                                subTitle: 'Views',
                                description: selectedDemand && selectedDemand.views
                            }
                        ]
                    }
                ]}
                editStyle={{ maxHeight: '700px' }}
                modal />
        </Modal>
    </ContainerMainContent>
}

export default OverviewProvider;