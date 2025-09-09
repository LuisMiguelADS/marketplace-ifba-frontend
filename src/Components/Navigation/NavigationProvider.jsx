import React, { useState, useEffect } from 'react';
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
    transition: transform 0.3s ease;
    
    @media (max-width: 1000px) {
        transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
        z-index: 1000;
        box-shadow: ${props => props.$isOpen ? '2px 0 10px rgba(0,0,0,0.3)' : 'none'};
    }
`

const Overlay = styled.div`
    display: none;
    
    @media (max-width: 1000px) {
        display: ${props => props.$isOpen ? 'block' : 'none'};
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
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

const NavigationProvider = ({ isMenuOpen, setIsMenuOpen }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleMenuItemClick = () => {
        if (isMobile && setIsMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <Overlay $isOpen={isMenuOpen} onClick={() => setIsMenuOpen && setIsMenuOpen(false)} />
            <NavigationLeft $isOpen={isMenuOpen}>
                <Link to="/provider" style={{ textDecoration: 'none' }}>
                    <TopNavigation>
                        <Logo src={logo} />
                        <NameLogo>Marketplace</NameLogo>
                    </TopNavigation>
                </Link>
                <div onClick={handleMenuItemClick}>
                    <ButtonNavigation Icon='pi pi-chart-pie' Caminho="/provider/overview">Visão Geral</ButtonNavigation>
                </div>
                <div onClick={handleMenuItemClick}>
                    <ButtonNavigation Icon='pi pi-file-edit' Caminho="/provider/offers-solutions">Ofertas</ButtonNavigation>
                </div>
                <div onClick={handleMenuItemClick}>
                    <ButtonNavigation Icon='pi pi-file-import' Caminho="/provider/demands">Demandas</ButtonNavigation>
                </div>
                <div onClick={handleMenuItemClick}>
                    <ButtonNavigation Icon='pi pi-file-check' Caminho="/provider/projects">Projetos</ButtonNavigation>
                </div>
                <div onClick={handleMenuItemClick}>
                    <ButtonNavigation Icon='pi pi-users' Caminho="/provider/research-group">Grupo Pesquisa</ButtonNavigation>
                </div>
                <div onClick={handleMenuItemClick}>
                    <ButtonNavigation Icon='pi pi-comments' Caminho="/provider/conversations">Conversas</ButtonNavigation>
                </div>
                <div onClick={handleMenuItemClick}>
                    <ButtonNavigation Icon='pi pi-user'>Perfil</ButtonNavigation>
                </div>
            </NavigationLeft>
        </>
    );
}

export default NavigationProvider;