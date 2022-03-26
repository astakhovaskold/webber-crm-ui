/**
 * Created by VIATKIN A.A. on 10.11.2021
 */

import styled from '@emotion/styled';
import {FC, HTMLAttributes, memo} from 'react';

const Container = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
`;

const PageContainer: FC<HTMLAttributes<HTMLElement>> = memo(({children, ...rest}): JSX.Element | null => {
    return <Container {...rest}>{children}</Container>;
});

export default PageContainer;
