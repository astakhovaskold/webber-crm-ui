import styled from '@emotion/styled';
import {FC, memo} from 'react';
import {useRoutes} from 'react-router-dom';

import RouteModifier from './RouteModifier';
import all from './routes';
import {PageProps, RouteItem} from './types';

function wrap(routes: Array<RouteItem>): Array<RouteItem> {
    return routes.map(({element: Component, children: child, navigation: _, ...rest}) => {
        const children = Array.isArray(child) ? wrap(child) : undefined;

        const props: PageProps = {
            title: rest.title,
            child: children,
            path: rest.path,
        };

        const element = (
            <RouteModifier {...rest}>
                {/* @ts-ignore */}
                <Component {...props} />
            </RouteModifier>
        );

        return {
            ...rest,
            element,
            children,
        };
    });
}

const wrapped = wrap(all);

const PageWrapper = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Router: FC = memo((): JSX.Element | null => {
    const routes = useRoutes(wrapped);

    return <PageWrapper>{routes}</PageWrapper>;
});

export default Router;
