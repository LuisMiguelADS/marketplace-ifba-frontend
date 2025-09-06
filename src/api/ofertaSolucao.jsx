export const API_URL = 'http://localhost:8080';

export function LISTAR_OFERTAS_VIA_GRUPO_PESQUISA_GET(idGrupoPesquisa, token) {
    return {
        url: API_URL + '/ofertas-solucao/grupo-pesquisa/' + idGrupoPesquisa,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function TODAS_OFERTAS_GET(token) {
    return {
        url: API_URL + '/ofertas-solucao',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function OFERTA_SOLUCAO_ID_GET(id, token) {
    return {
        url: API_URL + '/ofertas-solucao/' + id,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function REGISTER_OFERTA_SOLUCAO_POST(body, token) {
    return {
        url: API_URL + '/ofertas-solucao',
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

export function LISTAR_OFERTAS_VIA_DEMANDA_GET(idDemanda, token) {
    return {
        url: API_URL + '/ofertas-solucao/demanda/' + idDemanda,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function APROVAR_REPROVAR_OFERTA_SOLUCAO_POST(body, token) {
    return {
        url: API_URL + '/ofertas-solucao/aprovar-reprovar',
        options: {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        },
    };
}

export function LISTAR_OFERTAS_APROVADAS_GET(idOrganizacao, token) {
    return {
        url: API_URL + '/ofertas-solucao/aprovadas/' + idOrganizacao,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}