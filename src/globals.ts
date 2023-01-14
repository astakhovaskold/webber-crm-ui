export const _SYSTEM_NAME = 'WEBBER_CRM';

export const _IS_DEV = import.meta.env.NODE_ENV === 'development';

export const _IS_PROD = import.meta.env.NODE_ENV === 'production';

export const _API_URL = _IS_DEV ? 'http://localhost:8000' : 'https://webber-crm.herokuapp.com';

export const _STORAGE_NAME = 'account';

export const _STORAGE_TOKEN = 'token';

export const _DEFAULT_NAME = 'Anonymous';
