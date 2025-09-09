import React from 'react';
import styled from 'styled-components';
import logo from '../assets//logo_ifba.png';
import FormLogin from '../Components/FormLogin';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    background-color: #018e1b;
    height: 100vh;
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

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 20px;
    }
`

const ContainerImg = styled.div`
    width: 500px;
    height: 600px;
    background-color: #01420C;
    border-radius: 5px 0px 0px 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        display: none;
    }
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
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 400px;
        height: auto;
        border-radius: 5px;
        padding: 20px;
        position: relative;
    }
`

const ContainerLogin = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin-top: 100px;
`

const SpanButtonLogin = styled.div`
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

const MobileLogo = styled.div`
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #01420C;
        padding: 20px;
        border-radius: 5px;
        margin-bottom: 20px;
        
        img {
            width: 80px;
            height: 80px;
        }
    }
`

const Login = () => {
    const navigate = useNavigate();

    const handleClickButtonRegister = () => {
        navigate("/register")
    }

    return <Container>
        <ContainerImg>
            <Img src={logo} alt="Logo IFBA" />
        </ContainerImg>
        <ContainerForm>
            <MobileLogo>
                <img src={logo} alt="Logo IFBA" />
            </MobileLogo>
            <FormLogin />
            <ContainerLogin>
                <p>Não possui uma conta?</p>
                <SpanButtonLogin onClick={handleClickButtonRegister}>Cadastra-se</SpanButtonLogin>
            </ContainerLogin>
        </ContainerForm>
    </Container>
}

export default Login;