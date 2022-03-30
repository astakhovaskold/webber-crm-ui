import {FC, memo} from 'react';

import {Outlet} from 'react-router-dom';

import PageContainer from '../../components/view/PageContainer';
import {PageProps} from '../../router/types';

import Pagination from './Pagination';

const List: FC<PageProps> = memo(({title}): JSX.Element | null => {
    return (
        <>
            <PageContainer title={title}>
                <Pagination />
            </PageContainer>

            <Outlet />
        </>
    );
});

export default List;
