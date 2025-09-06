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
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../Components/UserContext';
import { LISTAR_GRUPOS_PESQUISA_GET } from '../../api/grupoPesquisa';
import { LISTAR_DEMANDAS_VIA_ORGANIZACAO_GET, ENVIAR_DEMANDA_GRUPO_POST } from '../../api/demanda';
import TextoAviso from '../../Components/TextoAviso';
import ContainerCards from '../../Components/ContainerCards';

const ContainerButtons = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const GroupResearchRequester = () => {
    const searchDemand = useForm();
    const areaSelect = useForm();
    const demandSelect = useForm();
    const [modal, setModal] = React.useState(false);
    const [viewDetails, setViewDetails] = React.useState(false);
    const [loadingEnvio, setLoadingEnvio] = React.useState(false);
    const { request, loading } = useFetch();
    const [gruposPesquisa, setGruposPesquisa] = React.useState();
    const [selectedGrupoPesquisa, setSelectedGrupoPesquisa] = React.useState(null);
    const [demandasOrganizacao, setDemandasOrganizacao] = React.useState([]);
    const { organizacao } = React.useContext(UserContext);

    React.useEffect(() => {
        async function fetchData() {
            const token = window.localStorage.getItem('token_autenticacao');
            const { url, options } = LISTAR_GRUPOS_PESQUISA_GET(token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                setGruposPesquisa(json);
                console.log('[GROUPRESEARCHREQUESTER]: Sucesso na busca por grupos de pesquisa');
            } else {
                console.log('[GROUPRESEARCHREQUESTER]: Falha na busca por grupos de pesquisa');
            }
        }
        fetchData();
    }, []);

    async function handleClickModal(event) {
        event.preventDefault();
        
        if (!organizacao || !organizacao.idOrganizacao) {
            alert('Você precisa estar vinculado a uma organização para propor demandas.');
            return;
        }
        
        try {
            const token = window.localStorage.getItem('token_autenticacao');
            const { url, options } = LISTAR_DEMANDAS_VIA_ORGANIZACAO_GET(organizacao.idOrganizacao, token);
            const { response, json } = await request(url, options);
            
            if (response.ok) {
                const demandasFiltradas = json.filter(demanda => demanda.status === 'AGUARDANDO_PROPOSTA');
                setDemandasOrganizacao(demandasFiltradas);
                console.log('[GROUPRESEARCHREQUESTER]: Sucesso na busca por demandas da organização');
            } else {
                console.log('[GROUPRESEARCHREQUESTER]: Falha na busca por demandas da organização');
                setDemandasOrganizacao([]);
            }
        } catch (error) {
            console.error('[GROUPRESEARCHREQUESTER]: Erro ao buscar demandas:', error);
            setDemandasOrganizacao([]);
        }
        
        setModal(!modal);
    }

    async function handleEnviarDemanda(event) {
        event.preventDefault();
        
        if (!demandSelect.value) {
            alert('Por favor, selecione uma demanda.');
            return;
        }
        
        if (!selectedGrupoPesquisa || !selectedGrupoPesquisa.idGrupoPesquisa) {
            alert('Nenhum grupo de pesquisa selecionado.');
            return;
        }
        
        setLoadingEnvio(true);
        
        try {
            const token = window.localStorage.getItem('token_autenticacao');
            const body = {
                idDemanda: demandSelect.value,
                idGrupoPesquisa: selectedGrupoPesquisa.idGrupoPesquisa
            };
            
            const { url, options } = ENVIAR_DEMANDA_GRUPO_POST(body, token);
            const { response, json } = await request(url, options);
            
            if (response.ok) {
                alert('Demanda enviada com sucesso para o grupo de pesquisa!');
                console.log('[GROUPRESEARCHREQUESTER]: Demanda enviada com sucesso');
                
                demandSelect.setValue('');
                setModal(false);
            } else {
                const errorMessage = json?.message || 'Erro ao enviar demanda. Tente novamente.';
                alert(errorMessage);
                console.log('[GROUPRESEARCHREQUESTER]: Falha ao enviar demanda:', json);
            }
        } catch (error) {
            console.error('[GROUPRESEARCHREQUESTER]: Erro ao enviar demanda:', error);
            alert('Erro inesperado ao enviar demanda. Tente novamente.');
        } finally {
            setLoadingEnvio(false);
        }
    }

    const demandOptions = demandasOrganizacao.map(demanda => ({
        value: demanda.idDemanda,
        label: demanda.nome
    }));

    console.log(demandOptions);

    const areasUnicas = React.useMemo(() => {
        if (!gruposPesquisa) return [];
        const todasAreas = gruposPesquisa.flatMap(grupo => grupo.areasPesquisa || []);
        const areasUnicasSet = [...new Set(todasAreas)];
        return areasUnicasSet.map(area => ({ value: area, label: area }));
    }, [gruposPesquisa]);

    function handleClearFilters() {
        searchDemand.setValue('');
        areaSelect.setValue('');
    }

    return <ContainerMainContent>
        <h1>Grupos Pesquisa</h1>
        <FormFilter Title='Filtrar grupos' onClearFilters={handleClearFilters}>
            <Input label="Título" type="text" name="searchDemand" {...searchDemand} placeholder="Ex. Landing Page" definitionMaxWidth="350px" />
            <Select options={areasUnicas} label="Área" name="area-select" {...areaSelect} optionTitle="Selecione uma área" />
        </FormFilter>
        <h1>Resultados</h1>
        <ContainerCards>
            {loading ? (<p>Carregando...</p>) : (null)}
            {gruposPesquisa && gruposPesquisa.length > 0 ? (gruposPesquisa.map((grupo, index) => {
                return (
                    <Card
                        key={index}
                        IconContainer="pi pi-users"
                        Title={grupo.nome}
                        Infos={[
                            (grupo.instituicao ? grupo.instituicao.nome : 'Não informado'),
                            'Membros: ' + (grupo.usuarios ? grupo.usuarios.length : 0)
                        ]}
                        Tags={grupo.areasPesquisa || []}
                        onClick={(event) => {
                            event.preventDefault();
                            setSelectedGrupoPesquisa(grupo);
                            setViewDetails(!viewDetails);
                        }}
                        ReviewsStars={grupo.classificacao ? `${grupo.avaliacoes.media} | ${grupo.avaliacoes.total} avaliações` : 'Sem avaliações'}
                    />
                );
            })) : (
                <TextoAviso>Nenhum grupo de pesquisa encontrado</TextoAviso>
            )}
        </ContainerCards>

        {(viewDetails && selectedGrupoPesquisa) && <div>
            <ListInformations 
                Title={selectedGrupoPesquisa.nome} 
                Informations={[
                    {
                        title: 'Informações Gerais',
                        infos: [
                            {
                                subTitle: 'Grupo Pesquisa',
                                description: selectedGrupoPesquisa.nome
                            },
                            {
                                subTitle: 'Instituição',
                                description: selectedGrupoPesquisa.instituicao ? selectedGrupoPesquisa.instituicao.nome : 'Não informado'
                            },
                            {
                                subTitle: 'Cadastro na Plataforma',
                                description: selectedGrupoPesquisa.dataRegistro ? new Date(selectedGrupoPesquisa.dataRegistro).toLocaleDateString('pt-BR') : 'Não informado'
                            }
                        ],
                        tags: selectedGrupoPesquisa.areasPesquisa || []
                    },
                    {
                        title: 'Sobre o Grupo',
                        infos: [
                            {
                                subTitle: 'Descrição',
                                description: selectedGrupoPesquisa.descricao || 'Descrição não disponível'
                            },
                            {
                                subTitle: 'Trabalhos Realizados',
                                description: selectedGrupoPesquisa.trabalhosRealizados || '0'
                            },
                            {
                                subTitle: 'Estrelas',
                                description: selectedGrupoPesquisa.avaliacoes ? `${selectedGrupoPesquisa.avaliacoes.media} | ${selectedGrupoPesquisa.avaliacoes.total} avaliações` : 'Sem avaliações'
                            },
                            {
                                subTitle: 'Membros',
                                members: selectedGrupoPesquisa.usuarios || []
                            }
                        ]
                    }
                ]} 
            />
            <ContainerButtons>
                <Button onClick={handleClickModal} editStyle={{ marginTop: '20px' }}>Propor Demanda</Button>
            </ContainerButtons>
        </div>}
        <Modal SetModal={setModal} View={modal}>
            <SendDemand 
                Title={selectedGrupoPesquisa ? selectedGrupoPesquisa.nome : 'Grupo de Pesquisa'} 
                Informations={selectedGrupoPesquisa ? [
                    {
                        title: 'Informações Gerais',
                        infos: [
                            {
                                subTitle: 'Grupo Pesquisa',
                                description: selectedGrupoPesquisa.nome
                            },
                            {
                                subTitle: 'Instituição',
                                description: selectedGrupoPesquisa.instituicao ? selectedGrupoPesquisa.instituicao.nome : 'Não informado'
                            },
                            {
                                subTitle: 'Cadastro na Plataforma',
                                description: selectedGrupoPesquisa.dataRegistro ? new Date(selectedGrupoPesquisa.dataRegistro).toLocaleDateString('pt-BR') : 'Não informado'
                            }
                        ],
                        tags: selectedGrupoPesquisa.areasPesquisa || []
                    }
                ] : []}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginTop: '20px'
                }}>
                    <Select options={demandOptions} label="Demandas" name="demand-select" {...demandSelect} optionTitle="Selecione uma demanda" />
                    <Button onClick={handleEnviarDemanda} disabled={loadingEnvio}>
                        {loadingEnvio ? 'Enviando...' : 'Enviar Demanda'}
                    </Button>
                </div>
            </SendDemand>
        </Modal>
    </ContainerMainContent>
}

export default GroupResearchRequester;