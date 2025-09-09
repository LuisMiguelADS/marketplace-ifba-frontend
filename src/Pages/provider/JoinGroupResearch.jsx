import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from '../../Components/ContainerMainContent';
import { UserContext } from '../../Components/UserContext';
import useFetch from '../../Hooks/useFetch';
import { SOLICITAR_ASSOCIACAO_GRUPO_PESQUISA_POST, ASSOCIAR_USUARIO_GRUPO_PESQUISA_POST } from '../../api/usuario';
import { GRUPO_PESQUISA_NOME_GET, LISTAR_USUARIOS_SOLICITANTES_ASSOCIACAO_GRUPO_PESQUISA_GET } from '../../api/grupoPesquisa';
import useForm from '../../Hooks/useForm';
import Input from '../../Components/Forms/Input';
import Button from '../../Components/Forms/Button';
import Modal from '../../Components/Modal';
import FormRegisterGroupResearch from '../../Components/FormRegisterGroupResearch';
import ListInformations from '../../Components/ListInformations';

const AlertContainer = styled.div`
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: var(--standard-border);
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AlertIcon = styled.i`
    font-size: 1.5rem;
    color: #856404;
`;

const AlertText = styled.p`
    color: #856404;
    font-size: 1.1rem;
    margin: 0;
    font-weight: 500;
`;

const ErrorMessage = styled.p`
    color: #dc3545;
    font-size: 0.9rem;
    margin: 5px 0 0 0;
    font-weight: 400;
    margin-top: -20px;
`;

const ContainerRequest = styled.div`
    background-color: #E3F4E3;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: var(--standard-border);
`

const JoinGroupResearch = () => {
    const nomeGrupoPesquisa = useForm();
    const { user, grupoPesquisa, instituicao } = React.useContext(UserContext);
    const { request, data } = useFetch();
    const [solicitantesAssociacao, setSolicitantesAssociacao] = React.useState();
    const [modal, setModal] = React.useState();
    const [searchError, setSearchError] = React.useState(false);

    function handleClickButtonModal(event) {
        event.preventDefault();
        setModal(!modal);
    }

    async function handleClickButtonRequest(event) {
        event.preventDefault();
        
        if (!instituicao || !user.idInstituicao) {
            alert('Você precisa estar vinculado a uma instituição para solicitar associação a um grupo de pesquisa.');
            return;
        }
        
        solicitarAssociacaoOrganizacaoCnpj();
    }

    async function solicitarAssociacaoOrganizacaoCnpj() {
        const token = window.localStorage.getItem('token_autenticacao');
        const idUsuario = user.idUsuario;
        const idGrupoPesquisa = data.idGrupoPesquisa;
        
        const { url, options } = SOLICITAR_ASSOCIACAO_GRUPO_PESQUISA_POST({ 
            idUsuario: idUsuario, 
            idEntidade: idGrupoPesquisa
        }, token);
        
        const { response } = await request(url, options);
        if (response.ok) {
            console.log('[JOINGROUPRESEARCH]: Solicitação de associação realizada com sucesso');
        } else {
            console.log('[JOINGROUPRESEARCH]: Falha na busca do grupo pesquisa via solicitação de associação');
        }
    }

    async function handleClickButtonSearch(event) {
        event.preventDefault();
        buscarGrupoPesquisaPorNome(nomeGrupoPesquisa.value);
    }

    async function buscarGrupoPesquisaPorNome(nomeGrupoPes) {
        const token = window.localStorage.getItem('token_autenticacao');
        const { url, options } = GRUPO_PESQUISA_NOME_GET(nomeGrupoPes, token);
        const { response } = await request(url, options);
        if (response.ok) {
            setSearchError(false);
            console.log('[JOINGROUPRESEARCH]: Busca de grupo pesquisa via NOME realizada com sucesso');
        } else {
            setSearchError(true);
            console.log('[JOINGROUPRESEARCH]: Falha na busca grupo pesquisa via NOME');
        }
    }

    async function handleClickButtonAcceptGroupResearch(event) {
        event.preventDefault();
        aceitarOuRecusarOrganizacao(event.target.id, true);
    }

    async function handleClickButtonRejectGroupResearch(event) {
        event.preventDefault();
        aceitarOuRecusarOrganizacao(event.target.id, false);
    }

    async function aceitarOuRecusarOrganizacao(idUsuario, decisao) {
        const token = window.localStorage.getItem('token_autenticacao');
        const idGrupoPesquisa = grupoPesquisa.idGrupoPesquisa;
        const { url, options } = ASSOCIAR_USUARIO_GRUPO_PESQUISA_POST({ 
            idUsuario: idUsuario, 
            idEntidade: idGrupoPesquisa,
            decisao: decisao 
        }, token);
        const { response } = await request(url, options);
        if (response.ok) {
            const acao = decisao ? 'aceita' : 'recusada';
            alert(`Solicitação ${acao} com sucesso!`);
            console.log(`[JOINGROUPRESEARCH]: Solicitação para ${decisao ? 'aceitar' : 'recusar'} usuário na organização realizada com sucesso`);
            const { url: urlListar, options: optionsListar } = LISTAR_USUARIOS_SOLICITANTES_ASSOCIACAO_GRUPO_PESQUISA_GET(idGrupoPesquisa, token);
            const { response: responseListar, json } = await request(urlListar, optionsListar);
            if (responseListar.ok) {
                setSolicitantesAssociacao(json);
            }
        } else {
            alert('Erro ao processar solicitação. Tente novamente.');
            console.log('[JOINGROUPRESEARCH]: Falha na solicitação para processar usuário na organização');
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            if (grupoPesquisa !== null) {
                const token = window.localStorage.getItem('token_autenticacao');
                const idGrupoPesquisa = grupoPesquisa.idGrupoPesquisa;
                const { url, options } = LISTAR_USUARIOS_SOLICITANTES_ASSOCIACAO_GRUPO_PESQUISA_GET(idGrupoPesquisa, token);
                const { response, json } = await request(url, options);
                if (response.ok) {
                    setSolicitantesAssociacao(json)
                    console.log(json)
                    console.log('[JOINGROUPRESEARCH]: Solicitação de usuários que solicitaram associação realizada com sucesso');
                } else {
                    console.log('[JOINGROUPRESEARCH]: Falha na solicitação de usuários que solicitaram associação');
                }
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grupoPesquisa])

    React.useEffect(() => {
        if (!nomeGrupoPesquisa.value || nomeGrupoPesquisa.value.trim() === '') {
            setSearchError(false);
        }
    }, [nomeGrupoPesquisa.value])

    return <ContainerMainContent>
        {grupoPesquisa !== null ? (<>
            <ListInformations
                Title={grupoPesquisa && grupoPesquisa.nome}
                Informations={[{
                    title: 'Informações Gerais',
                    infos: [
                        {
                            subTitle: 'Descrição',
                            description: grupoPesquisa && grupoPesquisa.descricao
                        },
                        {
                            subTitle: 'Trabalhos',
                            description: grupoPesquisa && grupoPesquisa.trabalhos
                        },
                        {
                            subTitle: 'Instituição',
                            description: grupoPesquisa && grupoPesquisa.instituicao.nome
                        }
                    ]
                }
                ]} />
            {(grupoPesquisa.usuarioRegistrador.idUsuario === user.idUsuario) && (<>
                <h1>Solicitações de Entrada</h1>
                {solicitantesAssociacao && solicitantesAssociacao.length > 0 ? (
                    solicitantesAssociacao.map((solicitante) => {
                        return (
                            <ContainerRequest key={solicitante.idUsuario}>
                                <h2>{solicitante.nome}</h2>
                                <div>
                                    <h4>Email</h4>
                                    <p>{solicitante.email}</p>
                                </div>
                                <div>
                                    <h4>Telefone</h4>
                                    <p>{solicitante.telefone}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Button onClick={handleClickButtonAcceptGroupResearch} id={solicitante.idUsuario}>Aceitar</Button>
                                    <Button onClick={handleClickButtonRejectGroupResearch} id={solicitante.idUsuario} Recused>Recusar</Button>
                                </div>
                            </ContainerRequest>
                        );
                    })
                ) : (
                    <ContainerRequest style={{
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '150px',
                        color: '#646363',
                        fontSize: '1.2em',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        width: '1000px'
                    }}>
                        <p>Sem Solicitações</p>
                    </ContainerRequest>
                )} </>
            )}

        </>) : (<>
            <h1>Conectar em um Grupo de Pesquisa</h1>
            {!instituicao || !user.idInstituicao ? (
                <AlertContainer>
                    <AlertIcon className="pi pi-exclamation-triangle" />
                    <AlertText>
                        Você precisa estar vinculado a uma instituição para solicitar associação a um grupo de pesquisa.
                    </AlertText>
                </AlertContainer>
            ) : null}
            <h3>Procure o seu Grupo de Pesquisa pelo NOME</h3>
            <form style={{ display: 'flex', gap: '20px' }}>
                <div>
                    <Input
                        label="Nome do Grupo Pesquisa"
                        type="text"
                        name="name"
                        {...nomeGrupoPesquisa}
                        placeholder="Digite o nome"
                        definitionMaxWidth="400px"
                    />
                </div>
                <Button onClick={handleClickButtonSearch}>Buscar</Button>
            </form>
            {searchError && nomeGrupoPesquisa.value && (
                <ErrorMessage>
                    Nenhum grupo de pesquisa encontrado com esse nome.
                </ErrorMessage>
            )}
            {data && <>
                <h1>Resultado</h1>
                <ListInformations
                    Title={data && data.nome}
                    Informations={[{
                        title: 'Informações Gerais',
                        infos: [
                            {
                                subTitle: 'Descrição',
                                description: data && data.descricao
                            },
                            {
                                subTitle: 'Trabalhos',
                                description: data && data.trabalhos
                            },
                            {
                                subTitle: 'Instituição',
                                description: data && data.instituicao.nome
                            }
                        ]
                    }
                    ]}
                />
                <Button editStyle={{ alignSelf: 'flex-start' }} onClick={handleClickButtonRequest}>Solicitar Conexão</Button>
            </>}
            {user.role === 'PROFESSOR' && (
                <>
                    <h2 style={{ borderTop: '1px solid black', paddingTop: '20px' }}>Seu Grupo de Pesquisa ainda não está cadastrada?</h2>
                    <Button editStyle={{ alignSelf: 'flex-start' }} onClick={handleClickButtonModal}>Solicitar Cadastro</Button>
                    <Modal SetModal={setModal} View={modal}>
                        <FormRegisterGroupResearch editStyle={{ overflowY: 'scroll', width: '1000px', maxHeight: '700px' }} modal />
                    </Modal>
                </>
            )}
        </>)
        }
    </ContainerMainContent>
}

export default JoinGroupResearch