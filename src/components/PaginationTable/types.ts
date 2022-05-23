import {ColumnsType} from 'antd/es/table';

import {Common} from '../../../typings/common';

export interface PaginationTableProps<T extends Common> {
    url: string;
    columns: ColumnsType<T>;
    uid?: string;
    defaultSort?: `${'' | '-'}${string & keyof T}`;
    queryKey?: string;
}

export interface PaginationResult<T> {
    content: Array<T>;
    total_elements: number | null;
    total_pages: number | null;
}

export enum WIDTH {
    XS = 100,
    SM = 200,
    MD = 400,
    LG = 800,
}
