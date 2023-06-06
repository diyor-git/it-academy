import {
    BoughtCoursesType,
    CourseLessonsType,
    LabType,
    LessonDetailType,
    StatisticsTotalType,
    StatisticsUserCourseType,
    StatisticsUserLessonType,
    TheoryDetailType
} from "../redux/reducers/coursesReducer";
import {CourseListType} from "../redux/reducers/landingReducer";
import $instance from './configAPI';
import axios, {AxiosResponse} from "axios";

export const API_URL = process.env.REACT_APP_API
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const coursesAPI = {
    getAllCourses(): Promise<AxiosResponse<CourseListType>> {
        return $instance.get<CourseListType>(`course/list`).then((response) => {
            return response
        })
    },
    getCourseDetail(id: number): Promise<AxiosResponse<CourseListType>> {
        return $instance.get<CourseListType>(`course/detail/${id}`).then((response) => {
            return response
        })
    },
    getBoughtCourses(): Promise<AxiosResponse<BoughtCoursesType>> {
        return $instance.get<BoughtCoursesType>(`course/bought/list`).then((response) => {
            return response
        })
    },
    getCourseLessons(id: number): Promise<AxiosResponse<CourseLessonsType>> {
        return $instance.get<CourseLessonsType>(`lesson/list/?course=${id}`).then((response) => {
            return response
        })
    },
    createCourse(data: any) {
        const formData = new FormData()
        formData.append('active', data.active)
        formData.append('duration', data.duration)
        formData.append('image', data.image)
        formData.append('image_lms', data.image_lms)
        formData.append('price', data.price)
        formData.append('mentors', data.mentors)
        formData.append('teacher', data.teacher)
        formData.append('title', data.title)
        formData.append('title_lms', data.title_lms)
        formData.append('telegram', data.telegram)
        return $instance.post(`course/create/`, formData).then((response: any) => {
            return response.data;
        })
    },
    createLesson(data: any) {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('active', data.active)
        formData.append('preview', data.preview)
        formData.append('banner', data.banner)
        formData.append('activation_day', data.activation_day)
        formData.append('lab_percentage', data.lab_percentage)
        formData.append('test_percentage', data.test_percentage)
        formData.append('course', data.course)
        formData.append('recommend_end', data.recommend_end)
        return $instance.post(`lesson/create/`, formData).then((response: any) => {
            return response.data;
        })
    },
    getLessonDetail(id: any) {
        return $instance.get(`lesson/detail/${id}`).then((response) => {
            return response
        })
    },
    createTheory(data: any): Promise<AxiosResponse<LessonDetailType>> {
        return $instance.post<LessonDetailType>(`theory/create/`, data).then((response) => {
            return response
        })
    },
    createTests(data: any): Promise<AxiosResponse<LessonDetailType>> {
        return $instance.post<LessonDetailType>(`test/create/`, data).then((response) => {
            return response
        })
    },
    getTheoryDetail(id: number): Promise<AxiosResponse<TheoryDetailType>> {
        return $instance.get(`theory/detail/${id}`).then((response) => {
            return response
        })
    },
    sendPhoto(file: any) {
        const formData = new FormData()
        formData.append('image', file)
        return $instance.post(`editor/image/create/`, formData).then((response: any) => {
            return response.data;
        })
    },
    sendLink() {
        return $instance.get(`editor/parser/`).then((response: any) => {
            return response.data;
        })
    },
    createTheoryIntro(data: any) {
        const formData: any = new FormData()
        formData.append('theory', data.theory)
        formData.append('image', data.image)
        formData.append('title', data.title)
        formData.append('text', JSON.stringify(data.text))
        return $instance.post(`theory/intro/create/`, formData).then((response: any) => {
            return response.data;
        })
    },
    createTheoryChapter(data: any) {
        return $instance.post(`theory/chapter/create/`, data).then((response: any) => {
            return response.data;
        })
    },
    createTheoryLab(data: LabType) {
        return $instance.post(`theory/lab/create/`, data).then((response: any) => {
            return response.data;
        })
    },
    getTestsDetail(id: number) {
        return $instance.get(`test/detail/${id}`).then((response: any) => {
            return response
        })
    },
    createTestsIntro(data: any) {
        const formData: any = new FormData()
        formData.append('test', data.test)
        formData.append('image', data.image)
        formData.append('title', data.title)
        formData.append('greetings', data.greetings)
        formData.append('text', JSON.stringify(data.text))
        return $instance.post(`test/intro/create/`, formData).then((response: any) => {
            return response.data;
        })
    },
    updateTestsIntro(data: any) {
        const formData: any = new FormData()
        data.test && formData.append('test', data.test)
        data.image && formData.append('image', data.image)
        data.title && formData.append('title', data.title)
        data.greetings && formData.append('greetings', data.greetings)
        data.text && formData.append('text', JSON.stringify(data.text))
        return $instance.patch(`test/intro/detail/${data.id}/`, formData).then((response: any) => {
            return response
        })
    },
    createTestsChapter(data: any) {
        const formData: any = new FormData()
        formData.append('test', data.test)
        formData.append('image', data.image)
        formData.append('title', data.title)
        formData.append('question', data.question)
        formData.append('type', data.type)
        formData.append('short_answer', data.short_answer)
        formData.append('variants', JSON.stringify(data.variants))
        formData.append('feedback_true', JSON.stringify(data.feedback_true))
        formData.append('feedback_false', JSON.stringify(data.feedback_false))
        formData.append('text', JSON.stringify(data.text))
        return $instance.post(`test/chapter/create/`, formData).then((response: any) => {
            return response.data;
        })
    },
    updateTestsChapter(data: any) {
        const formData: any = new FormData()
        data.test && formData.append('test', data.test)
        data.image && formData.append('image', data.image)
        data.title && formData.append('title', data.title)
        data.question && formData.append('question', data.question)
        data.type && formData.append('type', data.type)
        data.short_answer && formData.append('short_answer', data.short_answer)
        data.variants && formData.append('variants', JSON.stringify(data.variants))
        data.feedback_true && formData.append('feedback_true', JSON.stringify(data.feedback_true))
        data.feedback_false && formData.append('feedback_false', JSON.stringify(data.feedback_false))
        data.text && formData.append('text', JSON.stringify(data.text))
        return $instance.patch(`test/chapter/detail/${data.id}/`, formData).then((response: any) => {
            return response
        })
    },
    getTrial(id: number) {
        return $instance.post(`course/trial/`, id).then((response: any) => {
            return response.data;
        })
    },
    updateTheoryIntro(data: any) {
        const formData: any = new FormData()
        data.test && formData.append('test', data.test)
        data.image && formData.append('image', data.image)
        data.title && formData.append('title', data.title)
        data.greetings && formData.append('greetings', data.greetings)
        data.text && formData.append('text', JSON.stringify(data.text))
        return $instance.patch(`theory/intro/detail/${data.id}/`, formData).then((response: any) => {
            return response.data;
        })
    },
    updateTheoryChapter(data: any) {
        return $instance.patch(`theory/chapter/detail/${data.id}/`, data).then((response: any) => {
            return response.data;
        })
    },
    updateTheoryLab(data: any) {
        return $instance.patch(`theory/lab/detail/${data.id}/`, data).then((response: any) => {
            return response.data;
        })
    },
    orderClickCreate(data: any) {
        return $instance.post(`dashboard/order/create/`, data).then((response: any) => {
            return response
        })
    },
    orderPaymeCreate(data: any) {
        return $instance.post(`dashboard/order/payme/create/`, data).then((response: any) => {
            return response
        })
    },
    assignCourse(data: any) {
        return $instance.post(`course/assign/`, data).then((response: any) => {
            return response
        })
    },
    saveHistory(data: any) {
        return $instance.post(`dashboard/save/history/`, data).then((response: any) => {
            return response
        })
    },
    getStatisticsCourses() {
        return $instance.get(`dashboard/statistics/courses`).then((data: any) => {
            return data
        })
    },
    getStatisticsCourse(id: number) {
        return $instance.get(`dashboard/statistics/course/${id}`).then((data: any) => {
            return data
        })
    },
    getStatisticsLesson(id: number) {
        return $instance.get(`dashboard/statistics/lesson/${id}`).then((data: any) => {
            return data
        })
    },
    getStatisticsTest(id: number) {
        return $instance.get(`dashboard/statistics/test/${id}`).then((data: any) => {
            return data
        })
    },
    getStatisticsTheory(id: number) {
        return $instance.get(`dashboard/statistics/theory/${id}`).then((data: any) => {
            return data
        })
    },
    getStatisticsTotal(): Promise<AxiosResponse<StatisticsTotalType>> {
        return $instance.get(`dashboard/statistics/total/`).then((data: any) => {
            return data
        })
    },
    getStatisticsUserCourse(data: any): Promise<AxiosResponse<StatisticsUserCourseType>> {
        return $instance.get<StatisticsUserCourseType>(`dashboard/statistics/user/course/${data.user_id}?course=${data.course_id}`).then((response) => {
            return response
        })
    },
    getStatisticsUserLesson(id: number): Promise<AxiosResponse<StatisticsUserLessonType>> {
        return $instance.get<StatisticsUserLessonType>(`dashboard/statistics/user/lesson/${id}`).then((data) => {
            return data
        })
    },
    getStatisticsUserTheory(id: number): Promise<AxiosResponse<StatisticsUserLessonType>> {
        return $instance.get<StatisticsUserLessonType>(`dashboard/statistics/user/theory/${id}`).then((data) => {
            return data
        })
    },
    getStatisticsUserTest(id: number): Promise<AxiosResponse<StatisticsUserLessonType>> {
        return $instance.get<StatisticsUserLessonType>(`dashboard/statistics/user/test/${id}`).then((data) => {
            return data
        })
    },
    getStatisticsUserDetailTheory(data: any): Promise<AxiosResponse<StatisticsUserLessonType>> {
        //if intro is false then don't send intro at all
        return $instance.get<StatisticsUserLessonType>(`/dashboard/statistics/user/detail/theory/${data.course}${data.intro === 'true' ? `?intro=true` : ''}`).then((data) => {
            return data
        })
    },
    getStatisticsUserDetailTest(data: any): Promise<AxiosResponse<StatisticsUserLessonType>> {
        //if intro is false then don't send intro at all
        return $instance.get<StatisticsUserLessonType>(`/dashboard/statistics/user/detail/test/${data.course}${data.intro === 'true' ? `?intro=true` : ''}`).then((data) => {
            return data
        })
    },
    getStatisticsUserDetailLab(id: number): Promise<AxiosResponse<StatisticsUserLessonType>> {
        return $instance.get<StatisticsUserLessonType>(`/dashboard/statistics/user/detail/lab/${id}`).then((data) => {
            return data
        })
    },
}

