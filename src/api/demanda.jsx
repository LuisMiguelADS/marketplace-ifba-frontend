export const API_URL = 'http://3.87.102.125:8080';

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

export function LISTAR_DEMANDAS_VIA_ORGANIZACAO_GET(idOrganizacao, token) {
    return {
        url: API_URL + '/demandas/organizacao/' + idOrganizacao,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function LISTAR_DEMANDAS_APROVADAS_GET(token) {
    return {
        url: API_URL + '/demandas/aprovadas',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function REGISTER_DEMAND_POST(body, token) {
    return {
        url: API_URL + '/demandas',
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

export function DEMANDA_ID_GET(id, token) {
    return {
        url: API_URL + '/demandas/' + id,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function ENVIAR_DEMANDA_GRUPO_POST(body, token) {
    return {
        url: API_URL + '/demandas/enviar-grupo',
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

export function LISTAR_DEMANDAS_RECEBIDAS_GRUPO_PESQUISA_GET(idGrupoPesquisa, token) {
    return {
        url: API_URL + '/grupos-pesquisa/demandas/' + idGrupoPesquisa,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function APROVAR_REPROVAR_DEMANDA_POST(body, token) {
    return {
        url: API_URL + '/demandas/aprovar-reprovar',
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

export function VISUALIZAR_DEMANDA_POST(idDemanda, token) {
    return {
        url: API_URL + '/demandas/visualizacao/' + idDemanda,
        options: {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}