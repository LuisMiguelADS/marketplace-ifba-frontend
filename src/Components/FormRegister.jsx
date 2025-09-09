import React from 'react';
import styled from 'styled-components';
import Input from './Forms/Input';
import useForm from '../Hooks/useForm';
import Button from './Forms/Button';
import { REGISTER_POST } from '../api/usuario';
import useFetch from '../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Select from './Forms/Select';

const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 400px;
    padding: 20px;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0px;
    }
`

const ContainerStep = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const ContainerButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const ButtonNavigationSteps = styled.button`
    width: 70px;
    height: 30px;
    border: none;
    border-radius: var(--standard-border);
    background-color: green;
    color: white;
    letter-spacing: 0.3px;
    font-size: 1rem;

    &:hover {
        cursor: pointer;
        scale: 1.07;
        border: 1px solid #018D1A;
    }
`

const FormRegister = () => {
    const name = useForm();
    const role = useForm(null);
    const email = useForm('email');
    const phone = useForm();
    const password = useForm();
    const passwordConfirm = useForm();
    const cpf = useForm();
    const dateBirth = useForm('dataMaioridade');
    const biography = useForm();
    // const imageProfileURL = useForm();
    // eslint-disable-next-line no-unused-vars
    const { request, data, error, setData, setError, setLoading, loading } = useFetch();
    const navigate = useNavigate();
    const [stepsRegister, setStepRegister] = React.useState(0);

    console.log(role.value)

    const getMaxDate = () => {
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        const year = maxDate.getFullYear();
        const month = String(maxDate.getMonth() + 1).padStart(2, '0');
        const day = String(maxDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    function handleClickStep(event) {
        event.preventDefault();
        const buttonClicked = event.target.name;
        if (buttonClicked === 'back') {
            if (stepsRegister !== 0) {
                setStepRegister(stepsRegister - 1)
            }
        } else if (buttonClicked === 'next') {
            if (stepsRegister <= 2) {
                setStepRegister(stepsRegister + 1)
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (password.value === passwordConfirm.value) {
            userRegister(
                name.value,
                role.value,
                email.value,
                phone.value,
                cpf.value,
                dateBirth.value,
                biography.value,
                password.value
            );
        } else {
            console.log('[FORMREGISTER]: Senhas diferentes');
        }
    }

    async function userRegister(nomeCompleto, role, email, telefone, cpf, dataNascimento, biografia, password) {
        let url, options;
        if (role != 'EXTERNO') {
            const result = REGISTER_POST({ nomeCompleto, role, email, telefone, password, cpf, dataNascimento, biografia, idInstituicao: '614e64ba-349a-40f3-a37a-2333449caf01' });
            url = result.url;
            options = result.options;
        } else {
            const result = REGISTER_POST({ nomeCompleto, role, email, telefone, password, cpf, dataNascimento, biografia });
            url = result.url;
            options = result.options;
        }
        const { response } = await request(url, options);
        if (response.ok) {
            navigate('/login');
            console.log('[FORMREGISTER]: Registro realizado com sucesso');
        } else {
            console.log('[FORMREGISTER]: Falha no registro');
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            <h1>Cadastro</h1>
            {stepsRegister === 0 && (
                <ContainerStep>
                    <Input
                        label="Nome completo"
                        type="text"
                        name="name"
                        {...name}
                        placeholder="Digite seu nome"
                        definitionMaxWidth="100%"
                    />
                    <Select
                        options={[{ value: 'ALUNO', label: 'Estudante' }, { value: 'PROFESSOR', label: 'Professor' }, { value: 'EXTERNO', label: 'Organização Externa' }]}
                        label="Tipo de Usuário"
                        name="role"
                        {...role}
                        optionTitle="Selecione"
                        definitionMaxWidth="100%"
                    />
                    <Input
                        label="Email"
                        type="text"
                        name="email"
                        {...email}
                        placeholder="Digite seu email"
                        definitionMaxWidth="100%"
                    />
                </ContainerStep>
            )}

            {stepsRegister === 1 && (
                <ContainerStep>
                    <Input
                        label="Telefone"
                        type="phone"
                        name="phone"
                        {...phone}
                        placeholder="Digite seu telefone"
                        definitionMaxWidth="100%"
                    />
                    <Input
                        label="CPF"
                        type="text"
                        name="cpf"
                        {...cpf}
                        placeholder="Digite seu cpf"
                        definitionMaxWidth="100%"
                    />
                    <Input
                        label="Data de Nascimento"
                        type="date"
                        name="date"
                        max={getMaxDate()}
                        min="1920-01-01"
                        {...dateBirth}
                        definitionMaxWidth="100%"
                    />

                </ContainerStep>
            )}
            {stepsRegister === 2 && (
                <ContainerStep>
                    {/* <Input
                        label="Imagem de Perfil"
                        type="file"
                        name="file"
                        {...imageProfileURL}
                        placeholder="Arquivo aqui"
                        definitionMaxWidth="100%"
                    /> */}
                    <Input
                        label="Biografia"
                        type="textarea"
                        name="biograph"
                        {...biography}
                        placeholder="Sobre você..."
                        definitionMaxWidth="100%"
                        editStyle={{ minHeight: '170px' }}
                    />
                </ContainerStep>
            )}
            {stepsRegister === 3 && (
                <ContainerStep>
                    <Input
                        label="Senha"
                        type="password"
                        name="password"
                        {...password}
                        placeholder="Digite sua senha"
                        definitionMaxWidth="100%"
                    />
                    <Input
                        label="Confirme sua Senha"
                        type="password"
                        name="passwordConfirm"
                        {...passwordConfirm}
                        placeholder="Digite sua senha novamente"
                        definitionMaxWidth="100%"
                    />
                    <Button>Cadastrar</Button>
                </ContainerStep>
            )}
            <ContainerButtons>
                {stepsRegister >= 1 ? <ButtonNavigationSteps name='back' onClick={handleClickStep}>Voltar</ButtonNavigationSteps> : <ButtonNavigationSteps disabled>Voltar</ButtonNavigationSteps>}
                {stepsRegister <= 2 ? <ButtonNavigationSteps name='next' onClick={handleClickStep}>Avançar</ButtonNavigationSteps> : <ButtonNavigationSteps disabled>Avançar</ButtonNavigationSteps>}
            </ContainerButtons>
            {error && <p style={{ color: '#ff0404', marginTop: '10px' }}>Erro ao realizar cadastro!</p>}
        </Container>
    );
};

export default FormRegister;