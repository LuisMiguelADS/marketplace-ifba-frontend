import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo_ifba.png';
import ButtonNavigation from './ButtonNavigation';
import { Link } from 'react-router-dom';

const NavigationLeft = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    height: 100vh;
    background-color: #01420c;
    position: fixed;
    z-index: 10;
`

const TopNavigation = styled.div`
    display: flex;
    align-items: center;
    max-height: 150px;
    min-width: 300px;
    justify-content: space-between;
    padding: 10px;
`

const Logo = styled.img`
    max-width: 80px;
    max-height: 80px;
`

const NameLogo = styled.h1`
    font-size: 28px;
    color: white;
    margin-right: 20px;
`

const NavigationRequester = () => {
    return <NavigationLeft>
        <Link to="/requester" style={{ textDecoration: 'none' }}>
            <TopNavigation>
                <Logo src={logo} />
                <NameLogo>Marketplace</NameLogo>
            </TopNavigation>
        </Link>
        <ButtonNavigation Icon='pi pi-chart-pie' Caminho="/requester/overview">Visão Geral</ButtonNavigation>
        <ButtonNavigation Icon='pi pi-file-edit' Caminho="/requester/demands">Demandas</ButtonNavigation>
        <ButtonNavigation Icon='pi pi-file-import' Caminho="/requester/offers">Ofertas</ButtonNavigation>
        <ButtonNavigation Icon='pi pi-file-check' Caminho="/requester/projects">Projetos</ButtonNavigation>
        <ButtonNavigation Icon='pi pi-users' Caminho="/requester/research-group">Grupos Pesquisa</ButtonNavigation>
        <ButtonNavigation Icon='pi pi-comments' Caminho="/requester/conversations">Conversas</ButtonNavigation>
        <ButtonNavigation Icon='pi pi-building' Caminho="/requester/organization">Organização</ButtonNavigation>
        <ButtonNavigation Icon='pi pi-user'>Perfil</ButtonNavigation>
    </NavigationLeft>
}

export default NavigationRequester;