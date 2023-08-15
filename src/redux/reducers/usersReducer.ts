import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ValidationErrors} from "./landingReducer";
import {usersAPI} from "../../api/usersAPI";
// USE REDUX-TOOLKIT

//TYPES
export type RegisterDataType = {
    data: any;
    first_name: string;
    last_name: string;
    dob: number | undefined;
    gender: string;
    email: string;
    username: string;
    password1: number | undefined;
    password2: number | undefined;
    phone: number | undefined;
    errorToken: ValidationErrors | undefined;
};
export type AuthorizationType = {
    username: string | null;
    password: string | null;
};
export type LoginDataType = {
    token: string | null;
    error: any | null;
    response: any | null;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string | null;
    permission: string;
};
export type CodeRequestType = {
    code: number;
    username: string;
};

export type BoughtCoursesType = {
    course: string;
    expiration_date: string;
    trial: boolean;
    id: number;
};
export type UsersType = {
    map: Function;
    full_name: string;
    teacher_image: string;
    teacher_description: string;
    created_at: string;
    dob: string | null;
    email: string;
    gender: string | null;
    avatar: string | null;
    id: number | null;
    username: string | null;
    first_name: string | null;
    full_time: string;
    end_time: string;
    start_time: string;
    last_name: string | null;
    is_active: boolean | null;
    permission: string | number | null;
    telegram_link: string | null;
    about: string | null;
    image: string | null;
    description: string | null;
    phone: number | null;
    points: string | null;
    position: string | null;
    all_users: number;
    gpa: string;
    gpa_graph: [date: string, rating: number];

    bought_courses: BoughtCoursesType[];
};

export type LabListType = {
    id: number;
    created_at: string;
    updated_at: string;
    start_time: string;
    end_time: string;
    complete_time: number;
    submitted: boolean;
    available: boolean;
    seen: boolean;
    done: boolean;
    again: boolean;
    theory_lab: number;
    user: number;
};
export type LabListDetailType = {
    id: number;
    points: number;
    comment: string;
    answered: string;
    created_at: string;
    updated_at: string;
    start_time: string;
    end_time: string;
    complete_time: number;
    submitted: boolean;
    available: boolean;
    seen: boolean;
    done: boolean;
    again: boolean;
    theory_lab: number;
    user: number;
};
export type PaymentHistoryType = {
    map: Function;
    length: Function;
    id: number;
    bought_date: string;
    start_date: string;
    expiration_date: string;
    payment_history: string;
    price: number;
    course_title: string;
};
export type RatingListType = {
    username: string;
    avatar: string | null;
    gpa: number | null;
    points: number | null;
    full_name: string;
    position: number;
};

export type KnowledgeBaseListType = {
    id: number;
    category: string;
    title: string;
    preview: string;
};

export type HelpListType = {
    title: string;
    telegram: string;
};

export type KnowledgeBaseDetailType = {
    id: number;
    category: number;
    title: string;
    preview: string;
    videos: KnowledgeBaseVideoDetailType[];
    books: KnowledgeBaseBookDetailType[];
};
export type KnowledgeBaseBookDetailType = {
    id: number;
    title: string;
    book: string;
    description: string | null;
    preview: string;
    kn_base: number;
};

export type KnowledgeBaseVideoDetailType = {
    id: number;
    title: string;
    video: string;
    description: string | null;
    preview: string;
    kn_base: number;
};

export type PartnersType = {
    id: number;
    created_at: string;
    updated_at: string;
    title?: string;
    link?: string | null;
    description?: string;
    photo: string;
    text?: string | null;
};

export type PortfolioType = {
    id: number;
    created_at: string;
    updated_at: string;
    photo: string;
    profile_id: number;
    avatar: string;
    full_name: string;
    title?: string | null;
    tag: string;
    skills: string;
    url: string;
    status: boolean;
    user_id: number;
};

export type ArticlesType = {
    pk: number;
    tag: string;
    title: string;
    photo: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    content: string;
};

export type MemesType = {
    id: number;
    created_at: string;
    updated_at: string;
    meme: string;
    title?: string;
    description?: string;
    mem: any;
};

export type StudentDetailType = {
    id: number;
    created_at: string;
    updated_at: string;
    dob: string;
    gender: string;
    avatar: string;
    email: string
    skills: string | null
    avatar_auth: string | null;
    permission: number;
    phone: string;
    used_trial: boolean;
    google_user: boolean;
    telegram_link: string | null;
    telegram_user: boolean;
    academy_user: boolean;
    about: string;
    student_status: number;
    num_bought_course: number;
    profession: [string];
    full_name: string;
    portfolio: [PortfolioType];
};

//THUNK
export const getAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getAllUsers();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getUserDetail = createAsyncThunk(
    "users/getUserDetail",
    async (id: number, thunkAPI) => {
        try {
            const response = await usersAPI.getUserDetail(id);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const putUserDetail = createAsyncThunk(
    "users/putUserDetail",
    async (data: UsersType, thunkAPI) => {
        try {
            const response = await usersAPI.putUserDetail(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getTeacherList = createAsyncThunk(
    "users/getTeacherList",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getTeacherList();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getLabList = createAsyncThunk(
    "users/getLabList",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getLabList();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getLabDetail = createAsyncThunk(
    "users/getLabDetail",
    async (id: number, thunkAPI) => {
        try {
            const response = await usersAPI.getLabDetail(id);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const patchLabDetail = createAsyncThunk(
    "users/patchLabDetail",
    async (data: any, thunkAPI) => {
        try {
            const response = await usersAPI.patchLabDetail(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getProfile = createAsyncThunk(
    "users/getProfile",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getProfile();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "users/updateProfile",
    async (file: any, thunkAPI) => {
        try {
            const response = await usersAPI.updateProfile(file);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);
export const createUser = createAsyncThunk(
    "users/createUser",
    async (data: UsersType, thunkAPI) => {
        try {
            const response = await usersAPI.createUser(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getRatingList = createAsyncThunk(
    "users/getRatingList",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getRatingList();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const changePassword = createAsyncThunk(
    "users/changePassword",
    async (data: any, thunkAPI) => {
        try {
            const response = await usersAPI.changePassword(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getKnowledgeBaseList = createAsyncThunk(
    "users/getKnowledgeBaseList",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getKnowledgeBaseList();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const createKnowledgeBase = createAsyncThunk(
    "users/createKnowledgeBase",
    async (data: any, thunkAPI) => {
        try {
            const response = await usersAPI.createKnowledgeBase(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getKnowledgeBaseDetail = createAsyncThunk(
    "users/getKnowledgeBaseDetail",
    async (id: number, thunkAPI) => {
        try {
            const response = await usersAPI.getKnowledgeBaseDetail(id);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const createBaseBook = createAsyncThunk(
    "users/createBaseBook",
    async (data: any, thunkAPI) => {
        try {
            const response = await usersAPI.createBaseBook(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const createBaseVideo = createAsyncThunk(
    "users/createBaseVideo",
    async (data: any, thunkAPI) => {
        try {
            const response = await usersAPI.createBaseVideo(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getHelp = createAsyncThunk(
    "courses/getHelp",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getHelp();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getProfileStatistics = createAsyncThunk(
    "courses/getProfileStatistics",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getProfileStatistics();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getNotificationsList = createAsyncThunk(
    "courses/getNotificationsList",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getNotificationsList();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getPaymentHistory = createAsyncThunk(
    "courses/getPaymentHistory",
    async (id: any, thunkAPI) => {
        try {
            const response = await usersAPI.getPaymentHistory(id);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteAccount = createAsyncThunk(
    "courses/deleteAccount",
    async (id: any, thunkAPI) => {
        try {
            const response = await usersAPI.deleteAccount(id);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getPartners = createAsyncThunk(
    "users/getPartners",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getPartners();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const postPartners = createAsyncThunk(
    "users/postPartners",
    async (data: PartnersType, thunkAPI) => {
        try {
            const response = await usersAPI.postPartners(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getPortfolio = createAsyncThunk(
    "users/getPortfolio",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getPortfolio();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);
export const patchPortfolio = createAsyncThunk(
    "users/patchPortfolio",
    async (data: PortfolioType, thunkAPI) => {
        try {
            const response = await usersAPI.patchPortfolio(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const postMem = createAsyncThunk(
    "users/postMem",
    async (data: MemesType, thunkAPI) => {
        try {
            const response = await usersAPI.postMemes(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getArticles = createAsyncThunk(
    "users/getArticles",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getArticles();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getArticleDetail = createAsyncThunk(
    "users/getArticleDetail",
    async (id: number, thunkAPI) => {
        try {
            const response = await usersAPI.getArticleDetail(id);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getMemes = createAsyncThunk(
    "users/getMemes",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getMemes();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);
export const postArticles = createAsyncThunk(
    "users/postArticles",
    async (data: ArticlesType, thunkAPI) => {
        try {
            const response = await usersAPI.postArticle(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const postPortfolio = createAsyncThunk(
    "users/postPortfolio",
    async (data: PortfolioType, thunkAPI) => {
        try {
            const response = await usersAPI.postPortfolio(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getStudentDetail = createAsyncThunk(
    "users/getStudentDetail",
    async (id: number, thunkAPI) => {
        try {
            const response = await usersAPI.getStudentDetail(id);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

type InitialStateType = {
    users: UsersType | null;
    profile: UsersType | null;
    userDetail: UsersType | null;
    teacherList: UsersType | [];
    labList: LabListType[];
    ratingList: RatingListType[];
    labDetail: LabListDetailType[];
    knowledgeBaseList: KnowledgeBaseListType[];
    knowledgeBaseDetail: KnowledgeBaseDetailType | null;
    paymentHistory: PaymentHistoryType[];
    profileStatistics: UsersType | [];
    helpList: HelpListType[];
    notificationsList: any;
    drawerOpen: boolean;
    notificationsOpen: boolean;
    partners: [PartnersType] | [];
    portfolio: [PortfolioType] | [];
    articles: [ArticlesType] | [];
    articleDetail: ArticlesType | null;
    memes: [MemesType] | [];
    studentDetail: StudentDetailType | null;
};
const initialState = {
    users: null,
    profile: null,
    userDetail: null,
    teacherList: [],
    labList: [],
    ratingList: [],
    knowledgeBaseList: [],
    knowledgeBaseDetail: null,
    labDetail: [],
    helpList: [],
    profileStatistics: [],
    notificationsList: [],
    paymentHistory: [],
    drawerOpen: false,
    notificationsOpen: false,
    partners: [],
    portfolio: [],
    articles: [],
    articleDetail: null,
    memes: [],
    studentDetail: null,
} as InitialStateType;

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearUserDetail: (state) => {
            state.userDetail = null;
        },
        clearArticleDetail: (state) => {
            state.articleDetail = null;
        },
        clearProfile: (state) => {
            state.profile = null;
        },
        setDrawer: (state, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        },
        setNotificationsOpen: (state, action: PayloadAction<boolean>) => {
            state.notificationsOpen = action.payload;
        },
    },
    extraReducers: {
        [getAllUsers.fulfilled.type]: (state, action: PayloadAction<UsersType>) => {
            state.users = action.payload;
        },
        [getUserDetail.fulfilled.type]: (
            state,
            action: PayloadAction<UsersType>
        ) => {
            state.userDetail = action.payload;
        },
        [getTeacherList.fulfilled.type]: (
            state,
            action: PayloadAction<UsersType>
        ) => {
            state.teacherList = action.payload;
        },
        [getLabList.fulfilled.type]: (state, action) => {
            state.labList = action.payload;
        },
        [getLabDetail.fulfilled.type]: (state, action) => {
            state.labDetail = action.payload;
        },
        [getProfile.fulfilled.type]: (state, action) => {
            state.profile = action.payload;
        },
        [getKnowledgeBaseList.fulfilled.type]: (state, action) => {
            state.knowledgeBaseList = action.payload;
        },
        [getKnowledgeBaseDetail.fulfilled.type]: (state, action) => {
            state.knowledgeBaseDetail = action.payload;
        },
        [getRatingList.fulfilled.type]: (state, action) => {
            state.ratingList = action.payload;
        },
        [getHelp.fulfilled.type]: (state, action) => {
            state.helpList = action.payload;
        },
        [getProfileStatistics.fulfilled.type]: (state, action) => {
            state.profileStatistics = action.payload;
        },
        [getNotificationsList.fulfilled.type]: (state, action) => {
            state.notificationsList = action.payload;
        },
        [getPaymentHistory.fulfilled.type]: (state, action) => {
            state.paymentHistory = action.payload;
        },
        [getPartners.fulfilled.type]: (state, action) => {
            state.partners = action.payload;
        },
        [getArticles.fulfilled.type]: (state, action) => {
            state.articles = action.payload;
        },
        [getArticleDetail.fulfilled.type]: (state, action) => {
            state.articleDetail = action.payload;
        },
        [getMemes.fulfilled.type]: (state, action) => {
            state.memes = action.payload;
        },
        [getPortfolio.fulfilled.type]: (state, action) => {
            state.portfolio = action.payload;
        },
        [getStudentDetail.fulfilled.type]: (state, action) => {
            state.studentDetail = action.payload;
        },
    },
});

export const {
    clearUserDetail,
    setDrawer,
    setNotificationsOpen,
    clearProfile,
    clearArticleDetail,
} = usersSlice.actions;
export default usersSlice.reducer;
