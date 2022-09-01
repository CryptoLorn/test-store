import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {useForm} from 'react-hook-form';
import {joiResolver} from "@hookform/resolvers/joi";

import "./Login.css"
import {useAuth} from "../../../hooks/useAuth";
import {login} from "../../../services/user.service";
import Registration from "../Registration/Registration";
import {AuthValidator} from "../../../validators/auth.validator";

import {setUser, setIsAuth} from "../../../store/user.slice";
import {setLoginVisible, setRegistrationVisible} from "../../../store/visible.slice";
import {useDispatch, useSelector} from "react-redux";

const Login = ({show, onHide}) => {
    // const {
    //     setUser,
    //     setLoginVisible,
    //     registrationVisible,
    //     setRegistrationVisible,
    //     setIsAuth
    // } = useAuth();

    const {registrationVisible} = useSelector(state => state.visibleReducer);

    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: joiResolver(AuthValidator)});
    const [formError, setFormError] = useState(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const logIn = (newUser, cb) => {
        dispatch(setUser(newUser))
        cb()
    }

    // const click = async () => {
    //     try {
    //         let data = await login(email, password)
    //
    //         logIn(data, () => navigate('/'))
    //     } catch (e) {
    //         alert(e.response.data.message)
    //     }
    // }

    const registrationRedirect = () => {
        dispatch(setLoginVisible(false))
        dispatch(setRegistrationVisible(true))
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
                                        <Registration show={registrationVisible} onHide={() => dispatch(setRegistrationVisible(false))}/>

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