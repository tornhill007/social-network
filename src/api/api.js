import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": 'f13d4ef7-7d0d-45d6-b626-9e0e087f077f'
    }
})

export const usersAPI = {
    getUsers(pageSize, currentPage) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`).then(response => {
            console.log(response)
            return response.data;
        });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => {
            return response.data;
        });
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => {
            console.log(response)
            return response.data;
        });
    },
    getProfile(userId) {
        console.warn('Obsolote method. Please, use profileAPI object!')
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {

    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updatePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {
            status: status
        })
    },
    updateProfile(profile) {
        return instance.put(`profile`, profile)
    }
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete('auth/login')
    }
};

export const securityAPI = {
    getCaptchaUrlApi() {
        return instance.get(`/security/get-captcha-url`)
    }
};

