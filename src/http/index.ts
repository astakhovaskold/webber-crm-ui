import {message} from 'antd';
import axios from 'axios';

import {_STORAGE_NAME, _STORAGE_TOKEN} from '../globals';
import API from '../libs/API';
import {AccountDTO} from '../store/account/types';

const $api = axios.create({
    withCredentials: true,
    baseURL: API.app,
});

$api.interceptors.request.use(config => {
    config.headers = {...config.headers, Authorization: `Bearer ${localStorage.getItem(_STORAGE_TOKEN)}`};
    return config;
});

$api.interceptors.response.use(
    config => {
        return config;
    },
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<AccountDTO>(API.auth('refresh'), {withCredentials: true});
                localStorage.setItem(_STORAGE_TOKEN, response.data.accessToken);
                return await $api.request(originalRequest);
            } catch (e) {
                localStorage.removeItem(_STORAGE_NAME);
                message.error('Пользователь не авторизован');
            }
        }
        throw error;
    },
);

export default $api;
