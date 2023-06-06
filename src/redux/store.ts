import { configureStore } from '@reduxjs/toolkit'
import landingReducer from './reducers/landingReducer'
import registerReducer from './reducers/authorizationReducer'
import coursesReducer from './reducers/coursesReducer'
import usersReducer from "./reducers/usersReducer";
import viewCourseReducer from "./reducers/viewCourseReducer";

export const store = configureStore({
    devTools: true,
    reducer: {
        landingPage: landingReducer,
        registerPage: registerReducer,
        coursesPage: coursesReducer,
        usersPage: usersReducer,
        viewCoursePage: viewCourseReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch