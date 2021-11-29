import {RouteObject} from 'react-router';

import {ROLE} from '../store/account/types';

export interface PageProps {
    title?: string;
    path?: RouteObject['path'];
    child?: Array<RouteItem>;
}

export interface RouteItem extends RouteObject {
    children?: Array<this>;
    free?: boolean;
    roles?: Array<ROLE>;
    title?: string;
}
