import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {userService} from "../services/user.service";

export const login = createAsyncThunk(
    'userSlice/login',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            await userService.login(data.email, data.password).then(data => {
                dispatch(setUser(data));
                dispatch(setBasketId(data.id));

                if (data) {
                    dispatch(setError(null));
                }
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const registration = createAsyncThunk(
    'userSlice/registration',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            await userService.registration(data.email, data.password).then(data => {
                dispatch(setUser(data));
                dispatch(setBasketId(data.id));

                if (data) {
                    dispatch(setError(null));
                }
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const isAuth = createAsyncThunk(
    'userSlice/isAuth',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            await userService.checkIsAuth().then(value => {
                dispatch(setUser(value.data.user));
                dispatch(setIsAuth(true));
                dispatch(setBasketId(value.data.user.id));
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const getAllUsers = createAsyncThunk(
    'userSlice/getAllUsers',
    async ({id}, {dispatch}) => {
        await userService.getAll(id).then(data => dispatch(setUsers([...data])));
    }
)

export const updateUserById = createAsyncThunk(
    'userSlice/updateUserById',
    async ({id, user}, {dispatch, rejectWithValue}) => {
        try {
            const newUser = await userService.updateById(id, user);
            dispatch(updateUser({user: newUser}));

            if (newUser) {
                dispatch(setError(null));
            }
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        users: [],
        isAuth: null,
        basketId: null,
        status: null,
        error: null,
        userForUpdate: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setBasketId: (state, action) => {
            state.basketId = action.payload;
        },
        userToUpdate: (state, action) => {
            state.userForUpdate = action.payload;
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.user.id);
            state.users[index] = action.payload.user;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: {
        [login.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [registration.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [updateUserById.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

const userReducer = userSlice.reducer;

export const {setUser, setUsers, setIsAuth, setBasketId, updateUser, userToUpdate, setError} = userSlice.actions;
export default userReducer;