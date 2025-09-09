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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: black;
    padding: 0 20px;
`

const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: black;
    cursor: pointer;
    padding: 10px;
    
    @media (max-width: 1000px) {
        display: block;
    }
    
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
`

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`

const Header = ({ onMenuToggle }) => {
    return (
        <StyledHeader>
            <MenuButton onClick={onMenuToggle}>
                <i className="pi pi-bars"></i>
            </MenuButton>
            <HeaderContent>
                <InfoPerfil FotoPerfil={fotoPerfil}></InfoPerfil>
            </HeaderContent>
        </StyledHeader>
    )
}

export default Header;