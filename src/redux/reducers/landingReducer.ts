import { courseAPI } from "../../api/landingAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactAPI } from "../../api/authorizationAPI";
// USE REDUX-TOOLKIT

// TYPES
export type ValidationErrors = {
  errorMessage: string;
  error: any;
  message: any;
  non_field_errors: any;
  field_errors: Record<string, string>;
};
export type CourseDetailType = {
  id: number;
  title: string;
  slug: string;
  duration: string;
  price: number;
  teacher_name: string;
  teacher_image: string;
  teacher_description: string;
  learn: LearnType | null;
};
export type LearnType = {
  id: number;
  tip: string;
  sub_tip: string;
};
export type CourseListType = {
  id: number;
  active: boolean;
  title: string;
  title_lms: string;
  slug: string;
  teacher_name: string;
  is_bought: boolean;
  github: string;
  image: string;
  image_lms: string;
  map: Function;
};
export type SalaryType = {
  id: number;
  created_at: string;
  updated_at: string;
  num: number;
  vacancies: string;
};
export type RisesType = {
  id: number;
  created_at: string;
  updated_at: string;
  photo: string;
  title: string | null;
};
export type CodsType = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  text: string;
};
export type ProgramsType = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  text: string;
};
export type ImagesType = {
  id: number;
  created_at: string;
  updated_at: string;
  photo: string;
};
export type CausesType = {
  id: number;
  created_at: string;
  updated_at: string;
  text: string;
};
export type LandingCourse = {
  id: number;
  title: string;
  duration: string;
  language: string;
  beadev_title: string;
  start: string;
  iframe: string;
  causes: [CausesType];
  salary: [SalaryType];
  rises: [RisesType];
  cods: [CodsType];
  programs: [ProgramsType];
  images: [ImagesType];
};
export type SendEmailType = {
  email: string;
  phone: number;
  comment: string;
};
export type ReviewsType = {
  full_name: string;
  image: string;
  description: string;
  map: any;
};
export type SliderType = {
  title: string;
  image: string;
  children: [
    {
      id: number;
      title: string;
      description: string;
    }
  ];
};

//THUNK
export const sendEmail = createAsyncThunk(
  "landing/sendEmail",
  async (data: SendEmailType, thunkAPI) => {
    try {
      const response = await contactAPI.sendEmail(data);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const getAvailableCourses = createAsyncThunk<CourseListType>(
  "landing/getListAvailableCourses",
  async (rejectWithValue: any) => {
    try {
      const response = await courseAPI.getAvailableCourses();
      return response.data as CourseListType;
    } catch (err) {
      let error: any = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLandingCourses = createAsyncThunk(
  "courses/getLandingCourses",
  async (__, thunkAPI) => {
    try {
      const response = await courseAPI.getLandingCourses();
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const getLandingCourseDetail = createAsyncThunk(
  "courses/getLandingCourseDetail",
  async (id: number, thunkAPI) => {
    try {
      const response = await courseAPI.getLandingCourseDetail(id);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

type InitialStateType = {
  course: CourseDetailType | null;
  listAvailableCourses: CourseListType | [];
  reviews: ReviewsType | null;
  slider: SliderType | null;
  error: string | null;
  courses: [LandingCourse] | null;
  courseDetail: LandingCourse | null;
};

const initialState = {
  courses: null,
  courseDetail: null,
  course: null,
  listAvailableCourses: [],
} as InitialStateType;

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
  extraReducers: {
    [getAvailableCourses.fulfilled.type]: (state, action: any) => {
      state.listAvailableCourses = action.payload;
    },
    [getLandingCourses.fulfilled.type]: (state, action) => {
      state.courses = action.payload;
    },
    [getLandingCourseDetail.fulfilled.type]: (state, action) => {
      state.courseDetail = action.payload;
    },
  },
});
//export const {} = landingSlice.actions
export default landingSlice.reducer;
