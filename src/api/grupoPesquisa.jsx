export const API_URL = 'http://3.87.102.125:8080';

export function GRUPO_PESQUISA_ID_GET(id, token) {
    return {
        url: API_URL + '/grupos-pesquisa/' + id,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function GRUPO_PESQUISA_NOME_GET(nome, token) {
    return {
        url: API_URL + '/grupos-pesquisa/nome/' + nome,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function LISTAR_USUARIOS_SOLICITANTES_ASSOCIACAO_GRUPO_PESQUISA_GET(idGrupoPesquisa, token) {
    return {
        url: API_URL + '/grupos-pesquisa/solicitantes-associacao/' + idGrupoPesquisa,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        },
    };
}

export function LISTAR_GRUPOS_PESQUISA_GET(token) {
    return {
        url: API_URL + '/grupos-pesquisa',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function REGISTER_GROUP_REQUESTER_POST(body, token) {
    return {
        url: API_URL + '/grupos-pesquisa',
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

export function REMOVER_DEMANDA_GRUPO_PESQUISA_POST(body, token) {
    return {
        url: API_URL + '/grupos-pesquisa/remover-demanda',
        options: {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        },
    };
}