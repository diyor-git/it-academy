import {
    AuthorizationType,
    CodeRequestType,
    RegisterDataType,
    ResetPhoneType,
} from "../redux/reducers/authorizationReducer";
import axios, {AxiosResponse} from "axios";
import {SendEmailType} from "../redux/reducers/landingReducer";

export const API_URL = process.env.REACT_APP_API
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const registrationAPI = {
    registration(data: RegisterDataType): Promise<AxiosResponse<RegisterDataType>> {
        return instance.post<RegisterDataType>(`account/register/`, data).then((res) => {
            return res
        })
    },
    postToken(token: CodeRequestType): Promise<AxiosResponse<CodeRequestType>> {
        return instance.post<CodeRequestType>(`account/register/token/`, token).then((res) => {
            return res
        })
    },
    login(data: AuthorizationType): Promise<AxiosResponse<AuthorizationType>> {
        return instance.post<AuthorizationType>(`account/login/`, data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('Token')
            }
        }).then((res) => {
            return res
        })
    },
    loginGoogle(data: AuthorizationType): Promise<AxiosResponse<AuthorizationType>> {
        return instance.post<AuthorizationType>(`account/login/google/`, data).then((res) => {
            return res
        })
    },
    loginTelegram(data: AuthorizationType): Promise<AxiosResponse<AuthorizationType>> {
        return instance.post<AuthorizationType>(`account/login/telegram/`, data).then((res) => {
            return res
        })
    },
    getUserData() {
        return instance.get(`account/status`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('Token')
            }
        }).then((res) => {
            return res
        })
    },

    resetPassword(data: ResetPhoneType): Promise<AxiosResponse<ResetPhoneType>> {
        return instance.post<ResetPhoneType>(`account/password/reset/`, data).then((res) => {
            return res
        })
    },
    newPassword(data: AuthorizationType) {
        return instance.post(`account/password/reset/code/`, data).then((res) => {
            return res
        })
    },
    logout() {
        return instance.get(`account/logout`).then((res) => {
            return res
        })
    },
    refreshToken(token: string) {
        return instance.post(`account/refresh/`, token).then((res) => {
            return res
        })
    },
}

export const contactAPI = {
    sendEmail(body: SendEmailType): Promise<AxiosResponse<string>> {
        return instance.post<string>(`request/create/`, body).then((data) => {
            return data
        })
    },
}