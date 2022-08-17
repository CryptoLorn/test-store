import {Link, Outlet, useNavigate} from "react-router-dom";

import "./Layout.css"
import {useAuth} from "../../hooks/useAuth";
import Admin from "../Admin/Admin";
import BasketVisible from "../BasketVisible/BasketVisible";
import Login from "../Modals/Login";
import Registration from "../Modals/Registration";
import React from "react";

const Layout = () => {
    const {
        user,
        setUser,
        loginVisible,
        setLoginVisible,
        registrationVisible,
        setRegistrationVisible
    } = useAuth();

    const navigate = useNavigate();

    const logOut = (cb) => {
        setLoginVisible(false)
        setUser(null);
        cb();
    }

    const logout = () => {
        logOut(() => navigate('/'), {replace: true})
    }

    return (
        <>
            <div className={'layout'}>
                <div><Link to={"/"}><h1>Some Store</h1></Link></div>
                <div>
                    {user?
                        <div>
                            {user.role === 'ADMIN'?
                                <div className={'navigation'}>
                                    <div className={'header_basket'}><Admin/></div>
                                    <div className={'shopping_bag'}><BasketVisible/></div>
                                    <div className={'logout'} onClick={logout}>Вийти</div>
                                </div>
                                :
                                <div className={'auth_user'}>
                                    <div className={'shopping_bag'}><BasketVisible/></div>
                                    <div className={'logout'} onClick={logout}>Вийти</div>
                                </div>}
                        </div>
                        :
                        //className={'auth'}
                        <div>
                            <div onClick={() => setLoginVisible(true)}>Login</div>
                            <div onClick={() => setRegistrationVisible(true)}>Registration</div>
                            <Login show={loginVisible} onHide={() => setLoginVisible(false)}/>
                            <Registration show={registrationVisible} onHide={() => setRegistrationVisible(false)}/>
                            {/*<div><Link to={"/login"}>Вхід</Link></div>*/}
                            {/*<div><Link to={"/registration"}>Реєстрація</Link></div>*/}
                        </div>
                    }
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default Layout;