import {createSlice} from "@reduxjs/toolkit";

const visibleSlice = createSlice({
    name: 'visibleSlice',
    initialState: {
        loginVisible: false,
        registrationVisible: false,
        confirmationVisible: false,
        editVisible: false
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
        }
    },
})

const visibleReducer = visibleSlice.reducer;

export const {
    setLoginVisible,
    setRegistrationVisible,
    setConfirmationVisible,
    setEditVisible
} = visibleSlice.actions;

export default visibleReducer;