import {ColumnsType} from 'antd/es/table';

import {CommonDB} from '../../../typings/common';

export interface PaginationTableProps<T extends CommonDB> {
    url: string;
    columns: ColumnsType<T>;
    uid?: string;
    defaultSort?: `${'' | '-'}${string & keyof T}`;
    queryKey?: string;
}

export interface PaginationResult<T> {
    content: Array<T>;
    total_items: number | null;
    total_pages: number | null;
}

export enum WIDTH {
    SM = 200,
    MD = 400,
    LG = 800,
}
