import {Card} from 'antd';
import {FC, HTMLAttributes, memo} from 'react';

import {PageProps} from '../../router/types';
import {Container} from '../containers';

type PageContainerProps = PageProps & HTMLAttributes<HTMLElement>;

const PageContainer: FC<PageContainerProps> = memo(({title, children, ...rest}): JSX.Element | null => {
    return (
        <Container {...rest}>
            <Card title={title}>{children}</Card>
        </Container>
    );
});

export default PageContainer;
