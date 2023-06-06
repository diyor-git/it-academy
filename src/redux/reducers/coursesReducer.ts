import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CourseListType} from "./landingReducer";
import {coursesAPI} from "../../api/coursesAPI";
// USE REDUX-TOOLKIT

//TYPES
export type BoughtCoursesType = {
    status: boolean
    available: number
    courses: string
    id: number
    course: number
    length: any
    slug: string
    map: any
    title: string
    title_lms: string
    image: string
    image_lms: string
    all: number
    completed: number
    percentage: number
}
export type CourseLessonsType = {
    id: number
    title_lms: string
    lessons: LessonsType | null
}
export type LessonsType = {
    id: number | null,
    title: string | null,
    created_at: string | null
}
export type CourseCreateType = {
    id: number
    active: boolean
    title: string
    title_lms: string
    slug: string
    duration: string
    price: number | null
    teacher: string
    mentors: string
    image: string
    image_lms: string
    telegram: string
}
export type LessonCreateType = {
    activation_day: number
    description: string
    lab_percentage: number
    test_percentage: number
    title: string
    active: boolean
    preview: string
    banner: string
    course: number
    recommend_end: number
}
export type ContentType = {
    title: string
    minimum_percentage: number
    timer: number
    control: boolean
}
export type LessonDetailType = {
    id: number
    theories_and_tests: [TheoriesAndTestsType] | null
    title: string
    preview: string
    banner: string
    active: boolean
}
export type TheoriesAndTestsType = {
    id: number
    created_at: string
    updated_at: string
    title: string
    lesson: number
    author: number
    type: string
}
export type TheoryDetailType = {
    id: number
    created_at: string
    updated_at: string
    title: string
    lesson: number
    author: number
    intro: IntroType,
    chapters_and_labs: [ChaptersType],
    lab: LabType
}
export type IntroType = {
    id: number
    author: {
        id: number
        username: string
    },
    created_at: string
    updated_at: string
    title: string
    image: string
    text: string
    theory: number
}
export type ChaptersType = {
    id: number
    author: {
        id: number
        username: string
    },
    created_at: string
    updated_at: string
    title: string
    text: string
    theory: number
}
export type LabType = {
    id: number
    author: {
        id: number
        username: string
    },
    created_at: string
    updated_at: string
    title: string
    embed: string
    minimum_points: number
    control: boolean
    theory: number
}

export type StatisticsTotalType = {
    count_active_users_bought: number
    count_active_users_trial: number
    count_all_users_bought: number
    count_all_users_trial: number
    count_inactive_users_bought: number
    count_users: number
    active_users_bought: [
        course__title: string,
        user__first_name: string,
        user__id: number,
        user__last_name: string,
        user__username: string
    ]
    active_users_trial: [
        course__title: string,
        user__first_name: string,
        user__id: number,
        user__last_name: string,
        user__username: string
    ]
    all_users_bought: [
        course__title: string,
        user__first_name: string,
        user__id: number,
        user__last_name: string,
        user__username: string
    ]
    all_users_trial: [
        user__first_name: string,
        user__id: number,
        user__last_name: string,
        user__username: string
    ]
    inactive_users_bought: [
        user__first_name: string,
        user__id: number,
        user__last_name: string,
        user__username: string
    ]
}

export type TestDetailType = {
    again: boolean
    available: boolean
    chapters: []
    complete_time: number
    created_at: string
    done: boolean
    end_time: string
    id: number
    seen: boolean
    start: boolean
    timer: number
    start_time: string
    test_ending: string
    trying: number
    update_at: string
    user: number
    intro: {
        available: boolean
        created_at: string
        done: boolean
        greetings: string
        id: number
        is_end: boolean
        seen: boolean
        updated_at: string
        user: number
        test_intro: {
            author: number
            created_at: string
            greetings: string
            id: number
            image: string
            test: number
            title: string
            type: string
            updated_at: string
            text: {
                blocks: any
                time: number
                version: string
            }
        }
    }
    test: {
        author: {
            id: number
            username: string
        }
        control: boolean
        created_at: string
        id: number
        lesson: number
        minimum_percentage: number
        timer: number
        title: string
        updated_at: string
    }
}

export type StatisticsUserCourseType = {
    id: number,
    title: string,
    image_lms: string,
    expiration_date: string,
    complete_time: number
    gpa: number,
    completed: boolean,
    status: boolean,
    all_points: number,
    avg_points: number,
    best_points: number,
    all_lessons: number,
    done_lessons: number,
    percentage: number
    lessons: [
        id: number,
        title: string,
        preview: string,
        available: boolean,
        done: boolean,
        activation_date: string,
        start_time: string,
        end_time: string,
        complete_time: number,
        points: number
    ]
}

export type StatisticsUserLessonType = {
    banner: string
    id: number
    complete_time: number
    title: string
    inside: [
        avialable: boolean,
        complete_time: number,
        done: boolean,
        end_time: string,
        id: number,
        start_time: string,
        title: string,
        type: string
    ]
}

export type StatisticsUserDetailTheoryType = {
    title: string
    chapter: [
        {
            user__id: number
            user__username: string
            user__last_name: string
            user__first_name: string
            done: boolean
            complete_time: number
            theory_chapter__title: string
        },
    ]
    intro: [
        {
            user__id: number
            user__username: string
            user__last_name: string
            user__first_name: string
            done: boolean
            complete_time: number
            theory_chapter__title: string
        },
    ]
}

//THUNK
export const getBoughtCourses = createAsyncThunk(
    'courses/getBoughtCourses',
    async (__, thunkAPI) => {
        try {
            const response = await coursesAPI.getBoughtCourses()
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getAllCourses = createAsyncThunk(
    'course/getAllCourses',
    async (__, thunkAPI) => {
        try {
            const response = await coursesAPI.getAllCourses()
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)
export const getCourseDetail = createAsyncThunk(
    'course/getCourseDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getCourseDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getCourseLessons = createAsyncThunk(
    'courses/getCourseLessons',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getCourseLessons(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const createCourse = createAsyncThunk(
    'courses/createCourse',
    async (data: CourseCreateType, thunkAPI) => {
        try {
            const response = await coursesAPI.createCourse(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const createLesson = createAsyncThunk(
    'courses/createLesson',
    async (data: LessonCreateType, thunkAPI) => {
        try {
            const response = await coursesAPI.createLesson(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getLessonDetail = createAsyncThunk(
    'courses/getLessonDetail',
    async (id: LessonDetailType, thunkAPI) => {
        try {
            const response = await coursesAPI.getLessonDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const createTheory = createAsyncThunk(
    'courses/createTheory',
    async (data: LessonCreateType, thunkAPI) => {
        try {
            const response = await coursesAPI.createTheory(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const createTests = createAsyncThunk(
    'courses/createTests',
    async (data: LessonCreateType, thunkAPI) => {
        try {
            const response = await coursesAPI.createTests(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTheoryDetail = createAsyncThunk(
    'courses/getTheoryDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getTheoryDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const createTheoryIntro = createAsyncThunk(
    'courses/createTheoryIntro',
    async (data: IntroType, thunkAPI) => {
        try {
            const response = await coursesAPI.createTheoryIntro(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const createTheoryChapter = createAsyncThunk(
    'courses/createTheoryChapter',
    async (data: IntroType, thunkAPI) => {
        try {
            const response = await coursesAPI.createTheoryChapter(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const createTheoryLab = createAsyncThunk(
    'courses/createTheoryLab',
    async (data: LabType, thunkAPI) => {
        try {
            const response = await coursesAPI.createTheoryLab(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTestsDetail = createAsyncThunk(
    'courses/getTestsDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getTestsDetail(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const createTestsIntro = createAsyncThunk(
    'courses/createTestsIntro',
    async (data: IntroType, thunkAPI) => {
        try {
            const response = await coursesAPI.createTestsIntro(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const createTestsChapter = createAsyncThunk(
    'courses/createTestsChapter',
    async (data: IntroType, thunkAPI) => {
        try {
            const response = await coursesAPI.createTestsChapter(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getTrial = createAsyncThunk(
    'courses/getTrial',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getTrial(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const updateIntro = createAsyncThunk(
    'courses/updateIntro',
    async (data: IntroType, thunkAPI) => {
        try {
            const response = await coursesAPI.updateTheoryIntro(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const updateChapter = createAsyncThunk(
    'courses/updateChapter',
    async (data: IntroType, thunkAPI) => {
        try {
            const response = await coursesAPI.updateTheoryChapter(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const updateLab = createAsyncThunk(
    'courses/updateLab',
    async (data: IntroType, thunkAPI) => {
        try {
            const response = await coursesAPI.updateTheoryLab(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const updateTestsIntro = createAsyncThunk(
    'courses/updateTestsIntro',
    async (data: IntroType, thunkAPI) => {
        try {
            const response = await coursesAPI.updateTestsIntro(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const updateTestsChapter = createAsyncThunk(
    'courses/updateTestsChapter',
    async (data: IntroType, thunkAPI) => {
        try {
            const response = await coursesAPI.updateTestsChapter(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const orderClickCreate = createAsyncThunk(
    'courses/orderClickCreate',
    async (data: any, thunkAPI) => {
        try {
            const response = await coursesAPI.orderClickCreate(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)
export const orderPaymeCreate = createAsyncThunk(
    'courses/orderPaymeCreate',
    async (data: any, thunkAPI) => {
        try {
            const response = await coursesAPI.orderPaymeCreate(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const assignCourse = createAsyncThunk(
    'courses/assignCourse',
    async (data: any, thunkAPI) => {
        try {
            const response = await coursesAPI.assignCourse(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const saveHistory = createAsyncThunk(
    'courses/saveHistory',
    async (data: any, thunkAPI) => {
        try {
            const response = await coursesAPI.saveHistory(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsCourses = createAsyncThunk(
    'courses/getStatisticsCourses',
    async (__, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsCourses()
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsCourse = createAsyncThunk(
    'courses/getStatisticsCourse',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsCourse(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsLesson = createAsyncThunk(
    'courses/getStatisticsLesson',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsLesson(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsTest = createAsyncThunk(
    'courses/getStatisticsTest',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsTest(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsTheory = createAsyncThunk(
    'courses/getStatisticsTheory',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsTheory(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsTotal = createAsyncThunk(
    'courses/getStatisticsTotal',
    async (__, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsTotal()
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsUserCourse = createAsyncThunk(
    'courses/getStatisticsUserCourse',
    async (data: any, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsUserCourse(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsUserLesson = createAsyncThunk(
    'courses/getStatisticsUserLesson',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsUserLesson(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsUserTheory = createAsyncThunk(
    'courses/getStatisticsUserTheory',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsUserTheory(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsUserTest = createAsyncThunk(
    'courses/getStatisticsUserTest',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsUserTest(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsUserDetailTheory = createAsyncThunk(
    'courses/getStatisticsUserDetailTheory',
    async (data: any, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsUserDetailTheory(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsUserDetailTest = createAsyncThunk(
    'courses/getStatisticsUserDetailTest',
    async (data: any, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsUserDetailTest(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getStatisticsUserDetailLab = createAsyncThunk(
    'courses/getStatisticsUserDetailLab',
    async (id: number, thunkAPI) => {
        try {
            const response = await coursesAPI.getStatisticsUserDetailLab(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

type InitialStateType = {
    registerStep: number
    isLoadingApp: boolean
    boughtCourses: BoughtCoursesType | []
    courseLessons: CourseLessonsType
    listAllCourses: CourseListType | null
    courseDetail: CourseListType
    lessonDetail: LessonDetailType
    theoryDetail: TheoryDetailType
    testsDetail: TestDetailType
    selectedChapter: any
    orderClick: any
    orderPayme: any
    statisticsTotal: any
    statisticsCourses: any
    statisticsCourse: any
    statisticsLesson: any
    statisticsTest: any
    statisticsTheory: any
    statisticsUserCourse: StatisticsUserCourseType | null
    statisticsUserLesson: StatisticsUserLessonType | null
    statisticsUserTheory: StatisticsUserLessonType | null
    statisticsUserTest: StatisticsUserLessonType | null
    statisticsUserDetailTheory: StatisticsUserDetailTheoryType | null
    statisticsUserDetailTest: StatisticsUserDetailTheoryType | null
    statisticsUserDetailLab: StatisticsUserDetailTheoryType | null
}
const initialState = {
    boughtCourses: [],
    courseLessons: {},
    listAllCourses: null,
    courseDetail: {},
    lessonDetail: {},
    theoryDetail: {},
    selectedChapter: {},
    orderClick: {},
    orderPayme: {},
    statisticsTotal: [],
    statisticsCourses: [],
    statisticsCourse: [],
    statisticsLesson: [],
    statisticsTest: [],
    statisticsTheory: [],
    statisticsUserCourse: null,
    statisticsUserLesson: null,
    statisticsUserTheory: null,
    statisticsUserTest: null,
    statisticsUserDetailTheory: null,
    statisticsUserDetailTest: null,
    statisticsUserDetailLab: null
} as InitialStateType


export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        clearLesson: (state) => {
            state.courseLessons.lessons = null
        },
        clearBoughtCourser: (state) => {
            state.boughtCourses = []
        },
        setSelectedChapter: (state, action) => {
            state.selectedChapter = action.payload
        },
        clearSelectedChapter: (state, action) => {
            state.selectedChapter.clear = action.payload
        },
        renderSelectedChapter: (state, action) => {
            state.selectedChapter.render = action.payload
        },
        clearStatisticsUserDetail: (state) => {
            state.statisticsUserDetailTheory = null
            state.statisticsUserDetailTest = null
            state.statisticsUserDetailLab = null
        },
    },
    extraReducers: {
        [getBoughtCourses.fulfilled.type]: (state, action: PayloadAction<BoughtCoursesType>) => {
            state.boughtCourses = action.payload
        },
        [getCourseDetail.fulfilled.type]: (state, action: PayloadAction<CourseListType>) => {
            state.courseDetail = action.payload
        },
        [getCourseLessons.fulfilled.type]: (state, action: PayloadAction<CourseLessonsType>) => {
            state.courseLessons = action.payload
        },
        [getAllCourses.fulfilled.type]: (state, action: PayloadAction<CourseListType>) => {
            state.listAllCourses = action.payload
        },
        [getLessonDetail.fulfilled.type]: (state, action: PayloadAction<LessonDetailType>) => {
            state.lessonDetail = action.payload
        },
        [getTheoryDetail.fulfilled.type]: (state, action: PayloadAction<TheoryDetailType>) => {
            state.theoryDetail = action.payload
        },
        [getTestsDetail.fulfilled.type]: (state, action) => {
            state.testsDetail = action.payload
        },
        [orderClickCreate.fulfilled.type]: (state, action) => {
            state.orderClick = action.payload
        },
        [orderPaymeCreate.fulfilled.type]: (state, action) => {
            state.orderPayme = action.payload
        },
        [getStatisticsCourses.fulfilled.type]: (state, action) => {
            state.statisticsCourses = action.payload
        },
        [getStatisticsCourse.fulfilled.type]: (state, action) => {
            state.statisticsCourse = action.payload
        },
        [getStatisticsLesson.fulfilled.type]: (state, action) => {
            state.statisticsLesson = action.payload
        },
        [getStatisticsTest.fulfilled.type]: (state, action) => {
            state.statisticsTest = action.payload
        },
        [getStatisticsTheory.fulfilled.type]: (state, action) => {
            state.statisticsTheory = action.payload
        },
        [getStatisticsTotal.fulfilled.type]: (state, action: PayloadAction<StatisticsTotalType>) => {
            state.statisticsTotal = action.payload
        },
        [getStatisticsUserCourse.fulfilled.type]: (state, action: PayloadAction<StatisticsUserCourseType>) => {
            state.statisticsUserCourse = action.payload
        },
        [getStatisticsUserLesson.fulfilled.type]: (state, action: PayloadAction<StatisticsUserLessonType>) => {
            state.statisticsUserLesson = action.payload
        },
        [getStatisticsUserTheory.fulfilled.type]: (state, action: PayloadAction<StatisticsUserLessonType>) => {
            state.statisticsUserTheory = action.payload
        },
        [getStatisticsUserTest.fulfilled.type]: (state, action: PayloadAction<StatisticsUserLessonType>) => {
            state.statisticsUserTest = action.payload
        },
        [getStatisticsUserDetailTheory.fulfilled.type]: (state, action: PayloadAction<StatisticsUserDetailTheoryType>) => {
            state.statisticsUserDetailTheory = action.payload
        },
        [getStatisticsUserDetailTest.fulfilled.type]: (state, action: PayloadAction<StatisticsUserDetailTheoryType>) => {
            state.statisticsUserDetailTest = action.payload
        },
        [getStatisticsUserDetailLab.fulfilled.type]: (state, action: PayloadAction<StatisticsUserDetailTheoryType>) => {
            state.statisticsUserDetailLab = action.payload
        },
    }
})

export const {
    clearLesson,
    setSelectedChapter,
    clearSelectedChapter,
    clearBoughtCourser,
    renderSelectedChapter,
    clearStatisticsUserDetail
} = coursesSlice.actions
export default coursesSlice.reducer
