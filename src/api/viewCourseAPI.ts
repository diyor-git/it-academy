import $instance from "./configAPI";

export const viewCourseAPI = {
    getLessonList(id: number) {
        return $instance.get(`student/lesson/list?course=${id}`).then((data) => {
            return data
        })
    },
    getLessonDetail(id: number) {
        return $instance.get(`student/lesson/detail/${id}`).then((data) => {
            return data
        })
    },
    getTheoryDetail(id: number) {
        return $instance.get(`student/theory/detail/${id}`).then((data) => {
            return data
        })
    },
    getTheoryIntroDetail(id: number) {
        return $instance.get(`student/theory/intro/detail/${id}`).then((data) => {
            return data
        })
    },
    getTheoryChapterDetail(id: number) {
        return $instance.get(`student/theory/chapter/detail/${id}`).then((data) => {
            return data
        })
    },
    getTheoryLabDetail(id: number) {
        return $instance.get(`student/theory/lab/detail/${id}`).then((data) => {
            return data
        })
    },
    patchTheoryIntroDetail(data: any) {
        return $instance.patch(`student/theory/intro/detail/${data.id}/`, {done: data.done}).then((data) => {
            return data
        })
    },
    patchTheoryChapterDetail(data: any) {
        return $instance.patch(`student/theory/chapter/detail/${data.id}/`, {done: data.done}).then((data) => {
            return data
        })
    },
    patchTheoryLabDetail(data: any) {
        return $instance.patch(`student/theory/lab/detail/${data.id}/`,
            {done: data.done, submitted: data.submitted, github: data.github},
        ).then((data) => {
            return data
        })
    },
    getTestDetail(id: number) {
        return $instance.get(`student/test/detail/${id}`).then((data) => {
            return data
        })
    },
    getTestCurrentChapter(data: any) {
        return $instance.get(`student/test/chapter/current/${data.id}?start=${data.start}`).then((data) => {
            return data
        })
    },
    sendAnswer(data: any) {
        return $instance.patch(`student/test/chapter/detail/${data.id}/`, data.answered ? {answered: data.answered} :
            {short_answer: data.short_answer}).then((data) => {
            return data
        })
    },
    getTestPoints(data: any) {
        return $instance.get(`student/test/points/${data}`).then((data) => {
            return data
        })
    },
    endTest(id: number) {
        return $instance.get(`test/end/${id}`).then((data) => {
            return data
        })
    },
}

