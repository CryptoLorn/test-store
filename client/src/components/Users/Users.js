import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {FaEdit} from "react-icons/fa";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import "./Users.css";
import {getAllUsers, updateUserById, userToUpdate, setError} from "../../store/slices/user.slice";
import {Role} from "../../enum/enum";
import {EditUserValidator} from "../../validators/editUser.validator";

const Users = () => {
    const {users, user, userForUpdate, error} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const {handleSubmit, register, setValue, reset, formState: {errors}} = useForm({resolver: joiResolver(EditUserValidator)});

    useEffect(() => {
        dispatch(getAllUsers({id: user.id}));

        if (userForUpdate) {
            setValue('email', userForUpdate.email);
            setValue('role', userForUpdate.role);
        }
    }, [userForUpdate])

    const updateUser = async (email, role) => {
        await dispatch(updateUserById({id: userForUpdate.id, user: email, role}));
        dispatch(userToUpdate(null));
        reset();

        // if (user.id === userForUpdate.id) {
        //     dispatch(setError('Unable to edit use'))
        //     dispatch(userToUpdate(null));
        //     reset();
        // } else {
        //     await dispatch(updateUserById({id: userForUpdate.id, user: email, role}));
        //     dispatch(userToUpdate(null));
        //     reset();
        // }
    }

    return (
        <div>
            <div className={'user_wrapper'}>
                <form className={userForUpdate ? '' : 'hidden'}>
                    <input type={'email'} {...register('email')}/>
                    {errors.email && <span className={'validation'}>{errors.email.message}</span>}<br/>
                    <select {...register('role')}>
                        <option value={Role.ADMIN}>ADMIN</option>
                        <option value={Role.USER}>USER</option>
                    </select>
                    {errors.role && <span className={'validation'}>{errors.role.message}</span>}<br/>
                    <div className={'user_edit_button'} onClick={handleSubmit(updateUser)}>Update</div>
                </form>
                {error&& <span className={'validation'}>{error}</span>}

                {users.map(user =>
                    <div key={user.id} className={'user_details'}>
                        <div>
                            <b>Email:</b> {user.email}<br/>
                            <b>Role:</b> {user.role}<br/>
                        </div>
                        <div
                            className={'user_edit'}
                            onClick={() => dispatch(userToUpdate(user))}
                        >
                            <FaEdit/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;