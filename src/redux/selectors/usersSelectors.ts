//LANDING COURSE
import {RootState} from "../store";

export const getAllUsersSelector = (state: RootState) => {
    return state.usersPage.users
}

export const getUserDetailSelector = (state: RootState) => {
    return state.usersPage.userDetail
}

export const getTeacherListSelector = (state: RootState) => {
    return state.usersPage.teacherList
}

export const getLabListSelector = (state: RootState) => {
    return state.usersPage.labList
}
export const getRatingListSelector = (state: RootState) => {
    return state.usersPage.ratingList
}
export const getLabDetailSelector = (state: RootState) => {
    return state.usersPage.labDetail
}

export const getProfileSelector = (state: RootState) => {
    return state.usersPage.profile
}

export const getProfileStatisticsSelector = (state: RootState) => {
    return state.usersPage.profileStatistics
}

export const getKnowledgeBaseListSelector = (state: RootState) => {
    return state.usersPage.knowledgeBaseList
}

export const getKnowledgeBaseDetailSelector = (state: RootState) => {
    return state.usersPage.knowledgeBaseDetail
}

export const getHelpListSelector = (state: RootState) => {
    return state.usersPage.helpList
}

export const getNotificationListSelector = (state: RootState) => {
    return state.usersPage.notificationsList
}

export const getDrawerSelector = (state: RootState) => {
    return state.usersPage.drawerOpen
}

export const getNotificationsOpenSelector = (state: RootState) => {
    return state.usersPage.notificationsOpen
}

export const getPaymentHistorySelector = (state: RootState) => {
    return state.usersPage.paymentHistory
}

export const getPartnersSelector = (state: RootState) => {
    return state.usersPage.partners
}

export const getArticlesSelector = (state: RootState) => {
    return state.usersPage.articles
}

export const getArticleDetailSelector = (state: RootState) => {
    return state.usersPage.articleDetail
}

export const getMemesSelector = (state: RootState) => {
    return state.usersPage.memes
}

export const getPortfolioSelector = (state: RootState) => {
    return state.usersPage.portfolio
}

export const getStudentDetailSelector = (state: RootState) => {
    return state.usersPage.studentDetail
}