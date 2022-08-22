import {Link, Outlet, useNavigate} from "react-router-dom";

import "./Layout.css"
import {useAuth} from "../../hooks/useAuth";
import Admin from "../Admin/Admin";
import BasketVisible from "../BasketVisible/BasketVisible";
import Login from "../Modals/Login/Login";
import Registration from "../Modals/Registration/Registration";
import React from "react";

const Layout = () => {
    const {
        user,
        setUser,
        loginVisible,
        setLoginVisible,
        registrationVisible,
        setRegistrationVisible,
        setIsAuth
    } = useAuth();

    const navigate = useNavigate();

    const logOutActions = (cb) => {
        setLoginVisible(false)
        setRegistrationVisible(false)
        setUser(null);
        localStorage.removeItem('token')
        cb();
    }

    const logOut = () => {
        logOutActions(() => navigate('/'), {replace: true})
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
                                    <div className={'logout'} onClick={logOut}>Вийти</div>
                                </div>
                                :
                                <div className={'auth_user'}>
                                    <div className={'shopping_bag'}><BasketVisible/></div>
                                    <div className={'logout'} onClick={logOut}>Вийти</div>
                                </div>}
                        </div>
                        :
                        <div className={'auth'}>
                            <div onClick={() => setLoginVisible(true)}><span>Log In</span></div>
                            <div onClick={() => setRegistrationVisible(true)}><span>Register</span></div>
                            <Login show={loginVisible} onHide={() => setLoginVisible(false)}/>
                            <Registration show={registrationVisible} onHide={() => setRegistrationVisible(false)}/>
                            {/*<div><Link to={"/login"}>Log In</Link></div>*/}
                            {/*<div><Link to={"/registration"}>Register</Link></div>*/}
                        </div>
                    }
                </div>
            </div>

            <Outlet/>
        </>
    );
};

export default Layout;