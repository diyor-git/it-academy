import {CourseDetailType, CourseListType, ReviewsType, SliderType} from "../redux/reducers/landingReducer";
import $instance from './configAPI';
import axios, {AxiosResponse} from "axios";
export const API_URL = process.env.REACT_APP_API;
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});
export const courseAPI = {
    getAvailableCourses(): Promise<AxiosResponse<CourseListType>> {
        return $instance.get<CourseListType>(`course/available/list`).then((data) => {
            return data
        })
    },
    getCourseDetail(slug: string): Promise<AxiosResponse<CourseDetailType>> {
        return $instance.get<CourseDetailType>(`course/detail/${slug}`).then((data) => {
            return data
        })
    },
    getReviews(): Promise<AxiosResponse<ReviewsType>> {
        return $instance.get<ReviewsType>(`feedback/list`).then((data) => {
            return data
        })
    },
    getSlider(slug: string): Promise<AxiosResponse<SliderType>> {
        return $instance.get(`course/${slug}/slider/list`).then((data) => {
            return data
        })
    },
    getLandingCourses() {
        return instance.get<CourseDetailType>(`landing/course`).then((data) => {
            return data
        })
    },
    getLandingCourseDetail(id: number) {
        return instance.get<CourseDetailType>(`landing/course/${id}`).then((data) => {
            return data
        })
    },
}

