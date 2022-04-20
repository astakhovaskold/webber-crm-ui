import {Row} from 'antd';
import {memo, FC} from 'react';

import {PageProps} from '../../router/types';

import Tasks from './DashboardCards/Tasks';

const Home: FC<PageProps> = memo((): JSX.Element | null => {
    return (
        <Row gutter={[16, 24]}>
            <Tasks />
        </Row>
    );
});

export default Home;
