import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import "./Registration.css"
import {useAuth} from "../../../hooks/useAuth";
import {login, registration} from "../../../services/users.service";
import Login from "../Login/Login";
import {RegistrationValidator} from "../../../validators/registration.validator";


const Registration = ({show, onHide}) => {
    const {
        setUser,
        setLoginVisible,
        loginVisible,
        setRegistrationVisible,
        setIsAuth
    } = useAuth();

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: joiResolver(RegistrationValidator)})
    const [formError, setFormError] = useState(null)

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logIn = (newUser, cb) => {
        setUser(newUser)
        cb()
    }

    // const click = async () => {
    //     try {
    //         let data = await registration(email, password)
    //         logIn(data, () => navigate('/'))
    //     } catch (e) {
    //         alert(e.response.data.message)
    //     }
    // }

    const loginRedirect = () => {
        setLoginVisible(true)
        setRegistrationVisible(false)
    }

    const submit = async () => {
        try {
            let data = await registration(email, password)

            logIn(data, () => navigate('/'))
            setIsAuth(true)
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
                    <div className={'registration_wrapper'}>
                        <div className={'registration_form'}>
                            <div><h2>Register</h2></div>
                            <form>
                                <div className={'registration'}>
                                    {/*<div><input type={'email'} placeholder={'email...'} value={email}*/}
                                    {/*            onChange={e => setEmail(e.target.value)}/></div>*/}
                                    {/*<div><input type={'password'} placeholder={'password...'} value={password}*/}
                                    {/*            onChange={e => setPassword(e.target.value)}/></div>*/}

                                    <div><input type='email' placeholder={'email...'} {...register('email')} onChange={e => setEmail(e.target.value)}/></div>
                                    {errors.email && <span className={'registration_validation'}>{errors.email.message}</span>}
                                    <div><input type='password' placeholder={'password...'} {...register('password')} onChange={e => setPassword(e.target.value)}/></div>
                                    {errors.password && <span className={'registration_validation'}>{errors.password.message}</span>}
                                    {formError && <span className={'registration_validation'}>{formError}</span>}

                                    <div className={'registration_info'}>
                                        <div>Already registered? <span onClick={() => loginRedirect()}>Login</span></div>
                                        <Login show={loginVisible} onHide={() => setLoginVisible(false)}/>

                                        <div className={'registration_button'} onClick={handleSubmit(submit)}>Register</div>
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

export default Registration;