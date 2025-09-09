import React from 'react';
import useForm from '../Hooks/useForm';
import useFetch from '../Hooks/useFetch';
import Input from './Forms/Input';
import styled from 'styled-components';
import Button from './Forms/Button';
import { UserContext } from './UserContext';
import { CRIAR_ENTREGA_POST, EDITAR_ENTREGA_PATCH } from '../api/projeto';
import DefaultForm from './DefaultForm';

const SubTitleForm = styled.h2`
    font-size: 1.5rem;
`

const Container = styled.div`
    width: 1000px;
    background-color: #D6FFDE;
    padding: 30px;
    border-radius: var(--standard-border);
`

const NewDeliveryForm = ({ editStyle, idProjeto, onSuccess, onClose, entregaData = null, isEditing = false }) => {
    const titleDemand = useForm();
    const term = useForm();
    const description = useForm();
    const { request, loading, error } = useFetch();
    const { user, organizacao, grupoPesquisa } = React.useContext(UserContext);


    React.useEffect(() => {
        if (isEditing && entregaData) {
            titleDemand.setValue(entregaData.titulo || '');
            description.setValue(entregaData.descricao || '');
            if (entregaData.prazoDesejado) {
                const date = new Date(entregaData.prazoDesejado);
                const formattedDate = date.toISOString().split('T')[0];
                term.setValue(formattedDate);
            }
        }
    }, [isEditing, entregaData]);

    async function handleSubmit(event) {
        event.preventDefault();


        if (!titleDemand.value.trim()) {
            alert('Título é obrigatório');
            return;
        }
        if (titleDemand.value.length > 255) {
            alert('Título deve ter no máximo 255 caracteres');
            return;
        }
        if (description.value && description.value.length > 2000) {
            alert('Descrição deve ter no máximo 2000 caracteres');
            return;
        }
        if (!idProjeto) {
            alert('ID do projeto é obrigatório');
            return;
        }

        const requestData = {
            titulo: titleDemand.value,
            descricao: description.value,
            prazoDesejado: term.value,
            idProjeto: idProjeto,
            idOrganizacaoSolicitante: organizacao ? organizacao.idOrganizacao : null,
            idGrupoPesquisaSolicitante: grupoPesquisa ? grupoPesquisa.idGrupoPesquisa : null,
            idOrganizacaoSolicitada: organizacao ? organizacao.idOrganizacao : null,
            idGrupoPesquisaSolicitado: grupoPesquisa ? grupoPesquisa.idGrupoPesquisa : null,
            idUsuarioSolicitante: user ? user.idUsuario : null
        };

        try {
            const token = window.localStorage.getItem('token_autenticacao');
            const { url, options } = CRIAR_ENTREGA_POST(requestData, token);
            
            const { response, json } = await request(url, options);
            
            if (response.ok) {
                alert('Entrega criada com sucesso!');
                
                titleDemand.setValue('');
                description.setValue('');
                term.setValue('');
                
                if (onSuccess) {
                    onSuccess(json);
                }
                
                if (onClose) {
                    onClose();
                }
            } else {
                alert(json?.message || 'Erro ao criar entrega');
            }
        } catch (err) {
            alert('Erro de conexão. Tente novamente.');
            console.error('Erro ao criar entrega:', err);
        }
    }

    async function handleEditSubmit(event) {
        event.preventDefault();


        if (!titleDemand.value.trim()) {
            alert('Título é obrigatório');
            return;
        }
        if (titleDemand.value.length > 255) {
            alert('Título deve ter no máximo 255 caracteres');
            return;
        }
        if (description.value && description.value.length > 2000) {
            alert('Descrição deve ter no máximo 2000 caracteres');
            return;
        }
        if (!entregaData?.idEntrega) {
            alert('ID da entrega é obrigatório');
            return;
        }

        const requestData = {
            idEntrega: entregaData.idEntrega,
            titulo: titleDemand.value.trim(),
            descricao: description.value ? description.value.trim() : null,
            prazoDesejado: term.value ? new Date(term.value).toISOString() : null
        };

        try {
            const token = window.localStorage.getItem('token_autenticacao');
            const { url, options } = EDITAR_ENTREGA_PATCH(requestData, token);
            
            const { response, json } = await request(url, options);
            
            if (response.ok) {
                alert('Entrega editada com sucesso!');
                
                if (onSuccess) {
                    onSuccess(json);
                }
                
                if (onClose) {
                    onClose();
                }
            } else {
                alert(json?.message || 'Erro ao editar entrega');
            }
        } catch (err) {
            alert('Erro de conexão. Tente novamente.');
            console.error('Erro ao editar entrega:', err);
        }
    }

    return <Container>
        <h1>{isEditing ? 'Editar Entrega' : 'Nova Entrega'}</h1>
        <DefaultForm 
            onSubmit={isEditing ? handleEditSubmit : handleSubmit} 
            editStyle={editStyle}
            backgroundColor="#00ff2f29"
            marginTop="20px"
        >
            <SubTitleForm>Informações Básicas</SubTitleForm>
            <Input 
                label="Título" 
                type="text" 
                name="titleDemand" 
                {...titleDemand} 
                placeholder="Ex. Automatizar Processo"
                required 
            />
            <Input 
                label="Descrição" 
                type="textarea" 
                name="description" 
                {...description} 
                placeholder="Descreva os detalhes da entrega..." 
            />
            <SubTitleForm>Cronograma</SubTitleForm>
            <Input 
                label="Prazo desejado" 
                type="date" 
                name="term" 
                {...term} 
            />
            
            <Button type="submit" disabled={loading}>
                {loading ? (isEditing ? 'Salvando...' : 'Criando...') : (isEditing ? 'Salvar Alterações' : 'Criar Entrega')}
            </Button>
        </DefaultForm>
    </Container>
}

export default NewDeliveryForm;