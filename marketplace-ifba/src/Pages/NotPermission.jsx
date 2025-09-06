import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99999;
    color: black;
    background-color: #65c27593;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 0px;
`

const BtnLoginCadastro = styled.div`
  display: flex;
  gap: 1rem;
`

const NotPermission = () => {
    return <Container>
        <Header>

        </Header>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            textAlign: 'center',
            p: 3
        }}>
            <Typography variant="h1" fontWeight="bolder" component="h1" gutterBottom color='red'>
                Sem Permissão
            </Typography>
            <p>
                Você não tem permissão para acessar está página
            </p>
        </Box>
    </Container>
}

export default NotPermission;