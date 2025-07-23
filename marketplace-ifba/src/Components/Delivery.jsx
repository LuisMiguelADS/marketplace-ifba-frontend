import React from 'react';
import styled from 'styled-components';
import ListInformations from './ListInformations';

const Container = styled.div`
    width: 1000px;
    background-color: #D6FFDE;
    padding: 30px;
    border-radius: var(--standard-border);
`
const Delivery = (props) => {
    return <Container>
        <ListInformations Title={props.Title} Informations={props.Informations} />
    </Container>
}

export default Delivery;