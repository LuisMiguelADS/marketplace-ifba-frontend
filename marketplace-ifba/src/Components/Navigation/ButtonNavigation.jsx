import React from 'react'
import styled from 'styled-components';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';

const Icon = styled.i`
    color: #29AF33;
    font-size: 2rem;
    margin-left: 20px;
`


const ButtonNav = styled.button`
    display: flex;
    align-items: center;
    width: 270px;
    height: 70px;
    border-radius: 15px;
    background-color: #025911;
    border: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
        background-color: #018e1b;
        margin-left: 10px;
        ${Icon} {
            color: #00420C;
        }
    }
`

const TitleButton = styled.h1`
    color: white;
    margin-left: 20px;
`

const ButtonNavigation = (props) => {
    return (
        <Link to={props.Caminho} style={{ textDecoration: 'none' }}>
            <ButtonNav>
                <Icon className={props.Icon} />
                <TitleButton>{props.children}</TitleButton>
            </ButtonNav>
        </Link>
    )
}

export default ButtonNavigation;