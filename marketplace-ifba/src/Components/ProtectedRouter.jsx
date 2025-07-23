import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRouter = ({ allowedRoles }) => {
    const { login, hasRole, user, loadingAutoLogin } = React.useContext(UserContext);

    if (loadingAutoLogin) {
        console.log("ProtectedRouter: Auto-login em andamento...");
        return null;
    }

    if (!login) {
        console.log("ProtectedRouter: Não logado após auto-login, redirecionando para /login.");
        return <Navigate to="/login" replace />;
    }

    if (user && hasRole(allowedRoles)) {
        console.log("ProtectedRouter: Usuário logado e com permissão, renderizando Outlet.");
        return <Outlet />;
    }
}

export default ProtectedRouter;

