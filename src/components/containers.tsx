import styled from '@emotion/styled';
import {Layout, Space} from 'antd';
import {SpaceProps} from 'antd/es';
import {FC} from 'react';

const {Content} = Layout;

export const FullScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--main-color);
    flex: 1;
`;

export const SpaceFull: FC<SpaceProps> = styled(Space)`
    width: 100%;
`;

export const Container = styled(Content)`
    padding: 1.5rem;
    background-color: #eee;
`;

export const AuthFormWrapper = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
