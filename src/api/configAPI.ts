import axios from 'axios'

export const API_URL = process.env.REACT_APP_API
const $instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

$instance.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('Token')
    return config;
})

// instance.interceptors.request.use(config => {
//     config.headers['Accept-Language'] = i18next.language;
//     return config;
// })

export default $instance;