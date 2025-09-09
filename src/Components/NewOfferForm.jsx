import React from 'react';
import useForm from '../Hooks/useForm';
import useFetch from '../Hooks/useFetch';
import Input from './Forms/Input';
import styled from 'styled-components';
import Button from './Forms/Button';
import { UserContext } from './UserContext';
import { REGISTER_OFERTA_SOLUCAO_POST } from '../api/ofertaSolucao';
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

const NewOfferForm = ({ editStyle, demandaId, onSuccess }) => {
    const nome = useForm();
    const descricao = useForm();
    const prazo = useForm();
    const resumo = useForm();
    const tipoSolucao = useForm();
    const restricao = useForm();
    const preco = useForm();
    const recursosNecessarios = useForm();
    const { request, loading, error } = useFetch();
    const { user, organizacao, grupoPesquisa } = React.useContext(UserContext);
    const [submitError, setSubmitError] = React.useState('');
    const [submitSuccess, setSubmitSuccess] = React.useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitError('');
        setSubmitSuccess('');

        const requestData = {
            nome: nome.value.trim(),
            descricao: descricao.value.trim(),
            prazo: parseInt(prazo.value),
            resumo: resumo.value ? resumo.value.trim() : null,
            tipoSolucao: tipoSolucao.value.trim(),
            restricao: restricao.value ? restricao.value.trim() : null,
            preco: parseFloat(preco.value),
            recursosNecessarios: recursosNecessarios.value ? recursosNecessarios.value.trim() : null,
            idDemanda: demandaId,
            idGrupoPesquisa: grupoPesquisa.idGrupoPesquisa
        };

        const token = window.localStorage.getItem('token_autenticacao');
        const { url, options } = REGISTER_OFERTA_SOLUCAO_POST(requestData, token);
        
        const { json, response } = await request(url, options);
        
        if (response && response.ok) {
            setSubmitSuccess('Oferta enviada com sucesso!');
            
            nome.setValue('');
            descricao.setValue('');
            prazo.setValue('');
            resumo.setValue('');
            tipoSolucao.setValue('');
            restricao.setValue('');
            preco.setValue('');
            recursosNecessarios.setValue('');
            
            if (onSuccess) {
                onSuccess(json);
            }
        } else {
            setSubmitError(json?.message || error || 'Erro ao enviar oferta');
        }
    }

    return <Container>
        <h1>Enviar Oferta de Solução</h1>
        <DefaultForm 
            onSubmit={handleSubmit} 
            editStyle={editStyle}
            backgroundColor="#00ff2f29"
            marginTop="20px"
        >
            <SubTitleForm>Informações da Solução</SubTitleForm>
            <Input 
                label="Nome da Solução" 
                type="text" 
                name="nome" 
                {...nome} 
                placeholder="Ex. Sistema de Gestão"
                required 
            />
            <Input 
                label="Descrição" 
                type="textarea" 
                name="descricao" 
                {...descricao} 
                placeholder="Descreva detalhadamente a solução proposta..." 
                required
            />
            <Input 
                label="Resumo" 
                type="textarea" 
                name="resumo" 
                {...resumo} 
                placeholder="Resumo da solução..." 
            />
            <Input 
                label="Tipo da Solução" 
                type="text" 
                name="tipoSolucao" 
                {...tipoSolucao} 
                placeholder="Ex. Software, Hardware, Consultoria"
                required 
            />
            <Input 
                label="Restrições" 
                type="textarea" 
                name="restricao" 
                {...restricao} 
                placeholder="Descreva as restrições da solução..." 
            />
            <Input 
                label="Recursos Necessários" 
                type="textarea" 
                name="recursosNecessarios" 
                {...recursosNecessarios} 
                placeholder="Descreva os recursos necessários..." 
            />
            
            <SubTitleForm>Cronograma e Valores</SubTitleForm>
            <Input 
                label="Prazo (em dias)" 
                type="number" 
                name="prazo" 
                {...prazo} 
                placeholder="Ex. 30"
                min="1"
                required 
            />
            <Input 
                label="Preço (R$)" 
                type="number" 
                name="preco" 
                {...preco} 
                placeholder="Ex. 5000.00"
                step="0.01"
                min="0.01"
                required 
            />
            
            {submitError && (
                <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '5px' }}>
                    {submitError}
                </div>
            )}
            
            {submitSuccess && (
                <div style={{ color: 'green', padding: '10px', backgroundColor: '#e6ffe6', borderRadius: '5px' }}>
                    {submitSuccess}
                </div>
            )}
            
            <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Oferta'}
            </Button>
        </DefaultForm>
    </Container>
}

export default NewOfferForm;