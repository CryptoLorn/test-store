import React from 'react';
import {Navigate} from "react-router-dom";

import {useAuth} from "../hooks/useAuth";
import {useSelector} from "react-redux";

const RequireAuth = ({children}) => {
    const {setLoginVisible} = useAuth(); //user,

    const {user} = useSelector(state => state.userReducer);

    if (!user) {
        setLoginVisible(true)
        return <Navigate to={'/'}/>
    }

    return children
};

export default RequireAuth;