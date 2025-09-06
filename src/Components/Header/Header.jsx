import React from 'react'
import styled from 'styled-components';
import fotoPerfil from '../../assets/img-perfil.png';
import InfoPerfil from './InfoPerfil';
import { UserContext } from '../UserContext';

const StyledHeader = styled.header`
    background-color: #65C274;
    height: 100px;
    width: 100%;
    position: fixed;
    z-index: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: black;
`

const Header = () => {
    return (
        <StyledHeader>
            <InfoPerfil FotoPerfil={fotoPerfil}></InfoPerfil>
        </StyledHeader>
    )
}

export default Header;