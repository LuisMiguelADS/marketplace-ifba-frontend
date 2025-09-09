import React from 'react';
import styled from 'styled-components';
import Button from './Forms/Button';
import ButtonClosedModel from './ButtonClosedModel';

const StyledModal = styled.div`
    height: 100%;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.665);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    padding: 0px 20px;

    @media (max-width: 600px) {
        padding: 50px 10px 20px;
    }
`

const ContainerCancelPropagClick = styled.div`
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

    @media (max-width: 1040px) {
        width: calc(100vw - 60px);
        margin: 0 20px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const DivEffect = styled.div`
    animation: left 1s ease;

    @media (max-width: 1040px) {
        min-width: calc(100vw - 100px);
    }

    @keyframes left {
      0% {
        transform: translateY(-100px);
      }
      100% {
        transform: translateY(0px);
      }
    }
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
            <DivEffect >{props.children}</DivEffect>
        </ContainerCancelPropagClick>
        {(props.ButtonEdit || props.ButtonRecused || props.ButtonConfirm || props.ButtonCreate || props.ButtonCanceled || props.ButtonOffer || props.ButtonApprove || props.ButtonDeliver) && (
            <ContainerButtons>
                {props.ButtonEdit && <Button Edited onClick={props.onButtonEditClick}>Editar</Button>}
                {props.ButtonRecused && <Button Recused onClick={props.onButtonRecusedClick}>Excluir</Button>}
                {props.ButtonCanceled && <Button Recused onClick={props.onButtonCanceledClick}>Cancelar</Button>}
                {props.ButtonConfirm && <Button onClick={props.onButtonConfirmClick}>Aceitar</Button>}
                {props.ButtonCreate && <Button onClick={props.onButtonCreateClick}>Criar</Button>}
                {props.ButtonOffer && <Button Edited onClick={props.onButtonOfferClick}>Enviar Oferta</Button>}
                {props.ButtonApprove && <Button onClick={props.onButtonApproveClick}>Aprovar</Button>}
                {props.ButtonDeliver && <Button onClick={props.onButtonDeliverClick}>Entregar</Button>}
            </ContainerButtons>)}
    </StyledModal>
};

export default Modal;