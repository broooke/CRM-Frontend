import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "../reducers/user";
import $api from "../../axios";
import jwt_decode from 'jwt-decode';
import {RootThunkConfig} from "../index";
import {resetLoginError} from "../actions/user";

export interface CreateUser extends Omit<User, 'id'>{
    password: string;
}

export const signupUser = createAsyncThunk<User, CreateUser>(
    'SIGNUP_USER',
    async (body) => {
        const response = await $api.post(`/auth/registration`, body)
        const data = jwt_decode(response.data.accessToken) as User
        localStorage.setItem('accessToken', response.data.accessToken)
        return data
    }
)

interface LoginUser {
    email: string;
    password: string;
}

export const loginUser = createAsyncThunk<User, LoginUser, RootThunkConfig>(
    'LOGIN_USER',
    async (body, thunk) => {
        try {
            const response = await $api.post(`/auth/login`, body)
            const data = jwt_decode(response.data.accessToken) as User
            localStorage.setItem('accessToken', response.data.accessToken)
            thunk.dispatch(resetLoginError())
            return data
        } catch (e: any) {
            throw new Error(e.response.data.message)
        }
    }
)

export const logoutUser = createAsyncThunk<void>(
    'LOGOUT_USER',
    async () => {
        await $api.post('/auth/logout')
        localStorage.removeItem('accessToken')
    }
)

export const loadUser = createAsyncThunk<User | undefined, void, RootThunkConfig>(
    'LOAD_USER',
    async (_, thunk) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            const response = await $api.get(`/auth/refresh`)
            const data = jwt_decode(response.data.accessToken) as User
            await localStorage.setItem('accessToken', response.data.accessToken)
            return data
        }
        return undefined
    }
)

export const loadUsers = createAsyncThunk<User[]>(
    'LOAD_USERS',
    async () => {
        const response = await $api.get('/users')
        return response.data
    }
)

