import React from 'react';
import styled from 'styled-components';
import logo from '../assets//logo_ifba.png';
import FormRegister from '../Components/FormRegister';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    background-color: #018e1b;
    height: 100%;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
`

const ContainerImg = styled.div`
    width: 500px;
    height: 600px;
    background-color: #01420C;
    border-radius: 5px 0px 0px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Img = styled.img`
    width: 400px;
    height: 400px;
`

const ContainerForm = styled.div`
    width: 500px;
    height: 600px;
    background-color: white;
    border-radius: 0px 5px 5px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 60px 0px;
`

const ContainerRegister = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`

const SpanButtonRegister = styled.div`
    text-decoration: underline;
    cursor: pointer;
    background-color: #01420C;
    color: white;
    padding: 5px;
    border-radius: var(--standard-border);
    letter-spacing: 1px;

    &:hover, &:focus {
      outline: none;
      background: #018e1b;
      box-shadow: 0 0 0 1px #018e1b, 0 0 0 2px #025911;
    }
`

const Register = () => {
    const navigate = useNavigate();

    const handleClickButtonRegister = () => {
        navigate("/login")
    }

    return <Container>
        <ContainerImg>
            <Img src={logo} alt="Logo IFBA" />
        </ContainerImg>
        <ContainerForm>
            <FormRegister />
            <ContainerRegister>
                <p>Já possui uma conta?</p>
                <SpanButtonRegister onClick={handleClickButtonRegister}>Entrar</SpanButtonRegister>
            </ContainerRegister>
        </ContainerForm>
    </Container>
}

export default Register;