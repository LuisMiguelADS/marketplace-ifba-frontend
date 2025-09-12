import React from 'react';
import styled from 'styled-components';
import Information from './Information';

const Container = styled.div`
    width: 1000px;
    position: relative;
    background-color: white;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: var(--standard-border);
    box-shadow: 0px 2px 8px #0000004b;
    height: fit-content;

    @media (max-width: 1380px) {
        max-width: 100%;
        padding: 20px 20px;
    }

    @media (max-width: 600px) {
        padding: 10px 10px;
    }

    ${props => props.editStyle}

    ${props => props.modal && `
        overflow-y: auto;
        overflow-x: hidden;

        @media (min-width: 1000px) {
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
            max-width: calc(100vw - 40px);
            padding: 15px;
        }

        @media (max-height: 768px) {
            height: 80vh;
        }

        @media  (max-width: 420px) {
            height: 60vh;
        }

        @media (max-width: 600px) {
            max-width: 100%;
            padding: 20px 10px;
        }
    `}
`

const ListInformations = (props) => {

    return <Container style={props.editStyle} modal={props.modal}>
        <h1>{props.Title}</h1>
        {
            props.Informations.map((info, index) => (
                <Information key={index} Title={info.title} Informations={info.infos} Tags={info.tags} WithBackground={(index === 0) ? 'true' : 'false'} />
            ))
        }
    </Container >
}

export default ListInformations;