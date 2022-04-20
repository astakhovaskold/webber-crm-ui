import {FC, memo} from 'react';

import {Outlet} from 'react-router-dom';

import {SpaceFull} from '../../components/containers';
import Page from '../../components/view/Page';
import {PageProps} from '../../router/types';

import Filter from './Filter';
import Pagination from './Pagination';

const List: FC<PageProps> = memo(({title}): JSX.Element | null => {
    return (
        <>
            <Page title={title}>
                <SpaceFull direction="vertical">
                    <Filter />
                    <Pagination />
                </SpaceFull>
            </Page>

            <Outlet />
        </>
    );
});

export default List;
