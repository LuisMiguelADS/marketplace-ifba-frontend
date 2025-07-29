import React from 'react';
import { LOGIN_POST, USER_VIA_TOKEN_GET, ORGANIZACAO_ID_GET } from './api';
import useFetch from '../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
    const { request, data, error, setData, setError, setLoading } = useFetch();
    const [user, setUser] = React.useState(null);
    const [login, setLogin] = React.useState(false);
    const [loadingAutoLogin, setLoadingAutoLogin] = React.useState(false);
    const navigate = useNavigate();
    const [awaitUserContext, setAwaitUserContext] = React.useState(false);
    const [organizacao, setOrganizacao] = React.useState(null);

    async function getUserData(token) {
        try {
            const { url, options } = USER_VIA_TOKEN_GET(token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                setUser(json);
                setLogin(true);
                console.log("[USERCONTEXT] Usuário logado via token");
            }
        } catch (err) {
            console.error("[USERCONTEXT] Falha ao buscar dados do usuário:", err);
            userLogout();
        } finally {
            setLoadingAutoLogin(false);
        }
    }

    React.useEffect(() => {
        setAwaitUserContext(true);
        async function autoLogin() {
            const token = window.localStorage.getItem('token_autenticacao');
            if (token) {
                setLoadingAutoLogin(true);
                await getUserData(token);
            } else {
                setLoadingAutoLogin(false);
            }
        }
        autoLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function userLogin(email, password) {
        const { url, options } = LOGIN_POST({ email, password });
        const { response, json } = await request(url, options);
        if (response.ok) {
            window.localStorage.setItem('token_autenticacao', json.token);
            setUser(json.user);
            setLogin(true);
            navigate('requester/overview');
            console.log('[USERCONTEXT] Logando');
        } else {
            console.log('[USERCONTEXT] Falha no Login');
            setLogin(false);
        }
    }

    function userLogout() {
        setData(null);
        setError(null);
        setLoading(false);
        setLogin(false);
        setUser(null);
        window.localStorage.removeItem('token_autenticacao');
        navigate('/login');
        console.log('[USERCONTEXT] Deslogando');
    }

    const hasRole = (requiredRole) => {
        if (!user || !user.role) {
            console.log("[USERCONTEXT] Sem permissão")
            console.log(user)
            return false;
        }
        if (Array.isArray(requiredRole)) {
            return requiredRole.includes(user.role);
        }
        return user.role === requiredRole;
    };

    React.useEffect(() => {
        async function fetchData() {
            if (user !== null && user.idOrganizacao !== null) {
                const token = window.localStorage.getItem('token_autenticacao');
                const { url, options } = ORGANIZACAO_ID_GET(user.idOrganizacao, token);
                const { response, json } = await request(url, options);
                if (response.ok) {
                    setOrganizacao(json);
                    console.log('[USERCONTEXT]: Busca organização via ID realizada com sucesso');
                } else {
                    console.log('[USERCONTEXT]: Falha na busca organização via ID');
                }
            } else {
                console.log('[USERCONTEXT]: Usuário não tem organização ainda');
            }
        }
        fetchData();
    }, [user]);

    return (
        <UserContext.Provider value={{ userLogin, data, login, userLogout, error, loadingAutoLogin, hasRole, user, awaitUserContext, organizacao }}>
            {children}
        </UserContext.Provider>
    )
}