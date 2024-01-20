
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        initializeCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        }, increment: (state, action: PayloadAction<number>) => {
            state.count = state.count+action.payload;
        }, decrement: (state, action: PayloadAction<number>) => {
            state.count = state.count-action.payload;
        },
    },
});

export const { initializeCount,increment,
    decrement } = counterSlice.actions;

export default counterSlice.reducer;