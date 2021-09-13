import React, { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

//registrar usuário no sistema

export interface IUser {
    _id: string;
    nick: string;
}

export interface ICredentials {
    nick: string;
    password: string;
}

export interface ICreateUser {
    nick: string;
    password: string;
    confirmPassord: string;
}

const useAuth = () => {

    const [user, setUser] = useState<IUser>({} as IUser);
    const [token, setToken] = useState<string>('');
    const [isLoadResponse, setIsLoadResponse] = useState<boolean>(false);
    const [isLoadPage, setIsLoadPage] = useState<boolean>(true);
    const [loginErr, setLoginErr] = useState<string>('');
    const [registerErr, setRegisterErr] = useState<string>('');

    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);

    const isSinged = useMemo<boolean>(() =>
        (!!user._id && !!user.nick && !!token)
        , [user, token]);

    useEffect(() => {
        const userData = localStorage.getItem('@user');
        const tokenData = localStorage.getItem('@token');
        if (!!userData && !!tokenData) {
            try {
                const userParsed = JSON.parse(userData) as IUser;
                setUser(userParsed);
                setToken(tokenData);
            }
            catch (err) {
                console.error('erro ao setar usuário');
            }
        }
        setIsLoadPage(false);
    }, []);

    const singIn = useCallback(async (credentials: ICredentials) => {
        setIsLoadResponse(true);
        setLoginErr('');
        try {
            const response = await api.post('/auth/singin', credentials);
            const { user: userResponse, token } = response.data;
            setUser(userResponse);
            setToken(token);
            localStorage.setItem('@token', token);
            localStorage.setItem('@user', JSON.stringify(userResponse));
        }
        catch (err: any) {
            console.log(Object.getOwnPropertyDescriptors(err));
            if (err?.response?.status === 400) {
                setLoginErr('Credenciais inválidas');
            }
            else if (err?.response?.status === 500) {
                setLoginErr('Falha ao fazer login, por favor, tente novamente mais tarde');
            }
            else {
                setLoginErr('Falha na conexão com o servidor, por favor, tente novamente mais tarde');
            }

        }
        setIsLoadResponse(false);
    }, []);


    const isValidate = useCallback(({ nick, password, confirmPassord }: ICreateUser) => {
        if (!nick) {
            setRegisterErr('Nick é obrigatório!');
            return false;
        }
        else if (password !== confirmPassord) {
            setRegisterErr('Senhas estão diferentes!');
            return false;
        }
        else if (!password.match(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
            setRegisterErr('Senha muito fraca. Deve conter pelo menos uma letra maiúscula, uma letra menúscula e um número ou caractere especial!');
            return false;
        }
        return true;
    }, []);

    const singUp = useCallback(async (user: ICreateUser) => {
        if (!isValidate(user)) {
            return;
        }
        setIsLoadResponse(true);
        setRegisterErr('');
        const request = {
            nick: user.nick,
            password: user.password
        }
        try {
            const response = await api.post('/auth/singup', request);
            const { user: userResponse, token } = response.data;
            setUser(userResponse);
            setToken(token);
            localStorage.setItem('@token', token);
            localStorage.setItem('@user', JSON.stringify(userResponse));
        }
        catch (err: any) {
            console.log(Object.getOwnPropertyDescriptors(err));
            if (err?.response?.status === 409) {
                setRegisterErr('Já existe um usuário cadastrado com esse Nick');
            }
            else if (err?.response?.status === 500) {
                setRegisterErr('Falha ao fazer login, por favor, tente novamente mais tarde');
            }
            else {
                setRegisterErr('Falha na conexão com o servidor, por favor, tente novamente mais tarde');
            }

        }
        setIsLoadResponse(false);
    }, [isValidate]);

    const singOut = useCallback(async () => {
        setUser({} as IUser);
        localStorage.clear();
    }, []);

    const handleSetOpenLoginDialog = useCallback((open: boolean) => {
        setOpenLoginDialog(open);
        setOpenRegisterDialog(open && false);
    }, []);

    const handleSetOpenRegisterDialog = useCallback((open: boolean) => {
        setOpenRegisterDialog(open);
        setOpenLoginDialog(open && false);
    }, []);

    return {
        user,
        isSinged,
        isLoadResponse,
        loginErr,
        registerErr,
        openLoginDialog,
        openRegisterDialog,
        isLoadPage,
        singIn,
        singUp,
        singOut,
        handleSetOpenLoginDialog,
        handleSetOpenRegisterDialog
    };
}
export default useAuth;

