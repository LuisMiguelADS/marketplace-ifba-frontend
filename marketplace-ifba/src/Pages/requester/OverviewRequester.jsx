import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from '../../Components/ContainerMainContent';
import ListInformations from '../../Components/ListInformations';
import Modal from '../../Components/Modal';
import Card from '../../Components/Card';
import useFetch from '../../Hooks/useFetch';
import { TODAS_DEMANDAS_GET } from '../../Components/api';

const ContainerCards = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
`

const OverviewRequester = () => {
    const [modal, setModal] = React.useState(false);
    const { request, data, error, loading } = useFetch();
    const [selectedDemand, setSelectedDemand] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const token = window.localStorage.getItem('token_autenticacao');
            const { url, options } = TODAS_DEMANDAS_GET(token);
            const { response } = await request(url, options);
            if (response.ok) {
                console.log('[OVERVIEWREQUESTER]: Sucesso na busca por demandas');
            } else {
                console.log('[OVERVIEWREQUESTER]: Falha na busca por demandas');
            }
        }
        fetchData();
    }, [request]);

    function handleClickModal(demand) {
        setSelectedDemand(demand);
        setModal(!modal);
        console.log(demand);
    }

    return <ContainerMainContent>
        <h1>Demandas Abertas</h1>
        <ContainerCards>
            {error ? (<p style={{ color: 'red' }}>{error}</p>) : (null)}
            {loading ? (<p>Carregando...</p>) : (null)}
            {data && data.length > 0 ? (data.map((demand, index) => {
                return (
                    <Card
                        key={index}
                        IconContainer="pi pi-file-edit"
                        Title={demand.nome}
                        Infos={[
                            'Data Cadastro: ' + new Date(demand.dataPrazoFinal).toLocaleDateString('pt-BR'),
                            demand.status === "NAO_APROVADA" ? 'Demanda não Aprovada' : 'Demanda Aprovada'
                        ]}
                        HideView="yes"
                        CountViews={demand.visualizacoes}
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
                Title={selectedDemand && selectedDemand.nome}
                Informations={[
                    {
                        title: 'Informações Gerais',
                        infos: [
                            {
                                subTitle: 'Organização',
                                description: selectedDemand && selectedDemand.organizacao && selectedDemand.organizacao.nome
                            },
                            {
                                subTitle: 'Email Responsável',
                                description: selectedDemand && selectedDemand.emailResponsavel
                            },
                            {
                                subTitle: 'Data Cadastro',
                                description: new Date(selectedDemand && selectedDemand.dataPrazoFinal).toLocaleDateString('pt-BR')
                            },
                            {
                                subTitle: 'Data Aprovação',
                                description: selectedDemand && selectedDemand.dataAprovacao ? new Date(selectedDemand.dateApprovedDemand).toLocaleDateString('pt-BR') : 'Ainda não foi analisada'
                            },
                        ]
                    },
                    {
                        title: 'Sobre Proposta',
                        infos: [
                            {
                                subTitle: 'Orçamento',
                                description: 'R$ ' + (selectedDemand?.orcamento ?? 'Não informado')
                            },
                            {
                                subTitle: 'Descrição',
                                description: selectedDemand && selectedDemand.descricao
                            },
                            {
                                subTitle: 'Resumo',
                                description: selectedDemand && selectedDemand.resumo
                            },
                            {
                                subTitle: 'Critérios',
                                description: selectedDemand && selectedDemand.criterio
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
                                description: selectedDemand && selectedDemand.visualizacoes
                            }
                        ]
                    }
                ]}
                editStyle={{ maxHeight: '700px', minWidth: '1000px' }}
                modal />
        </Modal>
    </ContainerMainContent>
}

export default OverviewRequester;