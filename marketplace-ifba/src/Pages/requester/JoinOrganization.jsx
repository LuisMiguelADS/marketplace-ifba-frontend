import React, { useEffect } from 'react';
import styled from 'styled-components';
import ContainerMainContent from '../../Components/ContainerMainContent';
import Input from '../../Components/Forms/Input';
import useForm from '../../Hooks/useForm';
import { ORGANIZACAO_CNPJ_GET, ORGANIZACAO_ID_GET } from '../../Components/api';
import useFetch from '../../Hooks/useFetch';
import Button from '../../Components/Forms/Button';
import ListInformations from '../../Components/ListInformations';
import { UserContext } from '../../Components/UserContext';


const JoinOrganization = () => {
    const cnpj = useForm();
    const { user, organizacao } = React.useContext(UserContext);
    // eslint-disable-next-line no-unused-vars
    const { request, data, error, setData, setError, setLoading, loading } = useFetch();

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

    return <ContainerMainContent>
        {organizacao !== null ? (
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
                    ]
                }
                ]} />
        ) : (<>
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
                <h1>Resultado </h1>
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
                <Button editStyle={{ alignSelf: 'flex-start' }}>Solicitar Conexão</Button>
            </>
            }
        </>)
        }
    </ContainerMainContent>
}

export default JoinOrganization;