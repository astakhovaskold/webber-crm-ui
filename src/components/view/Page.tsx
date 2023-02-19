import {Card, Space} from 'antd';
import {FC, HTMLAttributes, memo} from 'react';

import ActivateAccount from '../../entities/misc/ActivateAccount';
import {PageProps} from '../../router/types';

type PageContainerProps = PageProps & HTMLAttributes<HTMLElement>;

const Page: FC<PageContainerProps> = memo(({title, children}): JSX.Element | null => {
    return (
        <Space direction="vertical" size="large">
            <ActivateAccount />
            <Card title={title}>{children}</Card>
        </Space>
    );
});

export default Page;
