import {message} from 'antd';
import axios, {AxiosResponse} from 'axios';

import {ErrorHandler} from '../../typings/common';
import {_STORAGE_TOKEN} from '../globals';
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
        const currentRequest = error.config;
        const currentResponse: AxiosResponse<ErrorHandler> = error.response;

        if (currentResponse.status === 401 && currentRequest && !currentRequest._isRetry) {
            currentRequest._isRetry = true;
            try {
                const response = await axios.get<AccountDTO>(API.auth('refresh'), {withCredentials: true});
                localStorage.setItem(_STORAGE_TOKEN, response.data.accessToken);
                return await $api.request(currentRequest);
            } catch (e) {
                message.error('Пользователь не авторизован');

                // @ts-ignore
                window.location = '/login';
            }
        }

        const errorToHandle = [400, 403, 404, 500].includes(currentResponse.status);
        if (errorToHandle && currentResponse.data.message) {
            message.error(currentResponse.data.message);
        }

        throw error;
    },
);

export default $api;
