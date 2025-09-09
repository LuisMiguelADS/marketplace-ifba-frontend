export const API_URL = 'http://3.87.102.125:8080';

export function TODOS_PROJETOS_GET(token) {
    return {
        url: API_URL + '/projetos',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function PROJETO_ID_GET(id, token) {
    return {
        url: API_URL + '/projetos/' + id,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function REGISTER_PROJETO_POST(body, token) {
    return {
        url: API_URL + '/projetos',
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

export function PROJETOS_VIA_USUARIO_GET(idUsuario, token) {
    return {
        url: API_URL + '/projetos/usuario/' + idUsuario,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function ENTREGAS_PROJETO_GET(idProjeto, token) {
    return {
        url: API_URL + '/projetos/entregas/' + idProjeto,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function CRIAR_ENTREGA_POST(body, token) {
    return {
        url: API_URL + '/projetos/entregas',
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

export function CANCELAR_ENTREGA_PATCH(idEntrega, token) {
    return {
        url: API_URL + '/projetos/entregas/cancelar/' + idEntrega,
        options: {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function EDITAR_ENTREGA_PATCH(body, token) {
    return {
        url: API_URL + '/projetos/entregas',

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

export function ENTREGAR_ENTREGA_PUT(idEntrega, token) {
    return {
        url: API_URL + '/projetos/entregas/' + idEntrega + '/entregar',
        options: {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function CONCLUIR_ENTREGA_PATCH(idEntrega, token) {
    return {
        url: API_URL + '/projetos/entregas/concluir/' + idEntrega,
        options: {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function ACEITAR_ENTREGA_PATCH(idEntrega, token) {
    return {
        url: API_URL + '/projetos/entregas/aceitar/' + idEntrega,
        options: {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function APROVAR_ENTREGA_POST(body, token) {
    return {
        url: API_URL + '/projetos/entregas/aprovar',
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