//VIEW COURSE
import {RootState} from "../store";

export const getLessonsListSelector = (state: RootState) => {
    return state.viewCoursePage.viewCourse
}
export const getLessonsDetailSelector = (state: RootState) => {
    return state.viewCoursePage.viewLesson
}
export const getViewTheoryDetailSelector = (state: RootState) => {
    return state.viewCoursePage.viewTheory
}
export const getInitialMenuItemSelector = (state: RootState) => {
    return state.viewCoursePage.initialMenuItem
}
export const getPassedContentSelector = (state: RootState) => {
    return state.viewCoursePage.passedContent
}
export const getPassedLabSelector = (state: RootState) => {
    return state.viewCoursePage.passedLab
}
export const getPassedLabTrialSelector = (state: RootState) => {
    return state.viewCoursePage.passedLabTrial
}
export const getTestDetailSelector = (state: RootState) => {
    return state.viewCoursePage.viewTest
}
export const getTestResultsSelector = (state: RootState) => {
    return state.viewCoursePage.testPoints
}