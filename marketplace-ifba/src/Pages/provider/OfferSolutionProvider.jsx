import React from 'react';
import styled from 'styled-components';
import Card from '../../Components/Card';
import ContainerMainContent from '../../Components/ContainerMainContent';
import ListInformations from '../../Components/ListInformations';
import Modal from '../../Components/Modal';
import { UserContext } from '../../Components/UserContext';
import useFetch from '../../Hooks/useFetch';
import { LISTAR_OFERTAS_VIA_GRUPO_PESQUISA_GET, APROVAR_REPROVAR_OFERTA_SOLUCAO_POST } from '../../api/ofertaSolucao';
import { getStatusColor } from '../../utils/statusColors';
import ContainerCards from '../../Components/ContainerCards';
import TextoAviso from '../../Components/TextoAviso';

const OfferSolutionProvider = () => {
    const [modal, setModal] = React.useState(false);
    const [ofertas, setOfertas] = React.useState();
    const { grupoPesquisa, user, hasRole } = React.useContext(UserContext);
    const { request, loading } = useFetch();
    const [selectedOferta, setSelectedOferta] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const token = window.localStorage.getItem('token_autenticacao');
            const idGrupoPesquisa = grupoPesquisa && grupoPesquisa.idGrupoPesquisa;
            const { url, options } = LISTAR_OFERTAS_VIA_GRUPO_PESQUISA_GET(idGrupoPesquisa, token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                setOfertas(json);
                console.log('[OFFERSOLUTIONPROVIDER]: Sucesso na busca por ofertas solução do grupo de pesquisa');
            } else {
                console.log('[OFFERSOLUTIONPROVIDER]: Falha na busca por ofertas solução do grupo de pesquisa');
            }
        }
        fetchData();
    }, [grupoPesquisa]);

    function handleClickModal(oferta) {
        setSelectedOferta(oferta);
        setModal(!modal);
        console.log(oferta);
    }

    async function handleApprovalDecision(idOfertaSolucao, decisao) {
        const token = window.localStorage.getItem('token_autenticacao');
        const { url, options } = APROVAR_REPROVAR_OFERTA_SOLUCAO_POST({ idOfertaSolucao, decisao }, token);
        const { response } = await request(url, options);
        if (response.ok) {
            alert(`Oferta ${decisao ? 'aprovada' : 'reprovada'} com sucesso!`);
            const updatedOfertas = ofertas.map(oferta => 
                oferta.idOfertaSolucao === idOfertaSolucao 
                    ? { ...oferta, status: decisao ? 'APROVADO' : 'NAO_APROVADO' }
                    : oferta
            );
            setOfertas(updatedOfertas);
            setModal(false);
        } else {
            console.log('[OFFERSOLUTIONPROVIDER]: Falha na aprovação/reprovação da oferta');
            alert('Erro ao processar a decisão. Tente novamente.');
        }
    }

    function handleApprove() {
        if (selectedOferta) {
            handleApprovalDecision(selectedOferta.idSolucao, true);
        }
    }

    function handleReject() {
        if (selectedOferta) {
            handleApprovalDecision(selectedOferta.idSolucao, false);
        }
    }

    const getButtonsConfig = () => {
        if (!selectedOferta || !hasRole('PROFESSOR') || selectedOferta.status !== 'AGUARDANDO_APROVACAO') {
            return {};
        }
        
        return {
            ButtonConfirm: true,
            ButtonRecused: true,
            onButtonConfirmClick: handleApprove,
            onButtonRecusedClick: handleReject
        };
    };

    return <ContainerMainContent>
        <h1>Ofertas Abertas</h1>
        <p style={{ margin: '-20px 0px', fontSize: '16px' }}>Selecione uma oferta para ver mais informações</p>

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
        <Modal SetModal={setModal} View={modal} {...getButtonsConfig()}>
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
                editStyle={{ maxHeight: '700px', minWidth: '1000px' }}
                modal />
        </Modal>
    </ContainerMainContent>
}

export default OfferSolutionProvider;