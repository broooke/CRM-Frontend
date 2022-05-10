import {createReducer} from "@reduxjs/toolkit";
import {loadUser, loadUsers, loginUser, logoutUser, signupUser} from "../thunks/user";
import {resetLoginError, setLoginError} from "../actions/user";

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface InitialState {
    user: User | undefined;
    loginError: string | undefined;
    users: User[];
}

const INITIAL_STATE: InitialState = {
    user: undefined,
    loginError: '',
    users: [],
}

export const userReducer = createReducer(INITIAL_STATE, ({ addCase }) => {
    addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
    });
    addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
    });
    addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error.message
    })
    addCase(logoutUser.fulfilled, (state) => {
        state.user = undefined;
    });
    addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
    });
    addCase(resetLoginError, (state) => {
        state.loginError = undefined;
    });
    addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
    });
    addCase(setLoginError, (state, action) => {
        state.loginError = action.payload;
    })
})