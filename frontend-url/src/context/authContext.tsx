import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import useAuth, { IUser, ICredentials, ICreateUser } from '../hooks/useAuth';

interface IAuthContex {
    isSinged: boolean;
    user: IUser;
    isLoadResponse: boolean;
    loginErr: string;
    registerErr: string;
    openLoginDialog: boolean
    openRegisterDialog: boolean
    singIn(credentials: ICredentials): Promise<void>;
    singUp(user: ICreateUser): Promise<void>;
    singOut(): Promise<void>;
    handleSetOpenLoginDialog(open: boolean): void;
    handleSetOpenRegisterDialog(open: boolean): void;
}

const AuthContext = createContext<IAuthContex>({} as IAuthContex);

const AuthProvider: React.FC = ({ children }) => {

    const {
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
    } = useAuth();

    return (
        <AuthContext.Provider
            value={{
                user,
                isSinged,
                isLoadResponse,
                loginErr,
                registerErr,
                openLoginDialog,
                openRegisterDialog,
                singIn,
                singUp,
                singOut,
                handleSetOpenLoginDialog,
                handleSetOpenRegisterDialog
            }}
        >
            {isLoadPage ? <></> : children}
        </AuthContext.Provider>
    )
}

function useAuthContext(): IAuthContex {
    const authContext = useContext(AuthContext);
    return authContext;
}

export { AuthProvider, useAuthContext };