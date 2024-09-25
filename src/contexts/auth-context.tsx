import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { CredententialsType } from "../types/credentials-type";
import { http } from "../lib/axios";
import { toast } from "sonner";

type PropContext = {
    user: string | null;
    login: (credentials: CredententialsType) => Promise<void>;
    logout: () => void;
}

type LoginResponseProps = {
    name: string;
    token: string;
}

export const AuthContext = createContext({} as PropContext)

const userKey = "@Auth:user"
const tokenKey = "@Auth:token"

export const AuthProvider = ({ children }: PropsWithChildren) => {


    const [user, setUser] = useState<string | null>(() => {
        try {
            const value = localStorage.getItem(userKey);
            if (value) return JSON.parse(value);
            localStorage.setItem(userKey, JSON.stringify(null))
            return null;
        } catch (error) {
            console.log(error)
            return null;
        }
    });
    const [token, setToken] = useState<string | null>(() => {
        try {
            const value = localStorage.getItem(tokenKey);
            if (value) return JSON.parse(value);
            localStorage.setItem(tokenKey, JSON.stringify(null))
            return null;
        } catch (error) {
            console.log(error)
            return null;
        }
    });

    const setUserValue = (name: string) => {
        localStorage.setItem(userKey, JSON.stringify(name));
        setUser(name)
    }

    const setTokenValue = (token: string) => {
        localStorage.setItem(tokenKey, JSON.stringify(token));
        setToken(token)
    }

    const login = async (crendentials: CredententialsType) => {
        try {
            const res = await http.post("/auth/login", crendentials)
            const { name, token } = res.data as LoginResponseProps;
            setUserValue(name)
            setTokenValue(token);
            http.defaults.headers.common.Authorization = `Bearer ${token}`
            toast.success("Usuário logado com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Email e/ou Senha inválido(s)")
        }
    }

    const logout = () => {
        setToken(null);
        localStorage.setItem(tokenKey, JSON.stringify(null))
        setUser(null);
        localStorage.setItem(userKey, JSON.stringify(null))
        delete http.defaults.headers.common.Authorization;
    }

    useEffect(() => {
        const setAuthorizationToken = () => {
            if (token) {
                http.defaults.headers.common.Authorization = `Bearer ${token}`
            }
        }
        setAuthorizationToken();
    }, [token])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}