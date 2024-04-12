import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckedItemsState {
    checkedItems: string[],
}

const initialState: CheckedItemsState = {
    checkedItems: [],
};

const checkedItemsSlice = createSlice({
    name: 'CheckedItems',
    initialState,
    reducers: {
        setCheckedItems: (state, action: PayloadAction<string[]>) => {
            state.checkedItems = action.payload;
        },
    },
});

export const { setCheckedItems } = checkedItemsSlice.actions;
export default checkedItemsSlice.reducer;
