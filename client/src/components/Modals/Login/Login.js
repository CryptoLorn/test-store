import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {useForm} from 'react-hook-form';
import {joiResolver} from "@hookform/resolvers/joi";

import "./Login.css"
import {useAuth} from "../../../hooks/useAuth";
import {login} from "../../../services/users.service";
import Registration from "../Registration/Registration";
import {LoginValidator} from "../../../validators/login.validator";


const Login = ({show, onHide}) => {
    const {
        setUser,
        setLoginVisible,
        registrationVisible,
        setRegistrationVisible
    } = useAuth();

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: joiResolver(LoginValidator)})
    const [formError, setFormError] = useState(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const logIn = (newUser, cb) => {
        setUser(newUser)
        cb()
    }

    const click = async () => {
        try {
            let data = await login(email, password)

            logIn(data, () => navigate('/'))
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const registrationRedirect = () => {
        setLoginVisible(false)
        setRegistrationVisible(true)
    }

    const submit = async () => {
        try {
            let data = await login(email, password)

            logIn(data, () => navigate('/'))
        } catch (e) {
            setFormError(e.response.data.message)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className={'login_wrapper'}>
                        <div className={'login_form'}>
                            <div><h2>test@gmail.com</h2></div>
                            <form>
                                <div className={'login'}>
                                    {/*<div><input type={'email'} placeholder={'email...'} value={email}*/}
                                    {/*            onChange={e => setEmail(e.target.value)}/>*/}
                                    {/*</div>*/}
                                    {/*<div><input type={'password'} placeholder={'password...'} value={password}*/}
                                    {/*            onChange={e => setPassword(e.target.value)}/>*/}
                                    {/*</div>*/}

                                    <div><input type='email' placeholder={'email...'} {...register('email')} onChange={e => setEmail(e.target.value)}/></div>
                                    {errors.email && <span className={'login_validation'}>{errors.email.message}</span>}
                                    <div><input type='password' placeholder={'password...'} {...register('password')} onChange={e => setPassword(e.target.value)}/></div>
                                    {errors.password && <span className={'login_validation'}>{errors.password.message}</span>}
                                    {formError && <span className={'login_validation'}>{formError}</span>}

                                    <div className={'login_info'}>
                                        <div>No account? <span onClick={() => registrationRedirect()}>Registration</span></div>
                                        <Registration show={registrationVisible} onHide={() => setRegistrationVisible(false)}/>

                                        <div className={'login_button'} onClick={handleSubmit(submit)}>Log In</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Login;