import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state, action) => {
            state.token = null;
            localStorage.clear();
        }
    }
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;