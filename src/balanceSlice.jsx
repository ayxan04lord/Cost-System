// balanceSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    initialBalance: 0,
    currentBalance: 0,
    entries: []
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setInitialBalance(state, action) {
            state.initialBalance = action.payload;
            state.currentBalance = action.payload;
        },
        addEntry(state, action) {
            state.entries.push(action.payload);
            state.currentBalance -= action.payload.amount;
        },
        removeEntry(state, action) {
            const index = state.entries.findIndex(entry => entry.id === action.payload.id);
            if (index !== -1) {
                state.currentBalance += state.entries[index].amount;
                state.entries.splice(index, 1);
            }
        },
        updateEntry(state, action) {
            const { id, name, amount } = action.payload;
            const entry = state.entries.find(entry => entry.id === id);
            if (entry) {
                state.currentBalance += entry.amount - amount;
                entry.name = name;
                entry.amount = amount;
            }
        }
    }
});

export const { setInitialBalance, addEntry, removeEntry, updateEntry } = balanceSlice.actions;
export default balanceSlice.reducer;
