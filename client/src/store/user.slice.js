import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {userService} from "../services/user.service";

export const login = createAsyncThunk(
    'userSlice/login',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            await userService.login(data.email, data.password).then(data => {
                dispatch(setUser(data));
                dispatch(setBasketId(data.id));
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
            await userService.checkIsAuth().then(data => {
                dispatch(setUser(data));
                dispatch(setIsAuth(true));
                dispatch(setBasketId(data.id));
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        isAuth: null,
        basketId: null,
        status: null,
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setBasketId: (state, action) => {
            state.basketId = action.payload;
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
        [isAuth.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

const userReducer = userSlice.reducer;

export const {setUser, setIsAuth, setBasketId} = userSlice.actions;
export default userReducer;