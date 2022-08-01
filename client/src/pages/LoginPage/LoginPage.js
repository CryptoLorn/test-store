import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import './LoginPage.css'
import {login, registration} from "../../services/users.service";
import {useAuth} from "../../hooks/useAuth";

const LoginPage = () => {
    const {setUser} = useAuth();
    const navigate = useNavigate();

    const location = useLocation()
    const isLogin = location.pathname === '/login'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logIn = (newUser, cb) => {
        setUser(newUser)
        cb()
    }

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            logIn(data, () => navigate('/'))
        } catch (e) {
            alert(e.response.data.message)
        }
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