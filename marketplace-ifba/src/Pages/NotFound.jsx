import React from 'react';
import ContainerMainContent from '../Components/ContainerMainContent';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
    return <ContainerMainContent>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            textAlign: 'center',
            p: 3
        }}>
            <Typography variant="h1" component="h1" gutterBottom color='error'>
                404
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Página não encontrada
            </Typography>
            <p>
                O endereço que você digitou não existe
            </p>
        </Box>
    </ContainerMainContent>
}

export default NotFound;