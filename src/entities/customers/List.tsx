import {FC, memo} from 'react';

import {Outlet} from 'react-router-dom';

import {SpaceFull} from '../../components/containers';
import PageContainer from '../../components/view/PageContainer';
import {PageProps} from '../../router/types';

import Pagination from './Pagination';

const List: FC<PageProps> = memo(({title}): JSX.Element | null => {
    return (
        <>
            <PageContainer title={title}>
                <SpaceFull direction="vertical">
                    <Pagination />
                </SpaceFull>
            </PageContainer>

            <Outlet />
        </>
    );
});

export default List;
