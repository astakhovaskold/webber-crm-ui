import {Space} from 'antd';
import {FC, memo} from 'react';
import {Link} from 'react-router-dom';

import {ERROR_404} from '../../libs/text';

const NotFound: FC = memo((): JSX.Element => {
    return (
        <Space direction="vertical" align="center">
            {ERROR_404}
            <Link to="/">На главную</Link>
        </Space>
    );
});

export default NotFound;
