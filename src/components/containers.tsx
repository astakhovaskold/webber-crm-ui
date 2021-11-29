import styled from '@emotion/styled';
import {Space} from 'antd';
import {SpaceProps} from 'antd/es';
import {FC} from 'react';

export const FullSize = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //background-color: var(--main-color);
    flex: 1;
`;

export const FullWidthSpace: FC<SpaceProps> = styled(Space)`
    width: 100%;
`;
