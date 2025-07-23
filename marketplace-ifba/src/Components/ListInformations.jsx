import React from 'react';
import styled from 'styled-components';
import Information from './Information';

const Container = styled.div`
    min-width: 340px;
    max-width: 1000px;
    position: relative;
    background-color: #D6FFDE;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: var(--standard-border);
    box-shadow: 0 0 5px 1px #018d1b40;
    height: fit-content;
    ${props => props.editStyle}

    ${props => props.modal && `
        height: fit-content;
        overflow-y: auto;
        overflow-x: hidden;

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
    `}
`



const ListInformations = (props) => {
    return <Container style={props.editStyle} modal={props.modal}>
        <h1>{props.Title}</h1>
        {
            props.Informations.map((info, index) => (
                <Information key={index} Title={info.title} Informations={info.infos} Tags={info.tags} />
            ))
        }
    </Container >
}

export default ListInformations;