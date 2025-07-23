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