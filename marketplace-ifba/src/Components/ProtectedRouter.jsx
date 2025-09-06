import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';
import NotPermission from '../Pages/NotPermission';

const ProtectedRouter = ({ allowedRoles }) => {
    const { login, hasRole, loadingAutoLogin, awaitUserContext } = React.useContext(UserContext);

    if (loadingAutoLogin) {
        console.log("[PROTECTEDROUTER]: Tentativa de Login automático");
        return null;
    }

    if (awaitUserContext) {
        if (!login) {
            console.log("[PROTECTEDROUTER]: Não foi possivel realizar o Login de maneira automática, redirecionando para página de Login");
            return <Navigate to="/login" replace />;
        } else if (hasRole(allowedRoles)) {
            console.log("[PROTECTEDROUTER]: Login automático realizado");
            return <Outlet />;
        } else {
            return <NotPermission />
        }
    }

}

export default ProtectedRouter;

