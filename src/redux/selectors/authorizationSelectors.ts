//REGISTRATION + LOGIN
import {RootState} from "../store";

export const getRegisterData = (state: RootState) => {
    return state.registerPage.registerData
}
export const getLoginData = (state: RootState) => {
    return state.registerPage.loginData
}

export const getPermission = (state: RootState) => {
    return state.registerPage?.loginData?.permission
}

export const getToken = (state: RootState) => {
    return state.registerPage?.loginData?.token
}

export const getRegisterStep = (state: RootState) => {
    return state.registerPage.registerStep
}

export const getResetPhoneSelector = (state: RootState) => {
    return state.registerPage.resetPhone
}

