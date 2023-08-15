import {
    ArticlesType,
    LabListDetailType,
    LabListType,
    MemesType,
    PartnersType,
    PaymentHistoryType,
    PortfolioType,
    StudentDetailType,
    UsersType,
} from "../redux/reducers/usersReducer";
import $instance from "./configAPI";
import axios, {AxiosResponse} from "axios";

export const API_URL = process.env.REACT_APP_API;
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const usersAPI = {
    getAllUsers(): Promise<AxiosResponse<UsersType>> {
        return $instance.get<UsersType>(`account/user/list`).then((res) => {
            return res;
        });
    },
    getUserDetail(id: number): Promise<AxiosResponse<UsersType>> {
        return $instance.get<UsersType>(`account/user/detail/${id}`).then((res) => {
            return res;
        });
    },
    putUserDetail(data: any) {
        const formData = new FormData();
        formData.append("id", data.id);
        data.image && formData.append("image", data.image);
        data.description && formData.append("description", data.description);
        data.permission && formData.append("permission", data.permission);
        formData.append("username", data.username);
        return $instance
            .patch(`account/user/detail/${data.id}/`, formData)
            .then((res: any) => {
                return res.data;
            });
    },
    createUser(data: UsersType) {
        return $instance.post<UsersType>(`/account/create/`, data).then((res) => {
            return res;
        });
    },
    getTeacherList() {
        return $instance.get<UsersType>(`teacher/list`).then((res) => {
            return res;
        });
    },
    getLabList(): Promise<AxiosResponse<LabListType>> {
        return $instance.get<LabListType>(`mentor/theory/lab/list/`).then((res) => {
            return res;
        });
    },
    getLabDetail(id: number): Promise<AxiosResponse<LabListDetailType>> {
        return $instance
            .get<LabListDetailType>(`mentor/theory/lab/detail/${id}`)
            .then((res) => {
                return res;
            });
    },
    patchLabDetail(data: any) {
        return $instance
            .patch(`mentor/theory/lab/detail/${data.id}/`, data)
            .then((res: any) => {
                return res;
            });
    },
    getProfile() {
        return $instance.get(`account/profile`).then((res: any) => {
            return res;
        });
    },
    updateProfile(data: any) {
        const formData = new FormData();
        data.avatar && formData.append("avatar", data.avatar);
        data.first_name && formData.append("first_name", data.first_name);
        data.last_name && formData.append("last_name", data.last_name);
        data.username && formData.append("username", data.username);
        data.about && formData.append("about", data.about);
        data.skills && formData.append("skills", data.skills);
        data.telegram_link && formData.append("telegram_link", data.telegram_link);
        data.email && formData.append("email", data.email);
        data.phone && formData.append("phone", data.phone);
        data.dob && formData.append("dob", data.dob);
        data.gender && formData.append("gender", data.gender);
        data.old_password && formData.append("old_password", data.old_password);
        data.new_password && formData.append("new_password", data.new_password);
        data.new_password2 && formData.append("new_password2", data.new_password2);
        return $instance.patch("account/profile/", formData).then((data: any) => {
            return data;
        });
    },
    getRatingList() {
        return $instance.get(`dashboard/statistics`).then((res: any) => {
            return res;
        });
    },
    changePassword(data: any) {
        return $instance
            .patch(`account/password/change/`, data)
            .then((res: any) => {
                return res;
            });
    },
    getKnowledgeBaseList() {
        return $instance.get(`dashboard/base/list`).then((res: any) => {
            return res;
        });
    },
    createKnowledgeBase(data: any) {
        const formData = new FormData();
        formData.append("preview", data.preview);
        formData.append("title", data.title);
        formData.append("category", data.category);
        return $instance
            .post(`dashboard/base/create/`, formData)
            .then((res: any) => {
                return res;
            });
    },
    getKnowledgeBaseDetail(id: number) {
        return $instance.get(`dashboard/base/detail/${id}`).then((res: any) => {
            return res;
        });
    },
    createBaseBook(data: any) {
        const formData = new FormData();
        data.preview && formData.append("preview", data.preview);
        data.title && formData.append("title", data.title);
        data.book && formData.append("book", data.book);
        data.kn_base && formData.append("kn_base", data.kn_base);
        return $instance
            .post(`dashboard/base/book/create/`, formData)
            .then((res: any) => {
                return res;
            });
    },
    createBaseVideo(data: any) {
        const formData = new FormData();
        data.preview && formData.append("preview", data.preview);
        data.title && formData.append("title", data.title);
        data.video && formData.append("video", data.video);
        data.kn_base && formData.append("kn_base", data.kn_base);
        return $instance
            .post(`dashboard/base/video/create/`, formData)
            .then((res: any) => {
                return res;
            });
    },
    getHelp() {
        return $instance.get(`dashboard/help/list`).then((res: any) => {
            return res;
        });
    },
    getProfileStatistics() {
        return $instance.get(`dashboard/profile`).then((res: any) => {
            return res;
        });
    },
    getNotificationsList() {
        return $instance.get(`dashboard/notification/list`).then((res: any) => {
            return res;
        });
    },
    getPaymentHistory(id: any): Promise<AxiosResponse<PaymentHistoryType>> {
        return $instance
            .post<PaymentHistoryType>(`account/payment/history/`, id)
            .then((res) => {
                return res;
            });
    },
    deleteAccount(id: any): Promise<AxiosResponse<any>> {
        return $instance
            .delete<PaymentHistoryType>(`account/${id}/delete/`)
            .then((res) => {
                return res;
            });
    },
    getPartners() {
        return instance.get<PartnersType>(`partners`).then((res) => {
            return res;
        });
    },

    postPartners(data: PartnersType) {
        const formData = new FormData();
        formData.append("photo", data.photo);
        data.title && formData.append("title", data.title);
        data.description && formData.append("description", data.description);
        data.link && formData.append("link", data.link);
        return $instance.post<PartnersType>(`partners/`, formData).then((res) => {
            return res;
        });
    },
    postPortfolio(data: PortfolioType) {
        const formData = new FormData();
        data.photo && formData.append("photo", data.photo);
        data.title && formData.append("title", data.title);
        data.tag && formData.append("tag", data.tag);
        data.skills && formData.append("skills", data.skills);
        data.url && formData.append("url", data.url);
        return $instance.post(`account/portfolio/`, formData).then((res) => {
            return res;
        });
    },
    getPortfolio() {
        return instance.get<PortfolioType>(`account/portfolio/`).then((res) => {
            return res;
        });
    },

    getArticles() {
        return instance.get<ArticlesType>(`blog`).then((res) => {
            return res;
        });
    },

    getArticleDetail(id: number) {
        return instance.get<ArticlesType>(`blog/${id}`).then((res) => {
            return res;
        });
    },

    getMemes() {
        return instance.get<ArticlesType>(`blog/memes`).then((res) => {
            return res;
        });
    },
    postMemes(data: MemesType) {
        const formData: any = new FormData();
        data.mem && formData.append("meme", data.mem);
        data.title && formData.append("title", data.title);
        data.description && formData.append("description", data.description);
        return $instance.post(`blog/memes/`, formData).then((response: any) => {
            return response.data;
        });
    },

    postArticle(data: ArticlesType) {
        const formData: any = new FormData();
        data.photo && formData.append("photo", data.photo);
        data.title && formData.append("title", data.title);
        data.description && formData.append("description", data.description);
        data.tag && formData.append("tag", data.tag);
        data.content && formData.append("content", JSON.stringify(data.content));
        return $instance.post(`blog/`, formData).then((response: any) => {
            return response.data;
        });
    },

    patchPortfolio(data: PortfolioType) {
        const formData: any = new FormData();
        data.photo && formData.append("photo", data.photo);
        data.title && formData.append("title", data.title);
        data.tag && formData.append("tag", data.tag);
        data.skills && formData.append("skills", data.skills);
        if (data.status !== undefined) {formData.append("status", data.status);}
        data.url && formData.append("url", data.url);
        return $instance.patch(`account/portfolio/${data.id}/`, formData).then((response: any) => {
                return response.data;
            });
    },
    getStudentDetail(id: number) {
        return instance
            .get<StudentDetailType>(`/account/user/retrieve/${id}/`)
            .then((res) => {
                return res;
            });
    },
};
