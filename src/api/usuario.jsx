export const API_URL = '/api';

export function LOGIN_POST(body) {
  return {
    url: API_URL + "/auth/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function REGISTER_POST(body) {
  return {
    url: API_URL + "/auth/register",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_VIA_TOKEN_GET(token) {
  return {
    url: API_URL + "/users/token/" + token,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function SOLICITAR_ASSOCIACAO_ORGANIZACAO_POST(body, token) {
    return {
        url: API_URL + '/users/solicitar-organizacao',
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

export function ASSOCIAR_USUARIO_ORGANIZACAO_POST(body, token) {
    return {
        url: API_URL + '/users/associar-organizacao',
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

export function ASSOCIAR_USUARIO_GRUPO_PESQUISA_POST(body, token) {
    return {
        url: API_URL + '/users/associar-grupo-pesquisa',
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

export function SOLICITAR_ASSOCIACAO_GRUPO_PESQUISA_POST(body, token) {
    return {
        url: API_URL + '/users/solicitar-grupo-pesquisa',
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