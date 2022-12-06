import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {setLoginVisible} from "../store/slices/visible.slice";
import {Role} from "../enum/enum";

const RequireAuth = ({children}) => {
    const {user} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    if (!user) {
        dispatch(setLoginVisible(true));
        return <Navigate to={'/'}/>
    } else if (user.role !== Role.ADMIN) {
        return <Navigate to={'/'}/>
    }

    return children;
};

export default RequireAuth;