import React, {useState} from 'react';

import './LoginPage.css'
import {Link} from "react-router-dom";
import {registration} from "../../http/userApi";
import {observer} from "mobx-react-lite";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        let user;
        user = await registration(email, password)
    }
    return (
        <>
            <div className={'login_wrapper'}>
                <div className={'login_form'}>
                    <div><h2>Авторизація</h2></div>
                    <form>
                        <div className={'login'}>
                            <div><input type={'email'} placeholder={'Введіть ваш email...'} value={email} onChange={e => setEmail(e.target.value)}/></div>
                            <div><input type={'password'} placeholder={'Введіть ваш пароль...'} value={password} onChange={e => setPassword(e.target.value)}/></div>
                            <div className={'login_registration_button'}>
                                <div>Нема аккаунта? <Link to={'/registration'}>Реєстрація</Link></div>
                                <div className={'login_button'} onClick={click}>Вхід</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;