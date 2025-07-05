import React from 'react';
import styled from 'styled-components';
import Button from './Forms/Button';
import ButtonClosedModel from './ButtonClosedModel';

const StyledModal = styled.div`
    height: 100%;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
`

const ContainerCancelPropagClick = styled.div`
    min-height: 0px;
    min-width: 0px;
    display: flex;
    justify-content: center;
    padding: 20px;
    z-index: 1;
    margin-top: -55px;
`

const ContainerButtons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 1000px;
    z-index: 2;
    position: relative;
`

const Modal = (props) => {
    if (!props.View) {
        return null;
    }

    const handleOverlayClick = () => {
        props.SetModal(false);
    };

    const handleContentClick = (event) => {
        event.stopPropagation();
    };

    return <StyledModal onClick={handleOverlayClick}>
        <ContainerButtons style={{ justifyContent: 'flex-end', marginRight: '-30px' }}>
            <ButtonClosedModel onClick={handleOverlayClick} className="pi pi-times" />
        </ContainerButtons>
        <ContainerCancelPropagClick onClick={handleContentClick}>
            {props.children}
        </ContainerCancelPropagClick>
        {(props.ButtonEdit || props.ButtonRecused) && (
            <ContainerButtons>
                {props.ButtonEdit && <Button Edited>Editar</Button>}
                {props.ButtonRecused && <Button Recused>Excluir</Button>}
                {props.ButtonConfirm && <Button>
                    Aceitar</Button>}
            </ContainerButtons>)}
    </StyledModal>
};

export default Modal;