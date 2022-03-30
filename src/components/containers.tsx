import styled from '@emotion/styled';
import {Space} from 'antd';
import {SpaceProps} from 'antd/es';
import {FC} from 'react';

export const FullSize = styled.div`
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

export const Container = styled.div`
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
`;

export const ContainerCentered = styled(Container)`
    position: fixed;
    inset: 0;
    justify-content: center;
`;

export const AuthFormWrapper = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
