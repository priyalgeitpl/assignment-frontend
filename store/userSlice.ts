import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isLoggedIn: boolean;
    user: {
        id: number,
        name: string;
        email: string;
        category: string[]
    };
}

const initialState: UserState = {
    isLoggedIn: false,
    user: {
        id: 0,
        name: '',
        email: '',
        category: []
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<UserState['user']>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.user = initialState.user;
        },
        updateEmail: (state, action: PayloadAction<string>) => {
            state.user.email = action.payload;
        },
    },
});

export const { loginUser, logoutUser, updateEmail } = userSlice.actions;
export default userSlice.reducer;
