import React from 'react';
import styled from 'styled-components';
import ButtonClosedModel from './ButtonClosedModel';

const StyledForm = styled.form`
    width: 100%;
    max-width: ${props => props.maxWidth || '1000px'};
    background-color: ${props => props.backgroundColor || '#E3F4E3'};
    padding: 20px;
    border-radius: var(--standard-border);
    box-shadow: 0 0 5px 1px #018d1b40;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    margin-top: ${props => props.marginTop || '0px'};

    @media (max-width: 600px) {
        padding: 20px 10px;
    }

    ${props => props.modal && `
        height: fit-content;
        overflow-y: auto;
        overflow-x: hidden;

        @media (min-width: 1041px) {
            &::-webkit-scrollbar {
                width: 20px;
                background-color: #01420c;
            }

            &::-webkit-scrollbar-thumb {
                height: 60px;
                background-color: #018e1b;
                border-radius: 5px;
                border: 2px solid #00420C;
            }
        }

        @media (max-width: 1040px) {
            overflow-y: visible;
            max-width: calc(100vw - 60px);
        }

        @media (max-width: 600px) {
            padding: 20px 10px;
        }
    `}
`;

const DefaultForm = ({ 
    children, 
    editStyle, 
    ButtonClosedModal, 
    onClick, 
    onSubmit,
    backgroundColor,
    width,
    maxWidth,
    marginTop,
    ...props 
}) => {
    return (
        <StyledForm 
            style={editStyle} 
            onSubmit={onSubmit}
            backgroundColor={backgroundColor}
            width={width}
            maxWidth={maxWidth}
            marginTop={marginTop}
            {...props}
        >
            {ButtonClosedModal === "yes" && (
                <ButtonClosedModel onClick={onClick} className="pi pi-times" />
            )}
            {children}
        </StyledForm>
    );
};

export default DefaultForm;