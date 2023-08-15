//LANDING COURSE
import {RootState} from "../store";

export const getSliderSelector = (state: RootState) => {
    return state.landingPage.slider
}
export const getListAvailableCoursesSelector = (state: RootState) => {
    return state.landingPage.listAvailableCourses
}
export const getReviewsSelector = (state: RootState) => {
    return state.landingPage.reviews
}
export const getCourseSelector = (state: RootState) => {
    return state.landingPage.course
}
export const getLandingCoursesSelector = (state: RootState) => {
    return state.landingPage.courses
}
export const getLandingCourseDetailSelector = (state: RootState) => {
    return state.landingPage.courseDetail
}
