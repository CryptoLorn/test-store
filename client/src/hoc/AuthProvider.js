import React from 'react';
import {createContext, useState} from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const loginer = (newUser, cb) => {
        setUser(newUser)
        cb()
    }

    const logOut = (cb) => {
        setUser(null)
        cb()
    }

    const value = {user, loginer, logOut}

    return (
        <div>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;