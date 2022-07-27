import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

import './LoginPage.css'
import {login, registration} from "../../http/userApi";
import {useAuth} from "../../hooks/useAuth";

const LoginPage = () => {
    const {loginer} = useAuth();
    const navigate = useNavigate();

    const location = useLocation()
    const isLogin = location.pathname === '/login'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        let data;
        if (isLogin) {
            data = await login(email, password)
        } else {
            data = await registration(email, password)
        }
        loginer(data, () => navigate('/'))
    }

    return (
        <>
            <div className={'login_wrapper'}>
                <div className={'login_form'}>
                    <div><h2>{isLogin? 'Авторизація' : 'Реєстрація'}</h2></div>
                    <form>
                        <div className={'login'}>
                            <div><input type={'email'} placeholder={'Введіть ваш email...'} value={email}
                                            onChange={e => setEmail(e.target.value)}/></div>
                            <div><input type={'password'} placeholder={'Введіть ваш пароль...'} value={password}
                                        onChange={e => setPassword(e.target.value)}/></div>

                            <div className={isLogin? 'login_info' : 'registration_info'}>
                                {
                                    isLogin?
                                    <div>Нема аккаунта? <NavLink to={'/registration'}>Реєстрація</NavLink></div>
                                :
                                    <div>Вже зареєстровані? <NavLink to={'/login'}>Вхід</NavLink></div>
                                }

                                <div className={isLogin? 'login_button' : 'registration_button'} onClick={click}>{isLogin? 'Вхід' : 'Зареєструватись'}</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;