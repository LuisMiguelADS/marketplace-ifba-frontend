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
import { TODOS_PROJETOS_GET, CANCELAR_ENTREGA_PATCH, EDITAR_ENTREGA_PATCH, ENTREGAR_ENTREGA_PUT, CONCLUIR_ENTREGA_PATCH, ACEITAR_ENTREGA_PATCH, ENTREGAS_PROJETO_GET } from '../../api/projeto';
import ContainerCards from '../../Components/ContainerCards.jsx';
import TextoAviso from '../../Components/TextoAviso.jsx';

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

const ProjectsRequester = () => {
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
    const { user, organizacao } = React.useContext(UserContext);
    const statusSelect = useForm();

    const fetchProjetos = React.useCallback(async () => {
        const token = window.localStorage.getItem('token_autenticacao');
        if (token) {
            const { url, options } = TODOS_PROJETOS_GET(token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                const projetosFiltrados = json.filter(projeto => {
                    return projeto.organizacao?.idOrganizacao === organizacao?.idOrganizacao;
                });
                setProjetos(projetosFiltrados);
                console.log('[PROJECTSREQUESTER]: Projetos carregados com sucesso');
            } else {
                console.log('[PROJECTSREQUESTER]: Falha ao carregar projetos');
            }
        }
    }, [request, organizacao]);

    const fetchEntregas = React.useCallback(async (idProjeto) => {
        if (!idProjeto) return;
        setLoadingEntregas(true);
        const token = window.localStorage.getItem('token_autenticacao');
        if (token) {
            const { url, options } = ENTREGAS_PROJETO_GET(idProjeto, token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                setEntregas(json);
                console.log('[PROJECTSREQUESTER]: Entregas carregadas com sucesso');
            } else {
                console.log('[PROJECTSREQUESTER]: Falha ao carregar entregas');
                setEntregas([]);
            }
        }
        setLoadingEntregas(false);
    }, [request]);

    React.useEffect(() => {
        if (organizacao) {
            fetchProjetos();
        }
    }, [fetchProjetos, organizacao]);

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
        return (organizacao && entrega.idOrganizacaoSolicitante === organizacao.idOrganizacao) ||
               (user.grupoPesquisa && entrega.idGrupoPesquisaSolicitante === user.grupoPesquisa.idGrupoPesquisa);
    };

    const isSolicitado = (entrega) => {
        if (!entrega || !user) return false;
        return entrega.idOrganizacaoSolicitada === organizacao?.idOrganizacao ||
               entrega.idGrupoPesquisaSolicitado === user.grupoPesquisa?.idGrupoPesquisa;
    };

    const handleCancelarEntrega = async () => {
        if (!selectedEntrega) return;
        const token = window.localStorage.getItem('token_autenticacao');
        if (token) {
            const { url, options } = CANCELAR_ENTREGA_PATCH(selectedEntrega.idEntrega, token);
            const { response } = await request(url, options);
            if (response.ok) {
                await fetchProjetos();
                setModal(false);
                alert('Entrega cancelada com sucesso');
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
                await fetchProjetos();
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
                await fetchProjetos();
                setModal(false);
                alert('Entrega concluída com sucesso');
            }
        }
    };

    const handleAceitarEntrega = async () => {
        if (!selectedEntrega) return;
        const token = window.localStorage.getItem('token_autenticacao');
        if (token) {
            const { url, options } = ACEITAR_ENTREGA_PATCH(selectedEntrega.idEntrega, token);
            const { response } = await request(url, options);
            if (response.ok) {
                // Salva a posição atual do scroll
                const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                
                // Recarrega as entregas do projeto para obter dados atualizados
                await fetchEntregas(selectedProject.idProjeto);
                
                // Atualiza a entrega selecionada
                setSelectedEntrega(prev => ({ ...prev, status: 'ACEITA' }));
                
                setModal(false);
                
                // Restaura a posição do scroll após um pequeno delay
                setTimeout(() => {
                    window.scrollTo(0, scrollPosition);
                    alert('Entrega aceita com sucesso');
                }, 100);
            } else {
                alert('Erro ao aceitar entrega');
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
        const solicitado = isSolicitado(selectedEntrega);
        const status = selectedEntrega.status;
        
        return {
            ButtonCanceled: solicitante && status !== 'CANCELADA' && status !== 'CONCLUIDA' && status !== 'ENTREGUE' && status !== 'ACEITA',
            ButtonEdit: solicitante && status !== 'CANCELADA' && status !== 'CONCLUIDA' && status !== 'ENTREGUE' && status !== 'ACEITA',
            ButtonConfirm: status === 'ENTREGUE',
            onButtonCanceledClick: handleCancelarEntrega,
            onButtonEditClick: handleEditarEntrega,
            onButtonConfirmClick: handleAceitarEntrega,
            onButtonRecusedClick: handleConcluirEntrega
        };
    };

    const options = [
        { value: 'SOLICITADA', label: 'Solicitada' },
        { value: 'ENTREGUE', label: 'Entregue' },
        { value: 'CANCELADA', label: 'Cancelada' }
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
            <ContainerCards>
                {projetos.length > 0 ? (
                    projetos.map((projeto) => {
                        return (
                            <Card
                                key={projeto.idProjeto}
                                IconContainer="pi pi-file-check"
                                Title={projeto.nome}
                                Infos={[
                                    `Grupo: ${projeto.grupoPesquisa?.nome || 'Não definido'}`,
                                    `Início: ${formatDate(projeto.dataInicio)}`,
                                    `Previsão: ${formatDate(projeto.dataFinal)}`
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
                    <FormFilter Title='Filtrar entregas' LabelButton="Buscar">
                        <Select 
                            options={options} 
                            label="Status" 
                            name="status-select" 
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
                                            entrega.status === 'ENTREGUE' ? 'green' : 'gray'
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
                                    description: organizacao?.nome || 'Não definido'
                                },
                                {
                                    subTitle: 'Responsável',
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
                    onSuccess={(novaEntrega) => {
                        if (selectedProject) {
                            const projetosAtualizados = projetos.map(projeto => {
                                if (projeto.idProjeto === selectedProject.idProjeto) {
                                    return {
                                        ...projeto,
                                        entregas: [...(projeto.entregas || []), novaEntrega]
                                    };
                                }
                                return projeto;
                            });
                            setProjetos(projetosAtualizados);
                            
                            setSelectedProject({
                                ...selectedProject,
                                entregas: [...(selectedProject.entregas || []), novaEntrega]
                            });
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
                    onSuccess={(entregaEditada) => {
                        if (selectedProject && selectedEntrega) {
                            const projetosAtualizados = projetos.map(projeto => {
                                if (projeto.idProjeto === selectedProject.idProjeto) {
                                    const entregasAtualizadas = projeto.entregas.map(entrega => {
                                        if (entrega.idEntrega === selectedEntrega.idEntrega) {
                                            return { ...entrega, ...entregaEditada };
                                        }
                                        return entrega;
                                    });
                                    return { ...projeto, entregas: entregasAtualizadas };
                                }
                                return projeto;
                            });
                            setProjetos(projetosAtualizados);
                            
                            setSelectedProject({
                                ...selectedProject,
                                entregas: selectedProject.entregas.map(entrega => {
                                    if (entrega.idEntrega === selectedEntrega.idEntrega) {
                                        return { ...entrega, ...entregaEditada };
                                    }
                                    return entrega;
                                })
                            });
                            
                            setSelectedEntrega({ ...selectedEntrega, ...entregaEditada });
                        }
                    }}
                    onClose={() => setModalEditDelivery(false)}
                />
            </Modal>
        </ContainerMainContent>
    );
};

export default ProjectsRequester;