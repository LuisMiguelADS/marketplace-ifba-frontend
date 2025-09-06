export const API_URL = 'http://localhost:8080';

// Funções para instituições - estrutura base para futuras implementações
export function INSTITUICAO_ID_GET(id, token) {
    return {
        url: API_URL + '/instituicoes/' + id,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function TODAS_INSTITUICOES_GET(token) {
    return {
        url: API_URL + '/instituicoes',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function REGISTER_INSTITUICAO_POST(body, token) {
    return {
        url: API_URL + '/instituicoes',
        options: {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        },
    };
}