import {createAction} from "@reduxjs/toolkit";


export const resetLoginError = createAction('RESET_LOGIN_ERROR')

export const setLoginError = createAction<string>('SET_LOGIN_ERROR')