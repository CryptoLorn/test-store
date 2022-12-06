import {createSlice} from "@reduxjs/toolkit";

const visibleSlice = createSlice({
    name: 'visibleSlice',
    initialState: {
        loginVisible: false,
        registrationVisible: false,
        confirmationVisible: false,
        editVisible: false,
        typeVisible: false,
        brandVisible: false,
        forgotPasswordVisible: false
    },
    reducers: {
        setLoginVisible: (state, action) => {
            state.loginVisible = action.payload;
        },
        setRegistrationVisible: (state, action) => {
            state.registrationVisible = action.payload;
        },
        setConfirmationVisible: (state, action) => {
            state.confirmationVisible = action.payload;
        },
        setEditVisible: (state, action) => {
            state.editVisible = action.payload;
        },
        setTypeVisible: (state, action) => {
            state.typeVisible = action.payload;
        },
        setBrandVisible: (state, action) => {
            state.brandVisible = action.payload;
        },
        setForgotPasswordVisible: (state, action) => {
            state.forgotPasswordVisible = action.payload;
        }
    },
})

const visibleReducer = visibleSlice.reducer;

export const {
    setLoginVisible,
    setRegistrationVisible,
    setConfirmationVisible,
    setEditVisible,
    setTypeVisible,
    setBrandVisible,
    setForgotPasswordVisible
} = visibleSlice.actions;

export default visibleReducer;