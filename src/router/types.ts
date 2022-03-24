import {FC, ReactNode} from 'react';

// eslint-disable-next-line no-restricted-imports
import {RouteObject} from 'react-router';

import {ROLE} from '../store/account/types';

export interface PageProps {
    title?: string;
    path?: RouteObject['path'];
    child?: Array<RouteItem>;
}

export interface RouteProps extends Omit<PageProps, 'child' | 'path'> {
    free?: boolean;
    restrictedWithAuth?: boolean;
    roles?: Array<ROLE>;
}

export interface RouteItem extends RouteProps, Omit<RouteObject, 'children'> {
    element: FC<PageProps> | ReactNode;
    children?: Array<this>;
    navigation?: boolean;
}
