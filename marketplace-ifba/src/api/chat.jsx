export const API_URL = 'http://localhost:8080';

export function CHAT_GET(chatId, token) {
    return {
        url: API_URL + '/chats/' + chatId,
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function ENVIAR_MENSAGEM_POST(body, token) {
    return {
        url: API_URL + '/chats/mensagem',
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
