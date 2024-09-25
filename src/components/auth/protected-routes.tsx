import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export const ProtectRoutes = ({ children }: PropsWithChildren) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/" />

    return children;
}