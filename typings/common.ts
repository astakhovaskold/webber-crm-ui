export interface Common {
    readonly _id: string;
}

export interface Num {
    readonly num: number;
}

export interface Timestamps {
    readonly createdAt: string | Date;
    readonly updatedAt: string | Date;
}

export interface ErrorHandler {
    message: string;
    errors: Array<string>;
}
