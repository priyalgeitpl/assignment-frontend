import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticated = true;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
