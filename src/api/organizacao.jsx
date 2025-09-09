export const API_URL = '/api';

export function ORGANIZACAO_CNPJ_GET(cnpj, token) {
    return {
        url: API_URL + '/organizacoes?cnpj=' + cnpj,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function ORGANIZACAO_ID_GET(id, token) {
    return {
        url: API_URL + '/organizacoes/' + id,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function LISTAR_USUARIOS_SOLICITANTES_ASSOCIACAO_GET(idOrg, token) {
    return {
        url: API_URL + '/organizacoes/solicitantes-associacao/' + idOrg,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        },
    };
}

export function REGISTER_ORGANIZATION_POST(body, token) {
    return {
        url: API_URL + '/organizacoes',
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