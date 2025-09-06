import React from 'react';
import styled from 'styled-components';

const StyledContainerCards = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
    align-items: center;
    margin-right: 60px;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 25px 20px 10px 20px;
    min-height: 280px;
    background-color: #F0F0F0;
    border-radius: var(--standard-border);
    box-shadow: 0 4px 4px 0px #0000001b;
`;

const ContainerCards = ({ children, ...props }) => {
    return (
        <StyledContainerCards {...props}>
            {children}
        </StyledContainerCards>
    );
};

export default ContainerCards;