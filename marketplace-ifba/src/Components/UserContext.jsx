import React from 'react';
import { LOGIN_POST, USER_VIA_TOKEN_GET } from './api';
import useFetch from '../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
    const { request, data, error, setData, setError, setLoading } = useFetch();
    const [user, setUser] = React.useState(null);
    const [login, setLogin] = React.useState(false);
    const [loadingAutoLogin, setloadingAutoLogin] = React.useState(false);
    const navigate = useNavigate();

    async function getUserData(token) {
        try {
            const { url, options } = USER_VIA_TOKEN_GET(token);
            const { response, json } = await request(url, options);
            if (response.ok) {
                setLogin(true);
                setUser(json.user);
            } else {
                userLogout();
            }
        } catch (err) {
            console.error("Falha ao buscar dados do usuário:", err);
            userLogout();
        } finally {
            setloadingAutoLogin(false);
        }
    }

    React.useEffect(() => {
        async function autoLogin() {
            const token = window.localStorage.getItem('token_autenticacao');
            if (token) {
                setloadingAutoLogin(true);
                await getUserData(token);
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
            console.log('Logando');
        } else {
            console.log('Falha no Login');
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
        console.log('Deslogando');
    }

    const hasRole = (requiredRole) => {
        if (!user || !user.role) return false;
        if (Array.isArray(requiredRole)) {
            return requiredRole.includes(user.role);
        }
        return user.role === requiredRole;
    };

    return (
        <UserContext.Provider value={{ userLogin, data, login, userLogout, error, loadingAutoLogin, hasRole, user }}>
            {children}
        </UserContext.Provider>
    )
}