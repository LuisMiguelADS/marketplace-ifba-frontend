import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    grid-column: 2;
    grid-row: 2;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
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
`

const ContainerMainContent = ({ children }) => {
    return <Container>
        {children}
    </Container>
}

export default ContainerMainContent;