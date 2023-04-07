import { createContext, ReactNode, useState } from "react";
import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from "next/router";
import { api } from "@/services/apiClient";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try{
        destroyCookie(undefined,'@nextauth.token');
        Router.push('/');
    }catch(err){
        console.log(`Erro ao deslogar: ${err}`)
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user; //converte o obj para bool se existir ou nao algo no user

    async function signIn({ email, password }: SignInProps){
        try{
            const response = await api.post('/session',{
                email,
                password,
            })
            
            const {id, name, token} = response.data;
            setCookie(undefined, '@nextauth.token', token,{
                maxAge: 60 * 60 * 24 * 30, //expira o token em um mes
                path: '/' //todos caminhos terão acesso ao token
            });

            setUser({
                id,
                name,
                email,
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/dashboard');


        }catch(err){
            console.log(`Erro: ${err}`)
        }
    }


    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}