import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContainerMainContent from '../../Components/ContainerMainContent';
import ListInformations from '../../Components/ListInformations';
import Modal from '../../Components/Modal';
import Card from '../../Components/Card';
import useFetch from '../../Hooks/useFetch';
import { LISTAR_DEMANDAS_VIA_ORGANIZACAO_GET } from '../../api/demanda';
import { TODOS_PROJETOS_GET } from '../../api/projeto';
import { UserContext } from '../../Components/UserContext';
import { getStatusColor } from '../../utils/statusColors';
import ContainerCards from '../../Components/ContainerCards';
import TextoAviso from '../../Components/TextoAviso';

const OverviewRequester = () => {
    const [modal, setModal] = React.useState(false);
    const { request, loading } = useFetch();
    const [demandas, setDemandas] = React.useState();
    const [projetos, setProjetos] = React.useState([]);
    const [selectedDemand, setSelectedDemand] = React.useState(null);
    const [selectedProject, setSelectedProject] = React.useState(null);
    const { organizacao } = React.useContext(UserContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchData() {
            const token = window.localStorage.getItem('token_autenticacao');
            const idOrganizacao = organizacao && organizacao.idOrganizacao;
            const { url, options } = LISTAR_DEMANDAS_VIA_ORGANIZACAO_GET(idOrganizacao, token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                const demandasFiltradas = json.filter(demanda => demanda.status === 'AGUARDANDO_PROPOSTA');
                setDemandas(demandasFiltradas);
                console.log('[OVERVIEWREQUESTER]: Sucesso na busca por demandas');
            } else {
                console.log('[OVERVIEWREQUESTER]: Falha na busca por demandas');
            }
        }
        fetchData();
    }, [organizacao]);

    React.useEffect(() => {
        async function fetchProjetos() {
            const token = window.localStorage.getItem('token_autenticacao');
            if (token) {
                const { url, options } = TODOS_PROJETOS_GET(token);
                const { response, json } = await request(url, options);
                if (response.ok) {
                    setProjetos(json);
                    console.log('[OVERVIEWREQUESTER]: Sucesso na busca por projetos');
                } else {
                    console.log('[OVERVIEWREQUESTER]: Falha na busca por projetos');
                }
            }
        }
        fetchProjetos();
    }, [request]);

    function handleClickModal(demand) {
        setSelectedDemand(demand);
        setModal(!modal);
        console.log(demand);
    }

    function handleClickProjectModal(project) {
        setSelectedProject(project);
        console.log(project);
    }

    function handleNewIdeaClick() {
        navigate('/requester/demands');
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Não definido';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const createProjectInformations = (projeto) => {
        if (!projeto) return [];

        const informationsGeneral = {
            title: 'Informações Gerais',
            infos: [
                {
                    subTitle: 'Organização Solicitante',
                    description: organizacao?.nome || 'Não definido'
                },
                {
                    subTitle: 'Grupo Pesquisa Responsável',
                    description: projeto.grupoPesquisa?.nome || 'Não definido'
                },
                {
                    subTitle: 'Instituição Responsável',
                    description: projeto.instituicao?.nome || 'Não definido'
                }
            ]
        };

        const aboutProject = {
            title: 'Sobre a Proposta',
            infos: [
                {
                    subTitle: 'Descrição',
                    description: projeto.demanda?.descricao || 'Sem descrição disponível'
                },
                {
                    subTitle: 'Resumo',
                    description: projeto.demanda?.resumo || 'Sem resumo disponível'
                },
                {
                    subTitle: 'Orçamento',
                    description: projeto.demanda?.orcamento ? `R$ ${projeto.demanda?.orcamento.toLocaleString('pt-BR')}` : 'Não definido'
                }
            ]
        };

        const timeline = {
            title: 'Cronograma',
            infos: [
                {
                    subTitle: 'Iniciado',
                    description: formatDate(projeto.demanda?.dataAprovado)
                },
                {
                    subTitle: 'Prazo',
                    description: formatDate(projeto.demanda?.dataPrazoFinal)
                },
                {
                    subTitle: 'Finalizado',
                    description: formatDate(projeto.dataFim)
                }
            ]
        };

        const state = {
            title: 'Estado',
            infos: [
                {
                    subTitle: 'Status',
                    description: projeto.status
                },
                {
                    subTitle: 'Entregas',
                    description: projeto.entregas?.length?.toString() || '0'
                }
            ]
        };

        return [informationsGeneral, aboutProject, timeline, state];
    };

    return <ContainerMainContent>
        <h1>Demandas Abertas</h1>
        <ContainerCards>
            {loading ? (<p>Carregando...</p>) : (null)}
            {demandas && demandas.length > 0 ? (demandas.map((demand, index) => {
                return (
                    <Card
                        key={index}
                        IconContainer="pi pi-file-edit"
                        Title={demand.nome}
                        Infos={[
                            'Prazo de Entrega: ' + new Date(demand.dataPrazoFinal).toLocaleDateString('pt-BR'),
                            'Orçamento: R$ ' + demand.orcamento,
                            'Email: ' + demand.emailResponsavel
                        ]}
                        HideView="yes"
                        CountViews={demand.visualizacoes}
                        Status={demand.status}
                        ColorStatus={getStatusColor(demand.status)}
                        onClick={() => handleClickModal(demand)}
                    />
                );
            })) : (
                <TextoAviso>Nenhum demanda encontrada</TextoAviso>
            )}
        </ContainerCards>
        <h1>Projetos Ativos</h1>
        <ContainerCards>
            {loading ? (<p>Carregando...</p>) : (null)}
            {projetos && projetos.length > 0 ? (projetos.map((projeto, index) => {
                return (
                    <Card
                        key={projeto.idProjeto || index}
                        IconContainer="pi pi-file-check"
                        Title={projeto.nome}
                        Infos={[
                            `Inst: ${projeto.instituicao?.nome || 'Não definido'}`,
                            `Início: ${formatDate(projeto.dataInicio)}`,
                            `Previsão: ${formatDate(projeto.dataPrazoFinal)}`
                        ]}
                        Status={projeto.status}
                        ColorStatus="green"
                        onClick={() => handleClickProjectModal(projeto)}
                    />
                );
            })) : (
                <TextoAviso>Nenhum projeto encontrado</TextoAviso>
            )}
        </ContainerCards>
        <h1>Dashboard</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-file-check" Title="Projetos Ativos" Statistics={projetos ? projetos.length.toString().padStart(2, '0') : '00'} />
            <Card IconContainer="pi pi-file-import" Title="Demandas" Statistics={demandas ? demandas.length.toString().padStart(2, '0') : '00'} />
            <Card IconContainer="pi pi-check" Title="Taxa Sucesso" Statistics="89%" />
            <Card IconContainer="pi pi-sun" Title="Nova ideia?" ButtonNewIdea="yes" onClick={handleNewIdeaClick} />
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
                                subTitle: 'Prazo de Entrega',
                                description: new Date(selectedDemand && selectedDemand.dataPrazoFinal).toLocaleDateString('pt-BR')
                            },
                            {
                                subTitle: 'Data Aprovação',
                                description: selectedDemand && selectedDemand.dataAprovacao ? new Date(selectedDemand.dateApprovedDemand).toLocaleDateString('pt-BR') : 'Ainda não foi analisada'
                            }
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
        <Modal SetModal={() => setSelectedProject(null)} View={!!selectedProject}>
             <ListInformations
                 Title={selectedProject && selectedProject.nome}
                 Informations={createProjectInformations(selectedProject)}
                 editStyle={{ maxHeight: '700px', minWidth: '1000px' }}
                 modal />
         </Modal>
    </ContainerMainContent>
}

export default OverviewRequester;