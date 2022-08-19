import React from 'react';
import {Navigate} from "react-router-dom";

import {useAuth} from "../hooks/useAuth";

const RequireAuth = ({children}) => {
    const {user, setLoginVisible} = useAuth();

    if (!user) {
        setLoginVisible(true)
        return <Navigate to={'/'}/>
    }

    return children
};

export default RequireAuth;