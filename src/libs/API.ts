import {UserDTO} from '../entities/user/types';

type chunks = Array<unknown>;

export default class API {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    static get app(): string {
        return '/api/';
    }

    protected static joinChunks(...chunks: chunks): string {
        const suffix = chunks.join('/');
        return suffix.length > 0 ? `/${suffix}` : '';
    }

    static auth(url: 'login' | 'logout' | 'reset' | 'password'): string;
    static auth(...chunks: chunks) {
        return `${this.app}/auth${this.joinChunks(...chunks)}`;
    }

    static user(): string;
    static user(id: UserDTO['id']): string;
    static user(url: 'roles'): string;
    static user(...chunks: chunks) {
        return `${this.app}/user${this.joinChunks(...chunks)}`;
    }
}
