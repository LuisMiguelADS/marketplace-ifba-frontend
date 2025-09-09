import React from 'react';
import styled from 'styled-components';
import Card from '../../Components/Card';
import NewDemandForm from '../../Components/NewDemandForm';
import ContainerMainContent from '../../Components/ContainerMainContent';
import ListInformations from '../../Components/ListInformations';
import Modal from '../../Components/Modal';
import Button from '../../Components/Forms/Button';
import Select from '../../Components/Forms/Select';
import FormFilter from '../../Components/FormFilter';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../Components/UserContext';
import { LISTAR_DEMANDAS_VIA_ORGANIZACAO_GET, APROVAR_REPROVAR_DEMANDA_POST } from '../../api/demanda';
import { getStatusColor } from '../../utils/statusColors';
import ContainerCards from '../../Components/ContainerCards';
import TextoAviso from '../../Components/TextoAviso';

const DemandsRequester = () => {
    const statusSelect = useForm();
    const [modal, setModal] = React.useState(false);
    const [modalFormNewDemand, setModalFormNewDemand] = React.useState(false);
    const { request, loading } = useFetch();
    const [demandas, setDemandas] = React.useState();
    const [demandasFiltradas, setDemandasFiltradas] = React.useState([]);
    const [selectedDemand, setSelectedDemand] = React.useState(null);
    const { organizacao, user } = React.useContext(UserContext);

    React.useEffect(() => {
        async function fetchData() {
            const token = window.localStorage.getItem('token_autenticacao');
            const idOrganizacao = organizacao && organizacao.idOrganizacao;
            const { url, options } = LISTAR_DEMANDAS_VIA_ORGANIZACAO_GET(idOrganizacao, token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                setDemandas(json);
                setDemandasFiltradas(json);
                console.log('[OVERVIEWREQUESTER]: Sucesso na busca por demandas');
            } else {
                console.log('[OVERVIEWREQUESTER]: Falha na busca por demandas');
            }
        }
        fetchData();
    }, [organizacao]);

    React.useEffect(() => {
        let demandasFiltradas = demandas || [];

        if (statusSelect.value) {
            demandasFiltradas = demandasFiltradas.filter(demanda => 
                demanda.status && demanda.status.toLowerCase() === statusSelect.value.toLowerCase()
            );
        }

        setDemandasFiltradas(demandasFiltradas);
    }, [demandas, statusSelect.value]);

    function handleClickModal(demand) {
        setSelectedDemand(demand);
        setModal(!modal);
        console.log(demand);
    }

    function handleClickFormModal(event) {
        event.preventDefault();
        setModalFormNewDemand(!modalFormNewDemand);
    }

    function handleDemandCreated(newDemand) {
        setDemandas(prevDemandas => [newDemand, ...(prevDemandas || [])]);
        setModalFormNewDemand(false);
    }

    function handleClearFilters() {
        statusSelect.setValue('');
    }

    async function handleApprovalDecision(idDemanda, decisao) {
        const token = window.localStorage.getItem('token_autenticacao');
        const { url, options } = APROVAR_REPROVAR_DEMANDA_POST({ idDemanda, decisao }, token);
        const { response } = await request(url, options);
        if (response.ok) {
            console.log(`[DEMANDSREQUESTER]: Demanda ${decisao ? 'aprovada' : 'reprovada'} com sucesso`);
            alert(`Demanda ${decisao ? 'aprovada' : 'reprovada'} com sucesso!`);
            const updatedDemandas = demandas.map(demanda => 
                demanda.idDemanda === idDemanda 
                    ? { ...demanda, status: decisao ? 'AGUARDANDO_PROPOSTA' : 'NAO_APROVADO' }

                    : demanda
            );
            setDemandas(updatedDemandas);
            setModal(false);
        } else {
            console.log('[DEMANDSREQUESTER]: Falha na aprovação/reprovação da demanda');
            alert('Erro ao processar a decisão. Tente novamente.');
        }
    }

    function handleApprove() {
        if (selectedDemand) {
            handleApprovalDecision(selectedDemand.idDemanda, true);
        }
    }

    function handleReject() {
        if (selectedDemand) {
            handleApprovalDecision(selectedDemand.idDemanda, false);
        }
    }

    const statusOptions = [
        { value: 'AGUARDANDO_APROVACAO', label: 'Aguardando Aprovação' },
        { value: 'NAO_APROVADA', label: 'Não Aprovada' },
        { value: 'AGUARDANDO_PROPOSTA', label: 'Aguardando Proposta' },
        { value: 'EXCLUIDA', label: 'Excluída' },
        { value: 'INATIVA', label: 'Inativa' },
        { value: 'FINALIZADA', label: 'Finalizada' }
    ];



    return <ContainerMainContent>
        <h1>Demandas Abertas</h1>
        <FormFilter Title='Filtrar' onClearFilters={handleClearFilters}>
            <Select options={statusOptions} label="Status" name="status-select" {...statusSelect} optionTitle="Selecione um status" />
        </FormFilter>
        <h1>Resultados ({demandasFiltradas.length} {demandasFiltradas.length === 1 ? 'demanda encontrada' : 'demandas encontradas'})</h1>
        <ContainerCards>
            {loading ? (<p>Carregando...</p>) : (null)}
            {demandasFiltradas && demandasFiltradas.length > 0 ? (demandasFiltradas.map((demand, index) => {
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
                <TextoAviso>Nenhuma demanda encontrada</TextoAviso>
            )}
        </ContainerCards>
        <h1>Nova Demanda</h1>
        <Button editStyle={{ alignSelf: 'flex-start' }} onClick={handleClickFormModal}>Criar Demanda</Button>
        <Modal SetModal={setModalFormNewDemand} View={modalFormNewDemand}>
            <NewDemandForm 
                editStyle={{ overflowY: 'scroll', width: '1000px', maxHeight: '700px' }} 
                modal 
                onClick={() => setModalFormNewDemand(false)}
                onDemandCreated={handleDemandCreated}
            />
        </Modal>
        <Modal 
            SetModal={setModal} 
            View={modal} 
            ButtonApprove={selectedDemand && organizacao.usuarioGerente.idUsuario === user.idUsuario && selectedDemand.status === 'AGUARDANDO_APROVACAO'}
            ButtonCanceled={selectedDemand && organizacao.usuarioGerente.idUsuario === user.idUsuario && selectedDemand.status === 'AGUARDANDO_APROVACAO'}
            onButtonApproveClick={handleApprove}
            onButtonCanceledClick={handleReject}
        >
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
                editStyle={{ maxHeight: '700px' }}
                modal
            />
        </Modal>
    </ContainerMainContent>
}

export default DemandsRequester;