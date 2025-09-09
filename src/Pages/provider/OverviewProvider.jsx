import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from '../../Components/ContainerMainContent';
import ListInformations from '../../Components/ListInformations';
import Modal from '../../Components/Modal';
import Card from '../../Components/Card';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../Components/UserContext';
import { LISTAR_OFERTAS_VIA_GRUPO_PESQUISA_GET } from '../../api/ofertaSolucao';
import { TODOS_PROJETOS_GET } from '../../api/projeto';
import { getStatusColor } from '../../utils/statusColors';
import ContainerCards from '../../Components/ContainerCards';
import TextoAviso from '../../Components/TextoAviso';

const OverviewProvider = () => {
    const [modal, setModal] = React.useState(false);
    const { request, loading } = useFetch();
    const [ofertas, setOfertas] = React.useState();
    const [projetos, setProjetos] = React.useState([]);
    const [selectedOferta, setSelectedOferta] = React.useState(null);
    const [selectedProject, setSelectedProject] = React.useState(null);
    const { grupoPesquisa, organizacao } = React.useContext(UserContext);

    React.useEffect(() => {
        async function fetchData() {
            const token = window.localStorage.getItem('token_autenticacao');
            const idGrupoPesquisa = grupoPesquisa && grupoPesquisa.idGrupoPesquisa;
            const { url, options } = LISTAR_OFERTAS_VIA_GRUPO_PESQUISA_GET(idGrupoPesquisa, token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                setOfertas(json);
                console.log('[OVERVIEWREQUESTER]: Sucesso na busca por ofertas');
            } else {
                console.log('[OVERVIEWREQUESTER]: Falha na busca por ofertas');
            }
        }
        fetchData();
    }, [grupoPesquisa]);

    React.useEffect(() => {
        async function fetchProjetos() {
            const token = window.localStorage.getItem('token_autenticacao');
            if (token) {
                const { url, options } = TODOS_PROJETOS_GET(token);
                const { response, json } = await request(url, options);
                if (response.ok) {
                    setProjetos(json);
                    console.log('[OVERVIEWPROVIDER]: Sucesso na busca por projetos');
                } else {
                    console.log('[OVERVIEWPROVIDER]: Falha na busca por projetos');
                }
            }
        }
        fetchProjetos();
    }, [request]);

    function handleClickModal(oferta) {
        setSelectedOferta(oferta);
        setModal(!modal);
        console.log(oferta);
    }

    function handleClickProjectModal(project) {
        setSelectedProject(project);
        console.log(project);
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
                    description: formatDate(projeto.dataInicio)
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
        <h1>Ofertas Abertas</h1>
        <ContainerCards>
            {loading ? (<p>Carregando...</p>) : (null)}
            {ofertas && ofertas.length > 0 ? (ofertas.map((oferta, index) => {
                return (
                    <Card
                        key={index}
                        IconContainer="pi pi-file-edit"
                        Title={oferta.nome}
                        Infos={[
                            'Prazo de Entrega: ' + oferta.prazo + ' dias',
                            'Orçamento: R$ ' + oferta.preco,
                            'Solução: ' + oferta.tipoSolucao
                        ]}
                        Status={oferta.status}
                        ColorStatus={getStatusColor(oferta.status)}
                        onClick={() => handleClickModal(oferta)}
                    />
                );
            })) : (
                <TextoAviso>Nenhum oferta encontrada</TextoAviso>
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
                            `Instituição: ${projeto.instituicao?.nome || 'Não definido'}`,
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
            <Card IconContainer="pi pi-file-import" Title="Ofertas" Statistics={ofertas ? ofertas.length.toString().padStart(2, '0') : '00'} />
            <Card IconContainer="pi pi-check" Title="Taxa Sucesso" Statistics="89%" />
            <Card IconContainer="pi pi-sun" Title="Nova ideia?" ButtonNewIdea="yes" />
        </ContainerCards>
        <Modal SetModal={setModal} View={modal}>
            <ListInformations
                Title={selectedOferta && selectedOferta.nome}
                Informations={[
                    {
                        title: 'Informações Gerais',
                        infos: [
                            {
                                subTitle: 'Grupo Pesquisa',
                                description: selectedOferta && selectedOferta.grupoPesquisa && selectedOferta.grupoPesquisa.nome
                            },
                            {
                                subTitle: 'Tipo da Solução',
                                description: selectedOferta && selectedOferta.tipoSolucao
                            },
                            {
                                subTitle: 'Prazo de Entrega',
                                description: selectedOferta && selectedOferta.prazo + ' dias'
                            },
                            {
                                subTitle: 'Data Aprovação',
                                description: selectedOferta && selectedOferta.dataAprovacao ? new Date(selectedOferta.dataAprovacao).toLocaleDateString('pt-BR') : 'Ainda não foi analisada'
                            }
                        ]
                    },
                    {
                        title: 'Sobre Proposta',
                        infos: [
                            {
                                subTitle: 'Orçamento',
                                description: 'R$ ' + (selectedOferta?.preco ?? 'Não informado')
                            },
                            {
                                subTitle: 'Descrição',
                                description: selectedOferta && selectedOferta.descricao
                            },
                            {
                                subTitle: 'Resumo',
                                description: selectedOferta && selectedOferta.resumo
                            },
                            {
                                subTitle: 'Restrições',
                                description: selectedOferta && selectedOferta.restricao
                            }
                        ]
                    },
                    {
                        title: 'Estado',
                        infos: [
                            {
                                subTitle: 'Status',
                                description: selectedOferta && selectedOferta.status
                            },
                        ]
                    },
                    {
                        title: 'Demanda Associada',
                        infos: [
                            {
                                subTitle: 'Nome',
                                description: selectedOferta && selectedOferta.demanda && selectedOferta.demanda.nome
                            },
                            {
                                subTitle: 'Organização',
                                description: selectedOferta && selectedOferta.demanda && selectedOferta.demanda.organizacao.nome
                            },
                            {
                                subTitle: 'Email Responsável',
                                description: selectedOferta && selectedOferta.demanda && selectedOferta.demanda.emailResponsavel
                            },
                            {
                                subTitle: 'Orçamento',
                                description: selectedOferta && selectedOferta.demanda && selectedOferta.demanda.orcamento
                            },
                            {
                                subTitle: 'Descrição',
                                description: selectedOferta && selectedOferta.demanda && selectedOferta.demanda.descricao
                            },
                            {
                                subTitle: 'Resumo',
                                description: selectedOferta && selectedOferta.demanda && selectedOferta.demanda.resumo
                            },
                            {
                                subTitle: 'Critérios',
                                description: selectedOferta && selectedOferta.demanda && selectedOferta.demanda.criterio
                            }
                        ]
                    }
                ]}
                editStyle={{ maxHeight: '700px' }}
                modal />
        </Modal>
        <Modal SetModal={() => setSelectedProject(null)} View={!!selectedProject}>
             <ListInformations
                 Title={selectedProject && selectedProject.nome}
                 Informations={createProjectInformations(selectedProject)}
                 editStyle={{ maxHeight: '700px' }}
                 modal />
         </Modal>
    </ContainerMainContent>
}

export default OverviewProvider;