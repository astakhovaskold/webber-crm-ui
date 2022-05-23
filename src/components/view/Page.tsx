import {Card} from 'antd';
import {FC, HTMLAttributes, memo} from 'react';

import {PageProps} from '../../router/types';

type PageContainerProps = PageProps & HTMLAttributes<HTMLElement>;

const Page: FC<PageContainerProps> = memo(({title, children}): JSX.Element | null => {
    return <Card title={title}>{children}</Card>;
});

export default Page;
