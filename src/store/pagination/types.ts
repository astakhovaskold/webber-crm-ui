export enum TYPES {
    SET_PAGINATION_PARAMS = 'SET_PAGINATION_PAGE',
    SET_PAGINATION_FILTER = 'SET_PAGINATION_FILTER',
}

export interface SetPaginationParamsAction {
    type: TYPES.SET_PAGINATION_PARAMS;
    data: PaginationParamsData;
}

export interface SetPaginationFilterAction {
    type: TYPES.SET_PAGINATION_FILTER;
    data: PaginationFilterData;
}

export interface PaginationParams {
    page: number;
    size: number;
    ordering?: string;
}

export type PaginationFilter = Record<string, unknown>;

export interface PaginationFilterData {
    url: string;
    filter: Partial<PaginationFilter>;
}

export interface PaginationParamsData {
    url: string;
    params: Partial<PaginationParams>;
}

export type PaginationState = {
    params: Record<string, PaginationParams>;
    filter: Record<string, PaginationFilter>;
    defaultParams: PaginationParams;
};

export type PaginationActions = SetPaginationParamsAction | SetPaginationFilterAction;
