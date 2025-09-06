import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from '../../Components/ContainerMainContent';
import Input from '../../Components/Forms/Input';
import useForm from '../../Hooks/useForm';
import { ORGANIZACAO_CNPJ_GET, LISTAR_USUARIOS_SOLICITANTES_ASSOCIACAO_GET } from '../../api/organizacao';
import { SOLICITAR_ASSOCIACAO_ORGANIZACAO_POST, ASSOCIAR_USUARIO_ORGANIZACAO_POST } from '../../api/usuario';
import useFetch from '../../Hooks/useFetch';
import Button from '../../Components/Forms/Button';
import ListInformations from '../../Components/ListInformations';
import { UserContext } from '../../Components/UserContext';
import Modal from '../../Components/Modal';
import FormRegisterOrganization from '../../Components/FormRegisterOrganization';

const ContainerRequest = styled.div`
    background-color: #E3F4E3;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: var(--standard-border);
`

const JoinOrganization = () => {
    const cnpj = useForm();
    const { user, organizacao } = React.useContext(UserContext);
    const [solicitantesAssociacao, setSolicitantesAssociacao] = React.useState();
    const { request, data } = useFetch();
    const [modal, setModal] = React.useState();

    function handleClickButtonModal(event) {
        event.preventDefault();
        setModal(!modal);
    }

    async function handleClickButtonSearch(event) {
        event.preventDefault();
        buscarOrganizacaoCnpj(cnpj.value);
    }

    async function buscarOrganizacaoCnpj(cnpjOrg) {
        const token = window.localStorage.getItem('token_autenticacao');
        const { url, options } = ORGANIZACAO_CNPJ_GET(cnpjOrg, token);
        const { response } = await request(url, options);
        if (response.ok) {
            console.log('[JOINORGANIZATION]: Busca organização via CNPJ realizada com sucesso');
        } else {
            console.log('[JOINORGANIZATION]: Falha na busca organização via CNPJ');
        }
    }

    async function handleClickButtonRequest(event) {
        event.preventDefault();
        solicitarAssociacaoOrganizacaoCnpj();
    }

    async function solicitarAssociacaoOrganizacaoCnpj() {
        const token = window.localStorage.getItem('token_autenticacao');
        const idUsuario = user.idUsuario;
        const idOrganizacao = data.idOrganizacao;
        const { url, options } = SOLICITAR_ASSOCIACAO_ORGANIZACAO_POST({ idUsuario: idUsuario, idEntidade: idOrganizacao }, token);
        const { response } = await request(url, options);
        if (response.ok) {
            console.log('[JOINORGANIZATION]: Solicitação de associação realizada com sucesso');
            alert('Solicitação de conexão enviada com sucesso!');
        } else {
            console.log('[JOINORGANIZATION]: Falha na busca da organização via solicitação de associação');
            alert('Erro ao enviar solicitação de conexão. Tente novamente.');
        }
    }

    async function handleClickButtonAcceptOrg(event) {
        event.preventDefault();
        const decisao = event.target.dataset.decisao === 'true';
        processarDecisaoOrganizacao(event.target.id, decisao);
    }

    async function processarDecisaoOrganizacao(idUsuario, decisao) {
        const token = window.localStorage.getItem('token_autenticacao');
        const idOrganizacao = organizacao.idOrganizacao;
        const { url, options } = ASSOCIAR_USUARIO_ORGANIZACAO_POST({ idUsuario: idUsuario, idEntidade: idOrganizacao, decisao: decisao }, token);
        const { response } = await request(url, options);
        if (response.ok) {
            const acao = decisao ? 'aceitar' : 'recusar';
            console.log(`[JOINORGANIZATION]: Solicitação para ${acao} usuário na organização realizada com sucesso`);
            alert(`Usuário ${decisao ? 'aceito' : 'recusado'} com sucesso!`);
            
            setSolicitantesAssociacao(prevSolicitantes => 
                prevSolicitantes.filter(solicitante => solicitante.idUsuario !== parseInt(idUsuario))
            );
        } else {
            console.log('[JOINORGANIZATION]: Falha na solicitação para processar decisão do usuário na organização');
            alert('Erro ao processar solicitação. Tente novamente.');
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            if (organizacao !== null) {
                const token = window.localStorage.getItem('token_autenticacao');
                const idOrganizacao = organizacao.idOrganizacao;
                const { url, options } = LISTAR_USUARIOS_SOLICITANTES_ASSOCIACAO_GET(idOrganizacao, token);
                const { response, json } = await request(url, options);
                if (response.ok) {
                    setSolicitantesAssociacao(json)
                    console.log(json)
                    console.log('[JOINORGANIZATION]: Solicitação de usuários que solicitaram associação realizada com sucesso');
                } else {
                    console.log('[JOINORGANIZATION]: Falha na solicitação de usuários que solicitaram associação');
                }
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organizacao])

    return <ContainerMainContent>
        {organizacao !== null ? (<>
            <ListInformations
                Title={organizacao && organizacao.nome}
                Informations={[{
                    title: 'Informações Gerais',
                    infos: [
                        {
                            subTitle: 'Sigla',
                            description: organizacao && organizacao.sigla
                        },
                        {
                            subTitle: 'Setor',
                            description: organizacao && organizacao.setor
                        },
                        {
                            subTitle: 'Site',
                            description: organizacao && organizacao.site
                        },
                        {
                            subTitle: 'Descrição',
                            description: organizacao && organizacao.descricao
                        },
                        {
                            subTitle: 'Status',
                            description: organizacao && organizacao.status
                        },
                    ]
                }
                ]} />
            {(organizacao.usuarioGerente.idUsuario === user.idUsuario) && (<>
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
                                    <Button onClick={handleClickButtonAcceptOrg} id={solicitante.idUsuario} data-decisao="true">Aceitar</Button>
                                    <Button onClick={handleClickButtonAcceptOrg} id={solicitante.idUsuario} data-decisao="false" Recused>Recusar</Button>
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
            <h1>Conectar à Organização</h1>
            <h3>Procure a sua organização pelo CNPJ</h3>
            <form style={{ display: 'flex', gap: '20px' }}>
                <Input
                    label="CNPJ"
                    type="text"
                    name="cnpj"
                    {...cnpj}
                    placeholder="Digite o CNPJ"
                    definitionMaxWidth="400px"
                />
                <Button onClick={handleClickButtonSearch}>Buscar</Button>
            </form>
            {data && <>
                <h1>Resultado</h1>
                <ListInformations
                    Title={data && data.nome}
                    Informations={[{
                        title: 'Informações Gerais',
                        infos: [
                            {
                                subTitle: 'Sigla',
                                description: data && data.sigla
                            },
                            {
                                subTitle: 'Setor',
                                description: data && data.setor
                            },
                            {
                                subTitle: 'Site',
                                description: data && data.site
                            },
                            {
                                subTitle: 'Descrição',
                                description: data && data.descricao
                            },
                        ]
                    }
                    ]}
                />
                <Button editStyle={{ alignSelf: 'flex-start' }} onClick={handleClickButtonRequest}>Solicitar Conexão</Button>
            </>}
            <h2 style={{ borderTop: '1px solid black', paddingTop: '20px' }}>Sua organização ainda não está cadastrada?</h2>
            <Button editStyle={{ alignSelf: 'flex-start' }} onClick={handleClickButtonModal}>Solicitar Cadastro</Button>
            <Modal SetModal={setModal} View={modal}>
                <FormRegisterOrganization editStyle={{ overflowY: 'scroll', width: '1000px', maxHeight: '700px' }} modal />
            </Modal>
        </>)
        }
    </ContainerMainContent>
}

export default JoinOrganization;