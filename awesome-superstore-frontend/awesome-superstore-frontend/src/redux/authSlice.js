import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        customerId: null
    },
    reducers: {
        setAccessTokenState(state, action) {
            state.accessToken = action.payload;
        },
        setCustomerIdState(state, action) {
            state.customerId = action.payload;
        },
        clearAuthState(state) {
            state.accessToken = null;
            state.customerId = null;
            localStorage.clear();
        }
    }
});

export const {
    setAccessTokenState,
    clearAuthState,
    setCustomerIdState
} = authSlice.actions;
export default authSlice.reducer;