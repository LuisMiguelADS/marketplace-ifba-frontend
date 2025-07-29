export const API_URL = 'http://localhost:8080';

export function LOGIN_POST(body) {
    return {
        url: API_URL + '/auth/login',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    };
}

export function REGISTER_POST(body) {
    return {
        url: API_URL + '/auth/register',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    };
}

export function USER_VIA_TOKEN_GET(token) {
    return {
        url: API_URL + '/users/token/' + token,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}


export function TODAS_DEMANDAS_GET(token) {
    return {
        url: API_URL + '/demandas',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

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
