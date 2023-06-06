import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { viewCourseAPI } from "../../api/viewCourseAPI";
// USE REDUX-TOOLKIT

//TYPES

//THUNK
export const getLessonList = createAsyncThunk(
    'viewCourse/getLessonList',
    async (id: number, thunkAPI) => {
        try {
            const response = await viewCourseAPI.getLessonList(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getLessonDetail = createAsyncThunk(
    'viewCourse/getLessonDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await viewCourseAPI.getLessonDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTheoryDetail = createAsyncThunk(
    'viewCourse/getTheoryDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await viewCourseAPI.getTheoryDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTheoryIntroDetail = createAsyncThunk(
    'viewCourse/getTheoryIntroDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await viewCourseAPI.getTheoryIntroDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTheoryChapterDetail = createAsyncThunk(
    'viewCourse/getTheoryChapterDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await viewCourseAPI.getTheoryChapterDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTheoryLabDetail = createAsyncThunk(
    'viewCourse/getTheoryLabDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await viewCourseAPI.getTheoryLabDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const patchTheoryIntroDetail = createAsyncThunk(
    'viewCourse/patchTheoryIntroDetail',
    async (data: any, thunkAPI) => {
        try {
            const response = await viewCourseAPI.patchTheoryIntroDetail(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const patchTheoryChapterDetail = createAsyncThunk(
    'viewCourse/patchTheoryChapterDetail',
    async (data: any, thunkAPI) => {
        try {
            const response = await viewCourseAPI.patchTheoryChapterDetail(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const patchTheoryLabDetail = createAsyncThunk(
    'viewCourse/patchTheoryLabDetail',
    async (data: any, thunkAPI) => {
        try {
            const response = await viewCourseAPI.patchTheoryLabDetail(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTestDetail = createAsyncThunk(
    'viewCourse/getTestDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await viewCourseAPI.getTestDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTestCurrentChapter = createAsyncThunk(
    'viewCourse/getTestCurrentChapter',
    async (data: any, thunkAPI) => {
        try {
            const response = await viewCourseAPI.getTestCurrentChapter(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const sendAnswer = createAsyncThunk(
    'viewCourse/sendAnswer',
    async (data: any, thunkAPI) => {
        try {
            const response = await viewCourseAPI.sendAnswer(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTestPoints = createAsyncThunk(
    'viewCourse/getTestPoints',
    async (data: any, thunkAPI) => {
        try {
            const response = await viewCourseAPI.getTestPoints(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const endTest = createAsyncThunk(
    'viewCourse/endTest',
    async (id: number, thunkAPI) => {
        try {
            const response = await viewCourseAPI.endTest(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

type InitialStateType = {
    viewCourse: any
    viewLesson: any
    viewTheory: any
    viewTest: any
    initialMenuItem: number
    passedContent: boolean,
    passedLab: boolean
    passedLabTrial: boolean
    testPoints: any,
}
const initialState = {
    viewCourse: [],
    viewLesson: [],
    viewTheory: [],
    viewTest: [],
    initialMenuItem: 0,
    passedContent: false,
    passedLab: false,
    passedLabTrial: false,
    testPoints: null,
} as InitialStateType


export const viewCourseSlice = createSlice({
    name: 'viewCourse',
    initialState,
    reducers: {
        setMenuItem: (state, action) => {
            state.initialMenuItem = action.payload
        },
        setPassedContent: (state, action) => {
            state.passedContent = action.payload
        },
        setPassedLab: (state, action) => {
            state.passedLab = action.payload
        },
        setPassedLabTrial: (state, action) => {
            state.passedLabTrial = action.payload
        },
        clearTestPoints: (state) => {
            state.testPoints = []
        },
        clearViewTheory: (state) => {
            state.viewTheory = []
        },
    },
    extraReducers: {
        [getLessonList.fulfilled.type]: (state, action) => {
            state.viewCourse = action.payload
        },
        [getLessonDetail.fulfilled.type]: (state, action) => {
            state.viewLesson = action.payload
        },
        [getTheoryDetail.fulfilled.type]: (state, action) => {
            state.viewTheory = action.payload
        },
        [getTestDetail.fulfilled.type]: (state, action) => {
            state.viewTest = action.payload
        },
        [getTestPoints.fulfilled.type]: (state, action) => {
            state.testPoints = action.payload
        },
    }
})
export const {
    setMenuItem,
    setPassedContent,
    clearTestPoints,
    setPassedLab,
    setPassedLabTrial,
    clearViewTheory
} = viewCourseSlice.actions
export default viewCourseSlice.reducer
