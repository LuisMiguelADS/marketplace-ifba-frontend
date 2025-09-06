import React from 'react';
import styled from 'styled-components';

const ContainerAviso = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #646363;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
`;

const TextoAviso = ({ children, ...props }) => {
    return (
        <ContainerAviso {...props}>
            <p>{children}</p>
        </ContainerAviso>
    );
};

export default TextoAviso;