import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ValidationErrors} from "./landingReducer";
import {registrationAPI} from "../../api/authorizationAPI";
import {clearProfile} from "./usersReducer";
// USE REDUX-TOOLKIT

//TYPES
export type RegisterDataType = {
    first_name?: string,
    last_name?: string,
    dob?: number | undefined,
    gender?: string,
    email?: string,
    username?: string,
    password1?: string | undefined,
    password2?: string | undefined,
    phone?: number | undefined
    errorToken?: ValidationErrors | undefined
}
export type AuthorizationType = {
    username: string | null
    password: string | null
}
export type LoginDataType = {
    token: any
    error: any | null
    email: string
    username: string
    phone: string
    google_user: boolean
    telegram_user: boolean
    first_name: string
    last_name: string
    avatar: string | null
    avatar_auth: string | null
    permission: string | null
    used_trial: boolean
    notifications: number
}
export type CodeRequestType = {
    code: number
    username: string
}

export type ResetPhoneType = {
    phone: number
}
//THUNK
export const registration = createAsyncThunk(
    'authorization/registration',
    async (dataReg: RegisterDataType, thunkAPI) => {
        try {
            const response = await registrationAPI.registration(dataReg)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response)
        }
    }
)

export const login = createAsyncThunk(
    'authorization/login',
    async (data: AuthorizationType, thunkAPI) => {
        try {
            const response = await registrationAPI.login(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.non_field_errors[0])
        }
    }
)
export const loginGoogle = createAsyncThunk(
    'authorization/loginGoogle',
    async (data: AuthorizationType, thunkAPI) => {
        try {
            const response = await registrationAPI.loginGoogle(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.non_field_errors[0])
        }
    }
)

export const loginTelegram = createAsyncThunk(
    'authorization/loginTelegram',
    async (data: AuthorizationType, thunkAPI) => {
        try {
            const response = await registrationAPI.loginTelegram(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.non_field_errors[0])
        }
    }
)

export const logout = createAsyncThunk(
    'authorization/logout',
    async (__, thunkAPI) => {
        try {
            const response = await registrationAPI.logout()
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const postToken = createAsyncThunk(
    'authorization/postToken',
    async (token: CodeRequestType, thunkAPI) => {
        try {
            const response = await registrationAPI.postToken(token)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getUserData = createAsyncThunk(
    'authorization/getUserData',
    async (_, thunkAPI) => {
        try {
            const response = await registrationAPI.getUserData()
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.status)
        }
    }
)

export const resetPassword = createAsyncThunk(
    'authorization/resetPassword',
    async (data: ResetPhoneType, thunkAPI) => {
        try {
            const response = await registrationAPI.resetPassword(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.status)
        }
    }
)

export const newPassword = createAsyncThunk(
    'authorization/newPassword',
    async (data: AuthorizationType, thunkAPI) => {
        try {
            const response = await registrationAPI.newPassword(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.non_field_errors[0])
        }
    }
)

export const refreshToken = createAsyncThunk(
    'authorization/refreshToken',
    async (token: string, thunkAPI) => {
        try {
            const response = await registrationAPI.refreshToken(token)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.status)
        }
    }
)

type InitialStateType = {
    registerStep: number
    isLoadingApp: boolean
    resetPhone: ResetPhoneType | null
    errorLogin: ValidationErrors | undefined
    isOpenSidebar: string,
    registerData: RegisterDataType
    loginData: LoginDataType
}

const initialState: InitialStateType = {
    registerStep: 1,
    isLoadingApp: true,
    resetPhone: null,
    errorLogin: undefined,
    isOpenSidebar: 'studentSidebar',
    registerData: {
        first_name: '',
        last_name: '',
        dob: undefined,
        gender: 'man',
        email: '',
        username: '',
        password1: undefined,
        password2: undefined,
        phone: undefined,
        errorToken: undefined
    },
    loginData: {
        token: null,
        error: null,
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        avatar: null,
        permission: null
    }
} as InitialStateType


export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        isSidebar: (state, action: PayloadAction<string>) => {
            state.isOpenSidebar = action.payload
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.registerStep = action.payload
        },
        setRegisterData: (state, action: PayloadAction<RegisterDataType>) => {
            state.registerData = {...state.registerData, ...action.payload}
        },
        setLogin: (state, action: PayloadAction<LoginDataType>) => {
            state.loginData = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.loginData.token = action.payload
        },
        setErrorToken: (state, action: PayloadAction<ValidationErrors>) => {
            state.registerData.errorToken = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoadingApp = action.payload
        },
        setResetPhone: (state, action) => {
            state.resetPhone = action.payload
        },
    },
    extraReducers: {
        [getUserData.fulfilled.type]: (state, action: PayloadAction<LoginDataType>) => {
            state.loginData = {...state.loginData, ...action.payload}
        },
        [logout.pending.type]: (state) => {
            state.loginData.token = null
            state.loginData.email = ''
            state.loginData.first_name = ''
            state.loginData.last_name = ''
            state.loginData.username = ''
            state.loginData.avatar = ''
            localStorage.removeItem('Token')
        }
    }
})
export const {
    setStep,
    setRegisterData,
    setLogin,
    setToken,
    setLoading,
    isSidebar,
    setResetPhone
} = authorizationSlice.actions
export default authorizationSlice.reducer
