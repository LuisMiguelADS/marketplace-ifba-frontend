import React from 'react';
import styled from 'styled-components';
import Input from './Forms/Input';
import useForm from '../Hooks/useForm';
import Button from './Forms/Button';
import { UserContext } from './UserContext';

const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 400px;
    padding: 20px;
`
const FormLogin = () => {
    const email = useForm('email');
    const password = useForm();

    const { userLogin, error, loading } = React.useContext(UserContext);

    async function handleSubmit(event) {
        event.preventDefault();
        const emailIsValid = email.validate();
        const senhaIsValid = password.validate();

        if (emailIsValid && senhaIsValid) {
            userLogin(email.value, password.value);
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Input
                label="Email"
                type="email"
                name="email"
                {...email}
                placeholder="Digite seu email"
                definitionMaxWidth="100%"
            />
            <Input
                label="Senha"
                type="password"
                name="password"
                {...password}
                placeholder="Digite sua senha"
                definitionMaxWidth="100%"
            />
            {loading ? <Button>Carregando</Button> : <Button>Entrar</Button>}
            {error && <p style={{ color: '#ff0404', marginTop: '350px', position: 'absolute' }}>Erro ao efetuar login!</p>}
        </Container>
    );
};

export default FormLogin;