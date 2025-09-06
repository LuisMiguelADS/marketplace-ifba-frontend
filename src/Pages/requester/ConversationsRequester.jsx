import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from '../../Components/ContainerMainContent';
import Card from '../../Components/Card';
import Chat from '../../Components/Chat';
import Modal from '../../Components/Modal';
import { UserContext } from '../../Components/UserContext';
import useFetch from '../../Hooks/useFetch';
import { TODOS_PROJETOS_GET } from '../../api/projeto';
import { CHAT_GET } from '../../api/chat';
import TextoAviso from '../../Components/TextoAviso';
import ContainerCards from '../../Components/ContainerCards';

const ConversationsRequester = () => {
    const [modal, setModal] = React.useState(false);
    const [projetos, setProjetos] = React.useState([]);
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [chatMessages, setChatMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { request } = useFetch();
    const { organizacao, user } = React.useContext(UserContext);
    const intervalRef = React.useRef(null);

    React.useEffect(() => {
        async function fetchProjetos() {
            if (!organizacao) return;
            
            const token = window.localStorage.getItem('token_autenticacao');
            if (token) {
                try {
                    const { url, options } = TODOS_PROJETOS_GET(token);
                    const { response, json } = await request(url, options);
                    if (response && response.ok) {
                        const projetosFiltrados = json.filter(projeto => 
                            projeto.organizacao?.idOrganizacao === organizacao.idOrganizacao
                        );
                        setProjetos(projetosFiltrados);
                        console.log('[CONVERSATIONSREQUESTER]: Sucesso na busca por projetos');
                    } else {
                        console.log('[CONVERSATIONSREQUESTER]: Falha na busca por projetos');
                    }
                } catch (error) {
                    console.error('[CONVERSATIONSREQUESTER]: Erro ao buscar projetos:', error);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchProjetos();
    }, [organizacao, request]);

    React.useEffect(() => {
        if (modal && selectedProject && selectedProject.idChat) {
            intervalRef.current = setInterval(() => {
                fetchChatMessages(selectedProject.idChat);
            }, 5000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [modal, selectedProject]);

    async function fetchChatMessages(chatId) {
        const token = window.localStorage.getItem('token_autenticacao');
        if (token && chatId) {
            try {
                const { url, options } = CHAT_GET(chatId, token);
                const { response, json } = await request(url, options);
                if (response && response.ok) {
                    setChatMessages(json.mensagens || []);
                    console.log('[CONVERSATIONSREQUESTER]: Sucesso na busca por chat');
                } else {
                    console.log('[CONVERSATIONSREQUESTER]: Falha na busca por chat');
                    setChatMessages([]);
                }
            } catch (error) {
                console.error('[CONVERSATIONSREQUESTER]: Erro ao buscar chat:', error);
                setChatMessages([]);
            }
        }
    }

    function handleClickModal(event, projeto = null) {
        event.preventDefault();
        if (projeto && projeto.idChat) {
            setSelectedProject(projeto);
            fetchChatMessages(projeto.idChat);
        }
        setModal(!modal);
    }

    if (loading) {
        return (
            <ContainerMainContent>
                <h1>Conversas</h1>
                <p>Carregando projetos...</p>
            </ContainerMainContent>
        );
    }

    return <ContainerMainContent>
        <h1>Conversas</h1>
        <ContainerCards>
            {projetos.length > 0 ? (
                projetos.map(projeto => {
                    const infos = [
                        `Grupo: ${projeto.grupoPesquisa?.nome || 'Não informado'}`,
                        `Instituição: ${projeto.grupoPesquisa?.instituicao?.nome || 'Não informado'}`,
                        `Organização: ${projeto.organizacao?.nome || 'Não informado'}`
                    ];
                    const status = projeto.idChat ? 'Chat disponível' : 'Sem chat';
                    return (
                        <Card 
                            key={projeto.idProjeto}
                            IconContainer="pi pi-users" 
                            Title={projeto.nome || 'Projeto sem nome'} 
                            Infos={infos} 
                            Status={status} 
                            onClick={(event) => handleClickModal(event, projeto)} 
                        />
                    );
                })
            ) : (
                <TextoAviso>Nenhum conversa encontrada</TextoAviso>
            )}
        </ContainerCards>
        {(modal && selectedProject) && <Modal SetModal={setModal} View={modal}>
            <Chat 
                Title={selectedProject.nome || 'Projeto sem nome'} 
                ChatId={selectedProject.idChat}
                Messages={chatMessages.map(msg => ({
                    user: {
                        img_perfil: msg.usuario?.fotoPerfil || '',
                        name: msg.usuarioEscritor?.nomeCompleto || 'Usuário desconhecido'
                    },
                    message: msg.mensagem || '',
                    dateTime: msg.dataHora ? new Date(msg.dataHora).toLocaleString('pt-BR') : ''
                })) || []} 
                onMessageSent={() => fetchChatMessages(selectedProject.idChat)}
                Nome={user.nomeCompleto}
            /> 
        </Modal>}

    </ContainerMainContent>
}

export default ConversationsRequester;