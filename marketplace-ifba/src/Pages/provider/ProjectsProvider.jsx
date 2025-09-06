import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from '../../Components/ContainerMainContent';
import Card from '../../Components/Card';
import ListInformations from '../../Components/ListInformations';
import Button from '../../Components/Forms/Button';
import Delivery from '../../Components/Delivery';
import Modal from '../../Components/Modal';
import NewDeliveryForm from '../../Components/NewDeliveryForm';
import FormFilter from '../../Components/FormFilter';
import useForm from '../../Hooks/useForm';
import Select from '../../Components/Forms/Select';
import { UserContext } from '../../Components/UserContext';
import useFetch from '../../Hooks/useFetch';
import { TODOS_PROJETOS_GET, CANCELAR_ENTREGA_PATCH, EDITAR_ENTREGA_PATCH, ENTREGAR_ENTREGA_PUT, CONCLUIR_ENTREGA_PATCH, APROVAR_ENTREGA_POST, ENTREGAS_PROJETO_GET } from '../../api/projeto';
import ContainerCards from '../../Components/ContainerCards';
import TextoAviso from '../../Components/TextoAviso';

const ContainerButtons = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
`

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 18px;
`

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: #ff0404;
    font-size: 16px;
`

const ProjectsProvider = () => {
    const [viewDetails, setViewDetails] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [modalNewDelivery, setModalNewDelivery] = React.useState(false);
    const [modalEditDelivery, setModalEditDelivery] = React.useState(false);
    const [projetos, setProjetos] = React.useState([]);
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [selectedEntrega, setSelectedEntrega] = React.useState(null);
    const [entregas, setEntregas] = React.useState([]);
    const [loadingEntregas, setLoadingEntregas] = React.useState(false);
    const { request, loading, error } = useFetch();
    const { user, hasRole } = React.useContext(UserContext);
    const statusSelect = useForm();

    const fetchProjetos = React.useCallback(async () => {
        const token = window.localStorage.getItem('token_autenticacao');
        if (token) {
            const { url, options } = TODOS_PROJETOS_GET(token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                setProjetos(json);
                console.log('[PROJECTSPROVIDER]: Projetos carregados com sucesso');
            } else {
                console.log('[PROJECTSPROVIDER]: Falha ao carregar projetos');
            }
        }
    }, [request]);

    const fetchEntregas = React.useCallback(async (idProjeto) => {
        const token = window.localStorage.getItem('token_autenticacao');
        if (token && idProjeto) {
            setLoadingEntregas(true);
            try {
                const { url, options } = ENTREGAS_PROJETO_GET(idProjeto, token);
                const { response, json } = await request(url, options);
                if (response.ok) {
                    setEntregas(json);
                }
            } catch (error) {
                console.error('Erro ao buscar entregas:', error);
            } finally {
                setLoadingEntregas(false);
            }
        }
    }, [request]);

    React.useEffect(() => {
        fetchProjetos();
    }, [fetchProjetos]);

    React.useEffect(() => {
        if (selectedProject) {
            fetchEntregas(selectedProject.idProjeto);
        } else {
            setEntregas([]);
        }
    }, [selectedProject, fetchEntregas]);

    function handleClickModal(event, entrega = null) {
        event.preventDefault();
        setSelectedEntrega(entrega);
        setModal(!modal);
    }

    function handleClickModalNewDelivery(event) {
        event.preventDefault();
        setModalNewDelivery(!modalNewDelivery);
    }

    function handleClickViewDetails(projeto) {
        return (event) => {
            event.preventDefault();
            if (selectedProject && selectedProject.idProjeto === projeto.idProjeto) {
                setViewDetails(!viewDetails);
            } else {
                setSelectedProject(projeto);
                setViewDetails(true);
            }
        };
    }

    const isSolicitante = (entrega) => {
        if (!entrega || !user) return false;
        return entrega.idGrupoPesquisaSolicitante === user.idGrupoPesquisa;
    };

    const handleCancelarEntrega = async () => {
        if (!selectedEntrega) return;
        const token = window.localStorage.getItem('token_autenticacao');
        if (token) {
            const { url, options } = CANCELAR_ENTREGA_PATCH(selectedEntrega.idEntrega, token);
            const { response } = await request(url, options);
            if (response.ok) {
                await fetchEntregas(selectedProject.idProjeto);
                setModal(false);
                console.log('[PROJECTSPROVIDER]: Entrega cancelada com sucesso');
            }
        }
    };

    const handleSolicitarEntrega = async () => {
        if (!selectedEntrega) return;
        const token = window.localStorage.getItem('token_autenticacao');
        if (token) {
            const { url, options } = ENTREGAR_ENTREGA_PUT(selectedEntrega.idEntrega, token);
            const { response } = await request(url, options);
            if (response.ok) {
                await fetchEntregas(selectedProject.idProjeto);
                setModal(false);
                alert('Entrega solicitada com sucesso');
            }
        }
    };

    const handleConcluirEntrega = async () => {
        if (!selectedEntrega) return;
        const token = window.localStorage.getItem('token_autenticacao');
        if (token) {
            const { url, options } = CONCLUIR_ENTREGA_PATCH(selectedEntrega.idEntrega, token);
            const { response } = await request(url, options);
            if (response.ok) {
                await fetchEntregas(selectedProject.idProjeto);
                setModal(false);
                alert('Entrega concluída com sucesso');
                console.log('[PROJECTSPROVIDER]: Entrega concluída com sucesso');
            } else {
                alert('Erro ao concluir entrega');
                console.log('[PROJECTSPROVIDER]: Falha ao concluir entrega');
            }
        }
    };

    const handleAprovarEntrega = async () => {
        if (!selectedEntrega || !user) return;
        const token = window.localStorage.getItem('token_autenticacao');
        if (token) {
            const requestBody = {
                idEntrega: selectedEntrega.idEntrega,
                idUsuarioAprovador: user.idUsuario
            };
            const { url, options } = APROVAR_ENTREGA_POST(requestBody, token);
            const { response } = await request(url, options);
            if (response.ok) {
                await fetchEntregas(selectedProject.idProjeto);
                setModal(false);
                alert('Entrega aprovada com sucesso');
                console.log('[PROJECTSPROVIDER]: Entrega aprovada com sucesso');
            } else {
                alert('Erro ao aprovar entrega');
                console.log('[PROJECTSPROVIDER]: Falha ao aprovar entrega');
            }
        }
    };

    const handleEditarEntrega = () => {
        setModal(false);
        setModalEditDelivery(true);
    };



    const getButtonsConfig = () => {
        if (!selectedEntrega) return {};
        
        const solicitante = isSolicitante(selectedEntrega);
        const status = selectedEntrega.status;
        const isProfessor = hasRole('PROFESSOR');
        const isAluno = hasRole('ALUNO');
        const isEmAnalise = status === 'EM_ANALISE';
        const isSolicitada = status === 'SOLICITADA';
        
        const config = {
            ButtonCanceled: solicitante && status !== 'CANCELADA' && status !== 'CONCLUIDA',
            ButtonEdit: solicitante && status !== 'CANCELADA' && status !== 'CONCLUIDA',
            onButtonCanceledClick: handleCancelarEntrega,
            onButtonEditClick: handleEditarEntrega,
            onButtonConfirmClick: handleSolicitarEntrega,
            onButtonRecusedClick: handleConcluirEntrega
        };
        
        if (isProfessor && isEmAnalise && selectedEntrega.idGrupoPesquisaSolicitante === user.idGrupoPesquisa) {
            config.ButtonApprove = true;
            config.onButtonApproveClick = handleAprovarEntrega;
        }
        
        if (isSolicitada && (isProfessor || isAluno)) {
            config.ButtonDeliver = true;
            config.onButtonDeliverClick = handleConcluirEntrega;
        }
        
        return config;
    };

    const options = [
        { value: 'SOLICITADA', label: 'Solicitada' },
        { value: 'ENTREGUE', label: 'Entregue' },
        { value: 'CANCELADA', label: 'Cancelada' },
        { value: 'EM_ANALISE', label: 'Em Análise' }
    ];

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
                    subTitle: 'Grupo Pesquisa',
                    description: projeto.grupoPesquisa?.nome || 'Não definido'
                },
                {
                    subTitle: 'Instituição',
                    description: projeto.instituicao?.nome || 'Não definido'
                },
                {
                    subTitle: 'Organização',
                    description: projeto.organizacao?.nome || 'Não definido'
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

    if (loading) {
        return (
            <ContainerMainContent>
                <h1>Projetos</h1>
                <LoadingContainer>
                    Carregando projetos...
                </LoadingContainer>
            </ContainerMainContent>
        );
    }

    if (error) {
        return (
            <ContainerMainContent>
                <h1>Projetos</h1>
                <ErrorContainer>
                    Erro ao carregar projetos: {error}
                </ErrorContainer>
            </ContainerMainContent>
        );
    }

    return (
        <ContainerMainContent>
            <h1>Projetos</h1>
            <p style={{ margin: '-20px 0px', fontSize: '16px' }}>Selecione um projeto para ver mais informações</p>

            <ContainerCards>
                {projetos.length > 0 ? (
                    projetos.map((projeto) => {
                        return (
                            <Card
                                key={projeto.idProjeto}
                                IconContainer="pi pi-file-check"
                                Title={projeto.nome}
                                Infos={[
                                    `Instituição: ${projeto.instituicao?.nome || 'Não definido'}`,
                                    `Início: ${formatDate(projeto.dataInicio)}`,
                                    `Previsão: ${formatDate(projeto.dataPrazoFinal)}`
                                ]}
                                Status={projeto.status}
                                ColorStatus="green"
                                HideView="no"
                                onClick={handleClickViewDetails(projeto)}
                            />
                        );
                    })
                ) : (
                    <TextoAviso>Nenhum projeto encontrado</TextoAviso>
                )}
            </ContainerCards>
            {(viewDetails && selectedProject) && (
                <>
                    <ListInformations
                        Title={selectedProject.nome}
                        Informations={createProjectInformations(selectedProject)}
                    />
                </>
            )}
            {(viewDetails && selectedProject) && (
                <>
                    <h1>Entregas Solicitadas</h1>
                    <FormFilter Title='Filtrar entregas'>
                        <Select
                            label="Status"
                            name="status"
                            options={options}
                            {...statusSelect}
                            optionTitle="Selecione um status"
                        />
                    </FormFilter>
                    <h1>Resultados</h1>
                    <ContainerCards>
                        {(() => {
                            if (loadingEntregas) {
                                return (
                                    <div style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'center',
                                        color: '#646363',
                                        fontSize: '1.5rem',
                                        padding: '20px'
                                    }}>
                                        <p>Carregando entregas...</p>
                                    </div>
                                );
                            }
                            
                            const entregasFiltradas = entregas.filter(entrega =>
                                !statusSelect.value || entrega.status === statusSelect.value
                            );
                            if (entregasFiltradas.length > 0) {
                                return entregasFiltradas.map((entrega, index) => (
                                    <Card
                                        key={entrega.idEntrega || index}
                                        IconContainer="pi pi-file-plus"
                                        Title={entrega.titulo || `Entrega ${index + 1}`}
                                        Infos={[
                                            `Solicitante: ${entrega.nomeGrupoPesquisaSolicitado || entrega.nomeOrganizacaoSolicitada || 'Não definido'}`,
                                            `Prazo: ${formatDate(entrega.prazoDesejado)}`
                                        ]}
                                        Status={entrega.status || 'Em desenvolvimento'}
                                        ColorStatus={
                                            entrega.status === 'CANCELADA' ? 'red' :
                                            entrega.status === 'SOLICITADA' ? 'orange' :
                                            entrega.status === 'ENTREGUE' ? 'green' :
                                            entrega.status === 'EM_ANALISE' ? 'gray' : 'blue'
                                        }
                                        HideView="no"
                                        onClick={(event) => handleClickModal(event, entrega)}
                                    />
                                ));
                            } else {
                                const statusLabel = statusSelect.value ? 
                                    options.find(option => option.value === statusSelect.value)?.label || statusSelect.value : null;
                                return (
                                    <div style={{
                                        display: 'flex',
                                        width: '100%',
                                        color: '#646363',
                                        fontSize: '2rem',
                                        fontWeight: 'bold'
                                    }}>
                                        <p>{statusLabel ? `Nenhuma entrega ${statusLabel.toLowerCase()}` : 'Nenhuma entrega solicitada'}</p>
                                    </div>
                                );
                            }
                        })()}
                    </ContainerCards>
                    <ContainerButtons>
                        <Button onClick={handleClickModalNewDelivery} editStyle={{ alignSelf: 'flex-start' }}>
                            Nova Entrega
                        </Button>
                    </ContainerButtons>
                </>
            )}
            <Modal SetModal={setModal} View={modal} {...getButtonsConfig()}>
                <Delivery
                    Title={selectedEntrega?.titulo || 'Entrega'}
                    Informations={[
                        {
                            title: 'Sobre a Entrega',
                            infos: [
                                {
                                    subTitle: 'Solicitante',
                                    description: selectedEntrega?.nomeGrupoPesquisaSolicitante || selectedEntrega?.nomeOrganizacaoSolicitante || 'Não definido'
                                },
                                {
                                    subTitle: 'Solicitado',
                                    description: selectedEntrega?.nomeGrupoPesquisaSolicitado || selectedEntrega?.nomeOrganizacaoSolicitada || 'Não definido'
                                },
                                {
                                    subTitle: 'Criada',
                                    description: formatDate(selectedEntrega?.dataCriacao)
                                },
                                {
                                    subTitle: 'Prazo',
                                    description: formatDate(selectedEntrega?.prazoDesejado)
                                },
                                {
                                    subTitle: 'Status',
                                    description: selectedEntrega?.status || 'Não definido'
                                },
                                {
                                    subTitle: 'Descrição',
                                    description: selectedEntrega?.descricao || 'Não definido'
                                }
                            ]
                        }
                    ]}
                >
                </Delivery>
            </Modal>
            <Modal SetModal={setModalNewDelivery} View={modalNewDelivery}>
                <NewDeliveryForm 
                    idProjeto={selectedProject?.idProjeto}
                    onSuccess={async (novaEntrega) => {
                        if (selectedProject) {
                            await fetchEntregas(selectedProject.idProjeto);
                        }
                    }}
                    onClose={() => setModalNewDelivery(false)}
                />
            </Modal>
            <Modal SetModal={setModalEditDelivery} View={modalEditDelivery}>
                <NewDeliveryForm 
                    idProjeto={selectedProject?.idProjeto}
                    entregaData={selectedEntrega}
                    isEditing={true}
                    onSuccess={async (entregaEditada) => {
                        if (selectedProject && selectedEntrega) {
                            await fetchEntregas(selectedProject.idProjeto);
                            setSelectedEntrega({ ...selectedEntrega, ...entregaEditada });
                        }
                    }}
                    onClose={() => setModalEditDelivery(false)}
                />
            </Modal>
        </ContainerMainContent>
    );
};

export default ProjectsProvider;