import { configureStore } from '@reduxjs/toolkit';
import checkedItemsReducer from './categorySlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        checkedItems: checkedItemsReducer,
        user: userReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
