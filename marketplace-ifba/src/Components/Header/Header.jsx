import React from 'react'
import styled from 'styled-components';
import fotoPerfil from '../../assets/img-perfil.png';
import InfoPerfil from './InfoPerfil';

const StyledHeader = styled.header`
    background-color: #018D1A;
    height: 100px;
    width: 100%;
    position: fixed;
    z-index: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Header = () => {
    return (
        <StyledHeader>
            <InfoPerfil NameUserLogged="Integrante 1" OrgOrEnterprise="Empresa FIC" FotoPerfil={fotoPerfil}></InfoPerfil>
        </StyledHeader>
    )
}

export default Header;