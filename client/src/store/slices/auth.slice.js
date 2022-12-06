import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {authService} from "../../services/auth.service";

export const sendPasswordResetEmail = createAsyncThunk(
    'authSlice/sendPasswordResetEmail',
    async ({email}, {dispatch, rejectWithValue}) => {
        try {
            await authService.sendEmail(email);
            dispatch(setError(null));
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const restorePassword = createAsyncThunk(
    'authSlice/restorePassword',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            await authService.restorePassword(data.password, data.token);
            dispatch(setError(null));
            dispatch(setMessage('Password has been successfully changed!'));
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        error: null,
        message: null
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    },
    extraReducers: {
        [sendPasswordResetEmail.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [restorePassword.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

const authReducer = authSlice.reducer;

export const {setError, setMessage} = authSlice.actions;
export default authReducer;