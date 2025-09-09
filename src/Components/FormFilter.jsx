import React from 'react';
import styled from 'styled-components';
import Button from './Forms/Button';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    border-radius: var(--standard-border);
    padding: 20px;
    gap: 20px;
    width: fit-content;
    box-shadow: 0px 2px 8px #0000004b;

    @media (max-width: 410px) {
        width: 100%;
    }
`

const ContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const ContainerFields = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
`
const ResponsiveButton = styled(Button)`
    @media (max-width: 410px) {
        padding: 0px !important;
        font-size: 30px !important;
        font-weight: bold !important;
        min-width: 100px;

        span {
            display: none;
        }
        
        &::after {
            content: '×';
        }
    }
`;

const FormFilter = ({ Title, children, onClearFilters }) => {
    function handleClearFilters(event) {
        event.preventDefault();
        if (onClearFilters) {
            onClearFilters();
        }
    }

    return <Form>
        <ContainerHeader>
            <h2>{Title}</h2>
            {onClearFilters && (
                <ResponsiveButton 
                    editStyle={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                    onClick={handleClearFilters}
                >
                    <span>Limpar Filtros</span>
                </ResponsiveButton>
            )}
        </ContainerHeader>
        <ContainerFields>
            {children}
        </ContainerFields>
    </Form>
}

export default FormFilter;