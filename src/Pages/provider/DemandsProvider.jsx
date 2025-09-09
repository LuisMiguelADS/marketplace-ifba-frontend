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
import { UserContext } from '../../Components/UserContext';
import useFetch from '../../Hooks/useFetch';
import { LISTAR_DEMANDAS_APROVADAS_GET, VISUALIZAR_DEMANDA_POST } from '../../api/demanda';
import { REMOVER_DEMANDA_GRUPO_PESQUISA_POST } from '../../api/grupoPesquisa';
import { REGISTER_PROJETO_POST } from '../../api/projeto';
import NewOfferForm from '../../Components/NewOfferForm';
import ContainerCards from '../../Components/ContainerCards';
import TextoAviso from '../../Components/TextoAviso';


const DemandsProvider = () => {
    const searchDemand = useForm();
    const areaSelect = useForm();
    const budgetSelect = useForm();
    const termSelect = useForm();
    const [modal, setModal] = React.useState();
    const [demandas, setDemandas] = React.useState([]);
    const [demandasFiltradas, setDemandasFiltradas] = React.useState([]);
    const [selectedDemanda, setSelectedDemanda] = React.useState(null);
    const [isReceivedDemand, setIsReceivedDemand] = React.useState(false);
    const [isGeneralDemand, setIsGeneralDemand] = React.useState(false);
    const [showOfferForm, setShowOfferForm] = React.useState(false);
    const { request, loading, error } = useFetch();
    const { user, instituicao, grupoPesquisa } = React.useContext(UserContext);

    React.useEffect(() => {
        async function fetchDemandas() {
            const token = window.localStorage.getItem('token_autenticacao');
            if (token) {
                const { url, options } = LISTAR_DEMANDAS_APROVADAS_GET(token);
                const { response, json } = await request(url, options);
                if (response && response.ok) {
                    setDemandas(json);
                    setDemandasFiltradas(json);
                    console.log('[PROPOSALSPROVIDER]: Sucesso na busca por demandas aprovadas');
                } else {
                    console.log('[PROPOSALSPROVIDER]: Falha na busca por demandas aprovadas');
                }
            }
        }
        fetchDemandas();
    }, [request]);

    React.useEffect(() => {
        let demandasFiltradas = demandas;

        if (searchDemand.value) {
            demandasFiltradas = demandasFiltradas.filter(demanda => 
                demanda.nome && demanda.nome.toLowerCase().includes(searchDemand.value.toLowerCase())
            );
        }

        if (areaSelect.value) {
            demandasFiltradas = demandasFiltradas.filter(demanda => 
                demanda.areas && demanda.areas.toLowerCase().includes(areaSelect.value.toLowerCase())
            );
        }

        if (budgetSelect.value) {
            demandasFiltradas = demandasFiltradas.filter(demanda => {
                const orcamento = parseFloat(demanda.orcamento);
                switch (budgetSelect.value) {
                    case 'ate-1000':
                        return orcamento <= 1000;
                    case '1000-5000':
                        return orcamento > 1000 && orcamento <= 5000;
                    case '5000-10000':
                        return orcamento > 5000 && orcamento <= 10000;
                    case 'acima-10000':
                        return orcamento > 10000;
                    default:
                        return true;
                }
            });
        }

        if (termSelect.value) {
            const hoje = new Date();
            demandasFiltradas = demandasFiltradas.filter(demanda => {
                if (!demanda.dataPrazoFinal) return false;
                const prazoFinal = new Date(demanda.dataPrazoFinal);
                const diasRestantes = Math.ceil((prazoFinal - hoje) / (1000 * 60 * 60 * 24));
                
                switch (termSelect.value) {
                    case 'ate-7-dias':
                        return diasRestantes <= 7 && diasRestantes >= 0;
                    case '7-30-dias':
                        return diasRestantes > 7 && diasRestantes <= 30;
                    case '30-90-dias':
                        return diasRestantes > 30 && diasRestantes <= 90;
                    case 'acima-90-dias':
                        return diasRestantes > 90;
                    default:
                        return true;
                }
            });
        }

        setDemandasFiltradas(demandasFiltradas);
    }, [demandas, searchDemand.value, areaSelect.value, budgetSelect.value, termSelect.value]);

    async function handleClickModal(event, demanda = null, isReceived = false, isGeneral = false) {
        event.preventDefault();
        
        if (demanda) {
            const token = window.localStorage.getItem('token_autenticacao');
            if (token) {
                try {
                    const { url, options } = VISUALIZAR_DEMANDA_POST(demanda.idDemanda, token);
                    const response = await fetch(url, options);
                    
                    if (response && response.ok) {
                        console.log('[DEMANDSPROVIDER]: Visualização da demanda registrada com sucesso');
                    } else {
                        console.log('[DEMANDSPROVIDER]: Falha ao registrar visualização da demanda');
                    }
                } catch (error) {
                    console.log('[DEMANDSPROVIDER]: Erro ao registrar visualização:', error);
                }
            }
        }
        
        setSelectedDemanda(demanda);
        setIsReceivedDemand(isReceived);
        setIsGeneralDemand(isGeneral);
        setModal(!modal);
    }

    const areasOptions = React.useMemo(() => {
        if (!demandas || demandas.length === 0) return [];
        const todasAreas = demandas.flatMap(demanda => 
            demanda.areas ? demanda.areas.split(',').map(area => area.trim()) : []
        );
        const areasUnicas = [...new Set(todasAreas)];
        return areasUnicas.map(area => ({ value: area, label: area }));
    }, [demandas]);

    const budgetOptions = [
        { value: 'ate-1000', label: 'Até R$ 1.000' },
        { value: '1000-5000', label: 'R$ 1.000 - R$ 5.000' },
        { value: '5000-10000', label: 'R$ 5.000 - R$ 10.000' },
        { value: 'acima-10000', label: 'Acima de R$ 10.000' }
    ];

    const termOptions = [
        { value: 'ate-7-dias', label: 'Até 7 dias' },
        { value: '7-30-dias', label: '7 a 30 dias' },
        { value: '30-90-dias', label: '30 a 90 dias' },
        { value: 'acima-90-dias', label: 'Acima de 90 dias' }
    ];

    const getModalInformations = () => {
        if (!selectedDemanda) {
            return [
                {
                    title: 'Informações Gerais',
                    infos: [{
                        subTitle: 'Nenhuma demanda selecionada',
                        description: 'Selecione uma demanda para ver os detalhes'
                    }]
                }
            ];
        }

        const informationsGeneral = {
            title: 'Informações Gerais',
            infos: [
                {
                    subTitle: 'Organização',
                    description: selectedDemanda.organizacao?.nome || 'N/A'
                },
                {
                    subTitle: 'Responsável',
                    description: selectedDemanda.emailResponsavel || 'N/A'
                }
            ]
        };

        const aboutDemand = {
            title: 'Sobre a Demanda',
            infos: [
                {
                    subTitle: 'Título',
                    description: selectedDemanda.nome || 'N/A'
                },
                {
                    subTitle: 'Descrição',
                    description: selectedDemanda.descricao || 'Descrição não disponível'
                },
                {
                    subTitle: 'Resumo',
                    description: selectedDemanda.resumo || 'Resumo não disponível'
                },
                {
                    subTitle: 'Orçamento',
                    description: selectedDemanda.orcamento ? `R$ ${selectedDemanda.orcamento}` : 'N/A'
                },
                {
                    subTitle: 'Prazo',
                    description: selectedDemanda.dataPrazoFinal || 'N/A'
                },
                {
                    subTitle: 'Critérios',
                    description: selectedDemanda.criterio || 'Critérios não especificados'
                }
            ]
        };

        return [informationsGeneral, aboutDemand];
    };
  
    function handleClearFilters() {
        searchDemand.setValue('');
        areaSelect.setValue('');
        budgetSelect.setValue('');
        termSelect.setValue('');
    }

    async function handleAcceptDemand() {
        const token = window.localStorage.getItem('token_autenticacao');
        if (!token) {
            alert('Token de autenticação não encontrado.');
            return;
        }

        try {
            const projectData = {
                nome: selectedDemanda.nome,
                idOrganizacao: selectedDemanda.organizacao.idOrganizacao,
                idInstituicao: instituicao.idInstituicao,
                idDemanda: selectedDemanda.idDemanda,
                idGrupoPesquisa: grupoPesquisa.idGrupoPesquisa
            };

            const { url, options } = REGISTER_PROJETO_POST(projectData, token);
            const response = await fetch(url, options);
            
            if (response && response.ok) {
                alert('Demanda aceita com sucesso! Projeto criado.');
                setModal(false);
                setDemandas(prevDemandas => 
                    prevDemandas.filter(demanda => demanda.idDemanda !== selectedDemanda.idDemanda)
                );
                setDemandasFiltradas(prevDemandas => 
                    prevDemandas.filter(demanda => demanda.idDemanda !== selectedDemanda.idDemanda)
                );
            } else {
                let errorMessage = 'Erro desconhecido';
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const json = await response.json();
                        errorMessage = json?.message || errorMessage;
                    }
                } catch (jsonError) {
                    console.log('Erro ao ler JSON da resposta:', jsonError);
                }
                alert('Erro ao aceitar demanda: ' + errorMessage);
            }
        } catch (error) {
            alert('Erro ao aceitar demanda: ' + error.message);
        }
    }

    async function handleRejectDemand() {
        if (!selectedDemanda || !grupoPesquisa) {
            alert('Informações necessárias não disponíveis para recusar a demanda.');
            return;
        }

        const token = window.localStorage.getItem('token_autenticacao');
        if (!token) {
            alert('Token de autenticação não encontrado.');
            return;
        }

        const rejectData = {
            idDemanda: selectedDemanda.idDemanda,
            idGrupoPesquisa: grupoPesquisa.idGrupoPesquisa
        };

        try {
            const { url, options } = REMOVER_DEMANDA_GRUPO_PESQUISA_POST(rejectData, token);
        
            const response = await fetch(url, options);
            
            if (response && response.ok) {
                alert('Demanda recusada com sucesso!');
                setModal(false);
                setDemandas(prevDemandas => 
                    prevDemandas.filter(demanda => demanda.idDemanda !== selectedDemanda.idDemanda)
                );
                setDemandasFiltradas(prevDemandas => 
                    prevDemandas.filter(demanda => demanda.idDemanda !== selectedDemanda.idDemanda)
                );
            } else {
                let errorMessage = 'Erro desconhecido';
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const json = await response.json();
                        errorMessage = json?.message || errorMessage;
                    }
                } catch (jsonError) {
                    console.log('Erro ao ler JSON da resposta:', jsonError);
                }
                alert('Erro ao recusar demanda: ' + errorMessage);
            }
        } catch (error) {
            alert('Erro ao recusar demanda: ' + error.message);
        }
    }

    async function handleSendOffer() {
        if (!selectedDemanda) {
            alert('Nenhuma demanda selecionada.');
            return;
        }

        setModal(false);
        setShowOfferForm(true);
    }

    function handleOfferSuccess(offerData) {
        console.log('Oferta enviada com sucesso:', offerData);
        setShowOfferForm(false);
        setSelectedDemanda(null);
    }

    return <ContainerMainContent>
        <h1>Demandas Recebidas</h1>
        <ContainerCards>
            {loading ? (
                <p>Carregando demandas...</p>
            ) : error ? (
                <p>Erro ao carregar demandas: {error}</p>
            ) : (() => {
                const demandasDoGrupo = demandas.filter((demanda) => {
                    if (!grupoPesquisa || !demanda.gruposPesquisa) return false;
                    return demanda.gruposPesquisa.some(grupo => grupo.idGrupoPesquisa === grupoPesquisa.idGrupoPesquisa);
                });
                
                return demandasDoGrupo.length > 0 ? (
                    demandasDoGrupo.map((demanda) => (
                        <Card 
                            key={demanda.idDemanda}
                            IconContainer="pi pi-file-import" 
                            Title={demanda.nome || 'Demanda sem título'} 
                            Infos={[
                                `Organização: ${demanda.organizacao?.nome || 'N/A'}`,
                                `Prazo: ${new Date(demanda.dataPrazoFinal).toLocaleDateString('pt-BR') || 'N/A'}`,
                                `Orçamento: R$ ${demanda.orcamento || 'N/A'}`
                            ]} 
                            Tags={demanda.areas ? demanda.areas.split(',').map(area => area.trim()) : ['Geral']} 
                            onClick={(event) => handleClickModal(event, demanda, true)} 
                        />
                    ))
                ) : (
                    <TextoAviso>Nenhuma demanda recebida</TextoAviso>
                );
            })()}
        </ContainerCards>
        <h1>Todas as Demandas</h1>
        <FormFilter Title='Filtrar Demandas' onClearFilters={handleClearFilters}>
            <Input label="Título" type="text" name="searchDemand" {...searchDemand} placeholder="Ex. Landing Page" definitionMaxWidth="350px" />
            <Select options={areasOptions} label="Área" name="area-select" {...areaSelect} optionTitle="Selecione uma área" />
            <Select options={budgetOptions} label="Orçamento" name="budget-select" {...budgetSelect} optionTitle="Selecione um valor" />
            <Select options={termOptions} label="Prazo" name="term-select" {...termSelect} optionTitle="Selecione um prazo" />
        </FormFilter>
        <h1>Resultados ({demandasFiltradas.length} {demandasFiltradas.length === 1 ? 'demanda encontrada' : 'demandas encontradas'})</h1>
        <ContainerCards>
            {loading ? (
                <p>Carregando demandas...</p>
            ) : error ? (
                <p>Erro ao carregar demandas: {error}</p>
            ) : demandasFiltradas.length > 0 ? (
                demandasFiltradas.map((demanda) => (
                    <Card 
                        key={demanda.idDemanda}
                        IconContainer="pi pi-file-import" 
                        Title={demanda.nome || 'Demanda sem título'} 
                        Infos={[
                            `Organização: ${demanda.organizacao?.nome || 'N/A'}`,
                            `Prazo: ${new Date(demanda.dataPrazoFinal).toLocaleDateString('pt-BR') || 'N/A'}`,
                            `Orçamento: R$ ${demanda.orcamento || 'N/A'}`
                        ]} 
                        Tags={demanda.areas ? demanda.areas.split(',').map(area => area.trim()) : ['Geral']} 
                        onClick={(event) => handleClickModal(event, demanda, false, true)} 
                    />
                ))
            ) : (
                <TextoAviso>Nenhuma demanda encontrada</TextoAviso>
            )}
        </ContainerCards>
        <Modal 
            SetModal={setModal} 
            View={modal} 
            ButtonRecused={isReceivedDemand} 
            ButtonConfirm={isReceivedDemand || isGeneralDemand}
            ButtonOffer={isReceivedDemand || isGeneralDemand}
            onButtonRecusedClick={handleRejectDemand}
            onButtonConfirmClick={handleAcceptDemand}
            onButtonOfferClick={handleSendOffer}
        >
            <ListInformations 
                Title={selectedDemanda?.nome || 'Detalhes da Demanda'} 
                Informations={getModalInformations()} 
                editStyle={{ maxHeight: '700px' }} 
                modal 
            />
        </Modal>
        
        <Modal 
            SetModal={setShowOfferForm} 
            View={showOfferForm}
        >
            <NewOfferForm 
                demandaId={selectedDemanda?.idDemanda}
                onSuccess={handleOfferSuccess}
                editStyle={{ overflowY: 'scroll', maxHeight: '700px' }}
            />
        </Modal>
    </ContainerMainContent>
}

export default DemandsProvider;