import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Navigate, Outlet } from "react-router";

export const PrivateRouter = () => {
    const context = useContext(AuthContext);

    if (!context) return null;

    if (context.isLoading) return <p>Carregando...</p>;

    if (!context.isAuthenticated) return <Navigate to="/auth" replace /> 

    return <Outlet />
};
