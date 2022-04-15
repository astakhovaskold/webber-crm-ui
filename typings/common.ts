export interface CommonDB {
    readonly _id: string;
}

export interface Timestamps {
    readonly createdAt: string | Date;
    readonly updatedAt: string | Date;
}

export interface ErrorHandler {
    message: string;
    errors: Array<string>;
}
