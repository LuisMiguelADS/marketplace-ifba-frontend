import React from 'react';
import styled from 'styled-components';
import Select from '../../Components/Forms/Select.jsx';
import useForm from '../../Hooks/useForm.jsx';
import Card from '../../Components/Card.jsx';
import ListInformations from '../../Components/ListInformations.jsx';
import ContainerMainContent from '../../Components/ContainerMainContent.jsx';
import ContainerCards from '../../Components/ContainerCards.jsx';
import FormFilter from '../../Components/FormFilter.jsx';
import Modal from '../../Components/Modal.jsx';
import TextoAviso from '../../Components/TextoAviso.jsx';
import { UserContext } from '../../Components/UserContext.jsx';
import useFetch from '../../Hooks/useFetch.jsx';
import { LISTAR_OFERTAS_VIA_DEMANDA_GET, LISTAR_OFERTAS_APROVADAS_GET } from '../../api/ofertaSolucao.jsx';
import { LISTAR_DEMANDAS_VIA_ORGANIZACAO_GET } from '../../api/demanda.jsx';
import { REGISTER_PROJETO_POST } from '../../api/projeto.jsx';
import { getStatusColor } from '../../utils/statusColors.js';

const ContainerButtons = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 30px;
`

const ProposalsRequester = () => {
    const { user, organizacao, instituicao, grupoPesquisa } = React.useContext(UserContext);
    const budgetSelect = useForm();
    const termSelect = useForm();
    const [modal, setModal] = React.useState();
    const [selectedOferta, setSelectedOferta] = React.useState(null);
    const [ofertas, setOfertas] = React.useState([]);
    const [demandas, setDemandas] = React.useState([]);
    const [filteredOfertas, setFilteredOfertas] = React.useState([]);

    const { request: requestOfertas } = useFetch();
    const { request: requestDemandas } = useFetch();

    function handleClickModal(oferta) {
        setSelectedOferta(oferta);
        setModal(!modal);
    }

    React.useEffect(() => {
        if (organizacao && organizacao.idOrganizacao) {
            async function fetchDemandas() {
                const token = window.localStorage.getItem('token_autenticacao');
                if (token) {

                    const { url, options } = LISTAR_DEMANDAS_VIA_ORGANIZACAO_GET(organizacao.idOrganizacao, token);
                    const { response, json } = await requestDemandas(url, options);
                    if (response.ok) {

                        setDemandas(json);
                    }
                }
            }
            fetchDemandas();
        }
    }, [organizacao, requestDemandas]);

    React.useEffect(() => {
        async function fetchOfertasAprovadas() {
            const token = window.localStorage.getItem('token_autenticacao');
            if (token && organizacao && organizacao.idOrganizacao) {
                try {
                    const { url, options } = LISTAR_OFERTAS_APROVADAS_GET(organizacao.idOrganizacao, token);
                    const { response, json } = await requestOfertas(url, options);
                    if (response.ok && json) {
                        setOfertas(json);
                    }
                } catch (error) {
                    console.error('Erro ao buscar ofertas aprovadas:', error);
                }
            }
        }
        fetchOfertasAprovadas();
    }, [organizacao, requestOfertas]);

    React.useEffect(() => {
        if (ofertas) {
            setFilteredOfertas(ofertas);
        }
    }, [ofertas]);

    const applyFilters = () => {
        let filtered = [...filteredOfertas];

        if (budgetSelect.value) {
            const maxBudget = parseFloat(budgetSelect.value);
            filtered = filtered.filter(oferta => 
                parseFloat(oferta.preco) <= maxBudget
            );
        }

        if (termSelect.value) {
            const maxTerm = parseInt(termSelect.value);
            filtered = filtered.filter(oferta => 
                parseInt(oferta.prazo) <= maxTerm
            );
        }

        return filtered;
    };

    const displayedOfertas = applyFilters();

    async function handleAcceptOffer() {
        const token = window.localStorage.getItem('token_autenticacao');
        if (!token) {
            alert('Token de autenticação não encontrado.');
            return;
        }

        if (!selectedOferta || !selectedOferta.demanda) {
            alert('Informações da oferta ou demanda não disponíveis.');
            return;
        }

        try {
            const projectData = {
                nome: selectedOferta.demanda.nome,
                idOrganizacao: organizacao.idOrganizacao,
                idInstituicao: selectedOferta.grupoPesquisa.instituicao.idInstituicao,
                idDemanda: selectedOferta.demanda.idDemanda,
                idGrupoPesquisa: selectedOferta.grupoPesquisa.idGrupoPesquisa,
                idOfertaSolucao: selectedOferta.idSolucao
            };

            const { url, options } = REGISTER_PROJETO_POST(projectData, token);
            const response = await fetch(url, options);
            
            if (response && response.ok) {
                alert('Oferta aceita com sucesso! Projeto criado.');
                setModal(false);
                setOfertas(prevOfertas => 
                    prevOfertas.filter(oferta => oferta.id !== selectedOferta.id)
                );
                setFilteredOfertas(prevOfertas => 
                    prevOfertas.filter(oferta => oferta.id !== selectedOferta.id)
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
                alert('Erro ao aceitar oferta: ' + errorMessage);
            }
        } catch (error) {
            alert('Erro ao aceitar oferta: ' + error.message);
        }
    }

    const options = [
        { value: '5000', label: 'Até R$ 5.000' },
        { value: '10000', label: 'Até R$ 10.000' },
        { value: '20000', label: 'Até R$ 20.000' },
        { value: '50000', label: 'Até R$ 50.000' }
    ];

    const termOptions = [
        { value: '30', label: 'Até 30 dias' },
        { value: '60', label: 'Até 60 dias' },
        { value: '90', label: 'Até 90 dias' },
        { value: '180', label: 'Até 180 dias' }
    ];

    return <ContainerMainContent>
        <h1>Ofertas</h1>
        <FormFilter Title='Filtrar propostas' LabelButton="Buscar">
            <Select options={options} label="Orçamento" name="budget-select" {...budgetSelect} optionTitle="Selecione um valor" />
            <Select options={termOptions} label="Prazo" name="term-select" {...termSelect} optionTitle="Selecione um prazo" />
        </FormFilter>
        <h1>Resultados</h1>
        <ContainerCards>
            {displayedOfertas.length > 0 ? (
                displayedOfertas.map((oferta) => (
                    <Card
                        key={oferta.id}
                        onClick={() => handleClickModal(oferta)}
                        IconContainer="pi pi-file-edit"
                        Title={oferta.nome || 'Título não disponível'}
                        Tags={oferta.areas ? oferta.areas.split(',').map(area => area.trim()) : ['Geral']} 
                        Infos={[
                            `Prazo de Entrega: ${oferta.prazo} dias`,
                            `Orçamento: R$ ${parseFloat(oferta.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                            `Solução: ${oferta.tipoSolucao || 'Não especificado'}`
                        ]}
                    />
                ))
            ) : (
                <TextoAviso>Nenhuma oferta recebida</TextoAviso>
            )}
        </ContainerCards>
        <Modal SetModal={setModal} View={modal} ButtonRecused ButtonConfirm onButtonConfirmClick={handleAcceptOffer}>
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
    </ContainerMainContent>
}

export default ProposalsRequester;