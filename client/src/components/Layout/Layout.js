import {Link, Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./Layout.css"
import Admin from "../Admin/Admin";
import BasketVisible from "../BasketVisible/BasketVisible";
import Login from "../Modals/Login/Login";
import Registration from "../Modals/Registration/Registration";
import {setUser} from "../../store/user.slice";
import {setLoginVisible, setRegistrationVisible} from "../../store/visible.slice";
import {setSelectedType, setElementType} from "../../store/type.slice";
import {setSelectedBrand, setElementBrand} from "../../store/brand.slice";
import {setPage} from "../../store/page.slice";
import {getAllBaskets, setBasketId} from "../../store/basket.slice";
import {getAllOrdersByBasketId} from "../../store/orders.slice";

const Layout = () => {
    const {user} = useSelector(state => state.userReducer);
    const {loginVisible, registrationVisible} = useSelector(state => state.visibleReducer);
    const {baskets, basketId} = useSelector(state => state.basketReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllBaskets())
        dispatch(getAllOrdersByBasketId({data: basketId}))
    }, [basketId])

    for (let i = 0; i < baskets.length; i++) {
        if (user?.id === i) {
            dispatch(setBasketId(i))
        }
    }

    const defaultValue = () => {
        dispatch(setSelectedType(false));
        dispatch(setSelectedBrand(false));
        dispatch(setElementType(null));
        dispatch(setElementBrand(null));
        dispatch(setPage(1));
    }

    // const logOutActions = (cb) => {
    //     dispatch(setLoginVisible(false));
    //     dispatch(setRegistrationVisible(false));
    //     dispatch(setUser(null));
    //     localStorage.removeItem('token');
    //     cb();
    // }

    const logOut = () => {
        dispatch(setLoginVisible(false));
        dispatch(setRegistrationVisible(false));
        dispatch(setUser(null));
        localStorage.removeItem('token');
        navigate('/')
        // logOutActions(() => navigate('/'), {replace: true});
    }

    return (
        <>
            <div className={'layout'}>
                <div onClick={() => defaultValue()}><Link to={"/"}><h1>Some Store</h1></Link></div>
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
                            <div onClick={() => dispatch(setLoginVisible(true))}><span>Log In</span></div>
                            <div onClick={() => dispatch(setRegistrationVisible(true))}><span>Register</span></div>
                            <Login show={loginVisible} onHide={() => dispatch(setLoginVisible(false))}/>
                            <Registration show={registrationVisible} onHide={() => dispatch(setRegistrationVisible(false))}/>
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