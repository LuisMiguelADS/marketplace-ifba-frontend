import React from 'react';
import styled from 'styled-components';
import Information from './Information';
import Button from './Forms/Button';

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

    @media (max-width: 1000px) {
        width: calc(100vw - 40px);
        padding: 20px 10px 10px 10px;
    }

    @media (max-width: 600px) {
        width: calc(100vw - 20px);
        padding: 10px 5px 5px 5px;
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
            min-width: 340px;
            padding: 15px;
        }

        @media (max-width: 600px) {
            max-width: calc(100vw - 20px);
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
        {(props.ButtonRecused || props.ButtonEdit || props.ButtonSucess) && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                    props.ButtonRecused && (
                        <Button Recused>{props.ButtonRecused}</Button>
                    )
                }

                {
                    props.ButtonEdit && (
                        <Button Edited>{props.ButtonEdit}</Button>
                    )
                }

                {
                    props.ButtonSucess && (
                        <Button>{props.ButtonSucess}</Button>
                    )
                }
            </div>
        )}
    </Container >
}

export default ListInformations;