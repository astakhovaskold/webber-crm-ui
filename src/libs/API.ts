import {_API_URL} from '../globals';
import {UserDTO} from '../store/account/types';

type chunks = Array<unknown>;

export default class API {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    static get base(): string {
        return typeof process.env.API_URL !== 'undefined' ? process.env.API_URL : _API_URL;
    }

    static get prefix(): string {
        return '/api/v1/';
    }

    static get app(): string {
        return `${this.base}${this.prefix}`;
    }

    protected static joinChunks(...chunks: chunks): string {
        const suffix = chunks.join('/');
        return suffix.length > 0 ? `/${suffix}` : '';
    }

    static dashboard(url: 'cards'): string;
    static dashboard(...chunks: chunks) {
        return `${this.app}dashboard${this.joinChunks(...chunks)}`;
    }

    static auth(url: 'login' | 'logout' | 'registration' | 'refresh'): string;
    static auth(...chunks: chunks) {
        return `${this.app}auth${this.joinChunks(...chunks)}`;
    }

    static users(): string;
    static users(id: UserDTO['id'], command?: 'change-password'): string;
    static users(url: 'roles'): string;
    static users(...chunks: chunks) {
        return `${this.app}users${this.joinChunks(...chunks)}`;
    }
}
