import {AxiosError} from 'axios';

import {AccountDTO, ROLE} from '../store/account/types';

type exception = string | AxiosError<unknown> | Error;

export default class Utils {
    static hasAccess(account?: AccountDTO, roles: Array<ROLE> = []): boolean {
        return roles.length === 0 || (account?.user.role.role ? roles.includes(account.user.role.role) : false);
    }

    static textError(exp: exception): string {
        if (typeof exp === 'string') return exp;

        if (exp instanceof Error && !(exp as AxiosError).isAxiosError) return exp.message;

        const {status = null, data = null} = (exp as AxiosError).response ?? {};

        let text = 'Запрос не может быть обработан или выполнен';

        if (status && [403, 404, 500].includes(status)) {
            switch (status) {
                case 403:
                    return 'Нет прав доступа';
                case 404:
                    return 'Объект не найден или был удалён из системы';
                case 500:
                    return 'В данный момент действие не может быть выполнено. Попробуйте позже';
            }
        } else if (data) {
            if (Array.isArray(data.errors)) {
                text = data.errors.join('; ');
            } else if (data.message) {
                text = data.message;
            }
        }

        return text;
    }

    static error(err: exception): void {
        alert(Utils.textError(err));
    }

    static mergeObjects(obj1?: unknown, obj2?: unknown): unknown;
    static mergeObjects<T extends [...T], U extends [...U]>(obj1?: T, obj2?: U): [...T, ...U];
    static mergeObjects<T extends Record<string, unknown>, U extends Record<string, unknown>>(
        obj1?: T,
        obj2?: U,
    ): (T & U) | T | U;
    static mergeObjects(obj1: unknown, obj2: unknown) {
        if (!obj1) return obj2;
        if (!obj2) return obj1;

        if (Array.isArray(obj1) && Array.isArray(obj2)) return [...obj1, ...obj2];

        if (
            typeof obj1 === 'object' &&
            typeof obj2 === 'object' &&
            !(obj1 instanceof FormData) &&
            !(obj2 instanceof FormData)
        )
            return {
                ...obj1,
                ...obj2,
            };

        return null;
    }

    static sizeFile(value: number, fixed = 2): string {
        const suffix = ['б', 'Кб', 'Мб', 'Гб'];
        const countSuffix = suffix.length;

        if (Number.isNaN(value)) return '?';

        let v = value;
        let k = 0;

        while (v >= 1024 && k < countSuffix - 1) {
            v /= 1024;
            k++;
        }

        return `${v.toFixed(fixed)}${suffix[k]}`;
    }
}
