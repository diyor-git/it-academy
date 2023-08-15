//REGISTRATION + LOGIN
import {RootState} from "../store";

export const getBoughtCoursesSelector = (state: RootState) => {
    return state.coursesPage.boughtCourses
}

export const getAllCoursesSelector = (state: RootState) => {
    return state.coursesPage.listAllCourses
}

export const getCourseLessonSelector = (state: RootState) => {
    return state.coursesPage.courseLessons
}

export const getLessonDetailSelector = (state: RootState) => {
    return state.coursesPage.lessonDetail
}

export const getTheoryDetailSelector = (state: RootState) => {
    return state.coursesPage.theoryDetail
}

export const getTestsDetailSelector = (state: RootState) => {
    return state.coursesPage.testsDetail
}

export const getSelectedChapterSelector = (state: RootState) => {
    return state.coursesPage.selectedChapter
}

export const getOrderClickSelector = (state: RootState) => {
    return state.coursesPage.orderClick
}

export const getOrderPaymeSelector = (state: RootState) => {
    return state.coursesPage.orderPayme
}

export const getStatisticsTotalSelector = (state: RootState) => {
    return state.coursesPage.statisticsTotal
}

export const getStatisticsCoursesSelector = (state: RootState) => {
    return state.coursesPage.statisticsCourses
}

export const getStatisticsCourseSelector = (state: RootState) => {
    return state.coursesPage.statisticsCourse
}

export const getStatisticsLessonSelector = (state: RootState) => {
    return state.coursesPage.statisticsLesson
}

export const getStatisticsTestSelector = (state: RootState) => {
    return state.coursesPage.statisticsTest
}

export const getStatisticsTheorySelector = (state: RootState) => {
    return state.coursesPage.statisticsTheory
}

export const getStatisticsUserCourseSelector = (state: RootState) => {
    return state.coursesPage.statisticsUserCourse
}

export const getStatisticsUserLessonSelector = (state: RootState) => {
    return state.coursesPage.statisticsUserLesson
}

export const getStatisticsUserTheorySelector = (state: RootState) => {
    return state.coursesPage.statisticsUserTheory
}

export const getStatisticsUserTestSelector = (state: RootState) => {
    return state.coursesPage.statisticsUserTest
}

export const getStatisticsUserDetailTheorySelector = (state: RootState) => {
    return state.coursesPage.statisticsUserDetailTheory
}

export const getStatisticsUserDetailTestSelector = (state: RootState) => {
    return state.coursesPage.statisticsUserDetailTest
}

export const getStatisticsUserDetailLabSelector = (state: RootState) => {
    return state.coursesPage.statisticsUserDetailLab
}