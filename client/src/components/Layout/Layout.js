import {Link, Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./Layout.css";
import Admin from "../Admin/Admin";
import BasketVisible from "../BasketVisible/BasketVisible";
import Login from "../Modals/Login/Login";
import Registration from "../Modals/Registration/Registration";
import {setUser} from "../../store/user.slice";
import {setLoginVisible, setRegistrationVisible} from "../../store/visible.slice";
import {setSelectedType, setElementType} from "../../store/type.slice";
import {setSelectedBrand, setElementBrand} from "../../store/brand.slice";
import {setPage} from "../../store/page.slice";
import {getBasketById} from "../../store/basket.slice";
import {getAllOrdersByBasketId, setSelectedSize, setError} from "../../store/orders.slice";
import {setSneakersFound} from "../../store/sneakers.slice";
import Footer from "../Footer/Footer";

const Layout = () => {
    const {user, basketId} = useSelector(state => state.userReducer);
    const {loginVisible, registrationVisible} = useSelector(state => state.visibleReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBasketById({id: user?.id}));
        dispatch(getAllOrdersByBasketId({data: basketId}));
    }, [basketId])

    const defaultValue = () => {
        dispatch(setSelectedType(false));
        dispatch(setSelectedBrand(false));
        dispatch(setElementType(null));
        dispatch(setElementBrand(null));
        dispatch(setSelectedSize(null));
        dispatch(setSneakersFound([]));
        dispatch(setError());
        dispatch(setPage(1));
    }

    const logOut = () => {
        dispatch(setLoginVisible(false));
        dispatch(setRegistrationVisible(false));
        dispatch(setUser(null));
        localStorage.removeItem('token');
        defaultValue();
        navigate('/');
    }

    return (
        <>
            <div className={'layout'}>
                <div onClick={() => defaultValue()}><Link to={"/"}><h1>Epic Sneakers</h1></Link></div>
                <>
                    {user?
                        <div>
                            {
                                user.role === 'ADMIN'?
                                <div className={'navigation'}>
                                    <div><Admin/></div>
                                    <div className={'shopping_bag'}><BasketVisible/></div>
                                    <div className={'logout'} onClick={logOut}>Log Out</div>
                                </div>
                                :
                                <div className={'auth_user'}>
                                    <div className={'shopping_bag'}><BasketVisible/></div>
                                    <div className={'logout'} onClick={logOut}>Log Out</div>
                                </div>
                            }
                        </div>
                        :
                        <div className={'auth'}>
                            <div onClick={() => dispatch(setLoginVisible(true))}><span>Log In</span></div>
                            <div onClick={() => dispatch(setRegistrationVisible(true))}><span>Register</span></div>
                            <Login show={loginVisible} onHide={() => dispatch(setLoginVisible(false))}/>
                            <Registration show={registrationVisible} onHide={() => dispatch(setRegistrationVisible(false))}/>
                        </div>
                    }
                </>
            </div>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Layout;