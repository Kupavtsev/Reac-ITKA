import * as axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d53023ab-c51d-4d61-b36a-47160fb42243"
    }
});

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => { return response.data });
    },
    follow(userId) { return instance.post(`follow/${userId}`) },
    unfollow(userId) { return instance.delete(`follow/${userId}`) },

    getProfile(userId) {
        // Это сделано временно, чтобы прямо сейчас все продолжило работать
        console.warn('Obsolete method. Please use profileApi object')
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance
            .get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance
            .get(`profile/status/` + userId)
    },
    // мы отправляем на сервер объект у которого есть свойство status
    // согласно документации
    updateStatus(status) {
        return instance
            .put(`profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        // formData объкт для отправки на сервер для передачи файла
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance
        // Второй параметр для отправки файла formData
        // Третий headers
            .put(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    },
    saveProfile(profile) {
        return instance
            .put(`profile`, profile)
    }
};

export const authAPI = {
    // me() возвращает promiss
    me() {
        return instance
            .get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance
            .post(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout() {
        // this will delete Cookie from server
        return instance
            .delete(`auth/login`);
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance
            .get(`security/get-captcha-url`)
    },
};